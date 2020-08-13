import React from 'react';
import xo from 'exograph';

import Gauge from './Gauge';
import LineChart from './LineChart';

import initDataAggregator from '../data/initDataAggregator';

export default () => (
    <div className="flex wrap padded">

        <xo.GraphNode 
            menuItem
            id="line-chart" 
            name="LineChart" 
            allowDrag={false}
            allowDrop={true} 
            placeholder={<LineChartIcon />}
            render={(props, ref) => {
                
                const { data, graphContext, parent, siblings, children, datasources, scope, setData, className, ...other } = props;
                const classes = ['widget', className];
                if (siblings === 0) classes.push('fill'); 
                if (siblings > 0) classes.push('grow'); 

                initDataAggregator({
                    ...props, 
                    projectSet: (data) => ({ 
                        timeseries: data
                    }),
                    bufferLength: 30 * 60,
                });

                return LineChart({...other, data: data.timeseries, children, className: classes.join(' ')}, ref);
            }} 
            meta={{
                type: 'widget.lineChart',
                accept: [ 'data.source' ],
            }}
        />

    </div>
)


const GaugeIcon = (props) => {
    return <div className="relative placeholder"> 
        <div className="fill canvas flex align-center" style={{fontSize: '48pt'}}>
            {/* &#8631; */}
            <Gauge id={'gaugeWidgetIcon'} />
        </div>
    </div>
}

const LineChartIcon = (props) => {
    return <div className="relative placeholder hover-highlight"> 
        <div className="fill canvas flex align-center" style={{fontSize: '80pt'}}>
            &#8605;
        </div>
    </div>
}
