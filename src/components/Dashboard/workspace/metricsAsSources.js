import React, { useEffect } from 'react';
import xo from 'exograph';
import xod from './data';
import _ from 'lodash';
import Metrics from '../../../Features/Metrics';
import executeHistoryQuery from './executeHistoryQuery';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {camelToSentenceCase} from './util/string';
import { useClient } from 'urql';
import { actions as infoActions } from '../../../Features/Info/reducer';

export default () => {

    const metricsQueryInitialized = React.useRef(false);

    const metrics = useSelector((state) => {
        return _.get(state, 'metrics.getMetrics');
    });
        
    if (metricsQueryInitialized.current === false) {
        metricsQueryInitialized.current = true;
        return <Metrics />;
    }

    if (metrics.length === 0) return null;

    return <div className="flex wrap spaced" >
        {
            metrics.map((key, index) => {
                return <MetricSourceNode key={key} name={key} />
            })
        }
    </div>
    
}


const MetricSourceNode = (props) => {

    const relay = React.useRef(new xod.Relay()).current;
    const status = React.useRef({ historyRequested: false }).current;

    const data = useSelector((state) => {
        const m = _.get(state, `measurements.${props.name}`);
        return m;
    });
    
    const historyAvailable = data && data.buffer;

    // Propagate new measurement
    const latestMeasurement = data ? data.latest : {};


    useEffect(()=>{
        if (latestMeasurement && latestMeasurement.at) {
            relay.tick({at: latestMeasurement.at, key: latestMeasurement.metric, value: latestMeasurement.value });
        }
    }, [latestMeasurement, relay]);

    
    // History
    if (historyAvailable && !relay.history) {
        const buffer = data.buffer.stitch();
        
        const timeSeries = buffer.map(x => {
            if (!x.at) debugger;
            return { 
                at: x.at, 
                key: x.metric, 
                value: x.value 
            }
        });

        if (latestMeasurement === null) debugger;

        const latestOrDefaulMeasurement = latestMeasurement || timeSeries[timeSeries.length-1];
        const latest = {at: latestOrDefaulMeasurement.at, key: latestOrDefaulMeasurement.metric, value: latestOrDefaulMeasurement.value };

        relay.setHistory(timeSeries, latest);
    }

    const client = useClient();
    const dispatch = useDispatch();
    const requestHistory = () => {
        if (historyAvailable) return;
        if (status.historyRequested) return;
        status.historyRequested = true;
        executeHistoryQuery(props.name, client, dispatch);
    }
    
    return <>
        {/* <History metric={props.name} enabled={historyEnabled} /> */}
        <xo.GraphNode 
            menuItem
            id={props.name}
            name={props.name} 
            placeholder={<MeasurementDisplay {...latestMeasurement} />}
            render={(props) => {
                requestHistory();
                return relay;
            }}
            meta={{
                type: 'data.source',
                isDatasource: true,
            }}
        />
    </>
}

const MeasurementDisplay = ({at, metric, value, unit}) => {

    const dispatch = useDispatch();

    const mouseEvents = {
        onMouseEnter: () => dispatch(infoActions.setInfo({ 
            topic: metric, 
            description: 'You can drag and drop this metric onto a Widget like a chart to visualize its data.' 
        })),
        onMouseLeave: () => dispatch(infoActions.clear()),
    };

    return <Paper elevation={3} className="square relative hover-highlight" {...mouseEvents}>
        <div className="fill flex cell">
            <div className="flex column">
                <div style={{fontSize: '0.8em', fontWeight: 100, textAlign: 'center'}}>
                    {camelToSentenceCase(metric)}
                </div>
                <div style={{fontSize: '1.2rem', textAlign: 'center'}}>
                    {value}
                </div>
             </div>
        </div>
    </Paper>
}
