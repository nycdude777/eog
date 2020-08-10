
import React from 'react';
import _ from 'lodash';
import xo from 'exograph';

import Subscription from '../../../Features/Metrics/Subscription';

import Containers from './containers';
import Widgets from './widgets';
import Sources from './sources';

import MetricsAsSources from './metricsAsSources';

export default (props) => {

    const data = {
        containers: <Containers />,
        widgets: <Widgets />,
        metrics:  <MetricsAsSources />,
    };

    return (
        <div className="layout fill" style={{top: 64}} >
            <xo.GraphContextProvider>
                <xo.Graph />
                <xo.Menu> 
                    <Subscription />
                    <xo.Accordion data={data} />
                </xo.Menu>
            </xo.GraphContextProvider>
        </div>
    )
}
