import React from 'react';
import Metrics from '../../Features/Metrics';
import Subscription from '../../Features/Metrics/Subscription';

export default () => {
  return <div className="fill flex column justify-center align-center">
      
      <strong>Metrics</strong>
      <Metrics />
      
      <br></br>
      <strong>Subscription stream</strong>
      <Subscription />

  </div>
}

