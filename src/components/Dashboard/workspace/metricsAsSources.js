import React, { useEffect } from 'react';
import xo from 'exograph';
import xod from './data';
import _ from 'lodash';
import Metrics from '../../../Features/Metrics';

import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import {camelToSentenceCase} from './util/string';
import Typography from '@material-ui/core/Typography';

export default () => {

    const initialized = React.useRef();

    const metrics = useSelector((state) => {
        // Life gets a bit easier when using lodash.get() to do multi-level invokations...
        //   (i.e. its safe because it auto-checks for nulls and doesn't blow up.
        return _.get(state, 'metrics.getMetrics');
    });
        
    if (!initialized.current) {
        initialized.current = true;
        return <Metrics />;
    }

    if (metrics.length === 0) return null;

    return <div className="flex column spaced">
        {
            metrics.map((key, index) => {
                return <MetricSourceNode key={key} name={key} />
            })
        }
    </div>
    
}


const MetricSourceNode = (props) => {

    // const relay = React.useRef(new xod.Relay());
    const data = useSelector((state) => {
        // Life gets a bit easier when using lodash.get() to do multi-level invokations...
        //   (i.e. its safe because it auto-checks for nulls and doesn't blow up.
        const m = _.get(state, `measurements.${props.name}`);
        return m;
    });
    
    const relay = React.useRef(new xod.Relay()).current;

    useEffect(()=>{
        if (data) {
            relay.tick(data);
        }
    }, [data]);

    return <xo.GraphNode 
        menuItem
        name={props.name} 
        placeholder={<MeasurementDisplay {...data} />}
        render={(props) => {
            return relay;
        }}
        meta={{
            type: 'data.source',
            isDatasource: true,
        }}
    />
}

const MeasurementDisplay = ({at, metric, value, unit}) => {
    return <Paper elevation={3} className="square relative">
        <div className="fill flex cell">
            <div className="flex column">
                 <Typography variant="caption" display="block" gutterBottom>
                     {camelToSentenceCase(metric)} ({unit})
                 </Typography>
                 <div style={{fontSize: '1.2rem', textAlign: 'center'}}>
                     {value}
                 </div>
             </div>
        </div>
    </Paper>
}

// const MeasurementDisplay = ({at, metric, value, unit}) => {
//     return <div className="relative placeholder"> 
//         <div className="fill canvas flex align-center">
//             <div className="flex column">
//                 <Typography variant="overline" display="block" gutterBottom>
//                     {metric}
//                 </Typography>
//                 <Typography variant="h4" gutterBottom>
//                     {value}
//                     <sub>{unit}</sub>
//                 </Typography>
//             </div>
//         </div>
//     </div>
// }
