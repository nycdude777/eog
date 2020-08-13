import CircularBuffer from "./CircularBuffer";

const roundCurrentTime = (interval) => {
    const now = +new Date();
    const rem = now % interval;
    return now - rem;
}

/**
 * Listens to data events from multiple datasources and consolidates them into a single data set.
 */
export default class TimeseriesAggregator {

    constructor(options) {
        Object.assign(this, options);
        const timeline = this.createTimeline(options);
        this.buffer = CircularBuffer.fromArray(timeline);
        this.data = {};
        this.datasources = {};

        if (!this.projectPoint) {
            this.projectPoint = this.defaultPointProjector;
        }

        const _this = this;
        this.timer = setInterval(() => {
            window.requestAnimationFrame(() => _this.writeData());
        }, options.interval);
    }

    createTimeline({timeKey, interval, bufferLength}) {
        let time = roundCurrentTime(interval)
        let j = bufferLength;
        const buffer = new Array(bufferLength);
        while (j--) {
            buffer[j] = { [timeKey]: time };
            time -= interval;
        }
        return buffer;
    }

    defaultPointProjector() { 
        return { 
            [this.timeKey]: roundCurrentTime(this.interval), 
            ...this.data 
        }; 
    }

    /**
     * Private, do not use.
     * Creates a new datapoint at the current instant, with latest values from each datasource as properties, and emits data to GraphNode through setData callback.
     */
    writeData() {
        this.buffer.write((index, array) => {
            const point = this.projectPoint(this.data);
            Object.assign(array[index], point);
        });
        const data = this.projectSet(this.buffer.stitch());
        this.setData(data);
    } 


    /**
     * Registers a unique (must have name prop) datasource which fires an event when new data is available
     * @param {string} key - A unique name or alias for the datasource
     * @param {object} datasource - An eventful datasource
     * @param {function} subscribe - A function which subscribes to a data event with a callback to receive(scalar) e.g. (ds, receive) => ds.onData(receive) 
     */
    addDatasource(key, datasource, subscribe) {

        const setPoint = (keyValuePair) => {
            this.data[keyValuePair.key] = keyValuePair.value;
        }

        const setHistory = (history, latest) => {
            
            // map events to timeline
            this._mapToTimeline(key, history);

            // set current
            this.data[latest.key] = latest.value;
            this.buffer.write((index, array) => {
                const point = this.projectPoint(this.data);
                Object.assign(array[index], point);
            });
        }

        subscribe(datasource, setPoint, setHistory);

        this.datasources[key] = datasource;

        // TODO: Implement a way to remove datasources and unsubscribe
    }

    /**
     * Private method. DO NOT USE.
     */
    _mapToTimeline(key, history) {

        // First, sort history in descending order
        history.sort((a,b) => b[this.timeKey] - a[this.timeKey]);

        let cursor = 0;

        this.buffer.iterateReverse((index, array) => {

            const time = array[index][this.timeKey];

            // Find the next history item, whose timestamp is smaller than current time
            cursor = history.findIndex(x => x[this.timeKey] <= time);
            if (cursor >= 0) {
                // copy everything but the timekey
                const item = { ...history[cursor]  };
                delete item[this.timeKey];

                // const element = this.buffer.array[index][key];

                this.buffer.array[index][key] = item.value;
            }
        });
    }
    
}