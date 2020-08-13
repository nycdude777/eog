import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress  from '@material-ui/core/CircularProgress';
import { useQuery as useUrqlQuery } from 'urql';
import { actions } from './reducer';

const query = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;

export default (props: { metric: string, enabled: boolean }) => {

  if (!props.enabled) return null;

  const mutable = React.useRef({ initialized: false }).current;

  const dispatch = useDispatch();

  const param = {
      metricName: props.metric,
      after: +new Date() - 30 * 60 * 1000,
  };
  
  const [result] = useUrqlQuery({ 
      query,
      variables: { input: param },
  });
  
  const { fetching, data, error } = result;

    
    
  useEffect(() => {

      if (error) {
          dispatch(actions.measurementHistoryApiErrorReceived({ error: error.message }));
          return;
      }
      
      if (!data) return;

      debugger;

      dispatch(actions.multipleMeasurementsReceived(data));

  }, [dispatch, fetching, data, error]);

  return <CircularProgress />;
};

