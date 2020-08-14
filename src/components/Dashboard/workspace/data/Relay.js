export default class Relay {
    
    history;
    latest;

    constructor() {
        this.tickCallbacks = [];
        this.historyCallbacks = [];
    }

    setHistory(history, latest) {
        this.history = history;
        this.latest = latest;
        if (this.historyCallbacks.length) {
            this.historyCallbacks.forEach(cb => cb(history, latest));
            this.historyCallbacks = [];
        }
    }

    start() {}
    stop() {}
    
    tick = (data) => {
        this.latest = data;
        if (this.tickCallbacks.length) {
            this.tickCallbacks.forEach(cb => cb(data));
        }
    }

    onTick(callback) {
        this.tickCallbacks.push(callback);
        if (this.latest) {
            callback(this.latest);
        }
    }

    onHistory(callback) {
        if (this.history) {
            callback(this.history, this.latest);
            return;
        }
        this.historyCallbacks.push(callback);
    }
}
