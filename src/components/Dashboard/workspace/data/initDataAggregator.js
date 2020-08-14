import TimeseriesAggregator from './TimeseriesAggregator';



export default function initDataAggregator (props) {

    const { bufferLength, projectPoint, projectSet, datasources, scope } = props;
    
    const dsKeys = Object.keys(datasources);
    if (!dsKeys.length) return;

    if (scope.aggregator) {
        // New aggregator should initialize when the mix of datasources changes
        const pHash = dsKeys.join('');
        const aHash = Object.keys(scope.aggregator.datasources).join('');
        if (pHash === aHash) return;
    }

    if (!scope.aggregator) {
        scope.aggregator = new TimeseriesAggregator({
            timeKey: 'at',
            interval: 1000,
            bufferLength: bufferLength,
            setData: props.setData,
            projectPoint,
            projectSet,
        });
    }

    // add missing datasources
    for (let key in datasources) {
        if (!Object.prototype.hasOwnProperty.call(scope.aggregator.datasources, key)) {

            const datasource = datasources[key].render();

            const subscribe = (ds, setPoint, setHistory) => {
                ds.onTick((data) => setPoint(data));
                ds.onHistory((data, latest) => setHistory(data, latest));
            };

            scope.aggregator.addDatasource(key, datasource, subscribe);

            datasource.start();
            // TODO: If datasource needs to be removed, you need to call .stop() on it first
        }
    }
    
}