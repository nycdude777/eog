
import React from 'react';
import _ from 'lodash';
import xo from 'exograph';

import Subscription from '../../../Features/Metrics/Subscription';

import Containers from './containers';
import Widgets from './widgets';
import Sources from './sources';

import layoutJson from './layoutJson';

import MetricsAsSources from './metricsAsSources';

import './css/workspace.css';

import Info from './Info';

export default (props) => {

    const data = {
        containers: <Containers />,
        widgets: <Widgets />,
        metrics:  <MetricsAsSources />,
    };

    return (
        <div className="dark-mode layout fill" style={{top: 64}} >
            <xo.GraphContextProvider layout={layoutJson} >
                <xo.Graph />
                <xo.Menu> 
                    <Info />
                    <Subscription />
                    <xo.Accordion data={data} defaultKey="metrics"/>
                </xo.Menu>
            </xo.GraphContextProvider>
        </div>
    )
}
