import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CircularProgress  from '@material-ui/core/CircularProgress';
import { IState } from '../../store';

import { 
  Provider as UrqlProvider, 
  createClient as createUrqlClient, 
  useQuery as useUrqlQuery 
} from 'urql';

import { actions } from './reducer';

const urqlClient = createUrqlClient({ url: 'https://react.eogresources.com/graphql' });

export default () => {
  return (
    <UrqlProvider value={urqlClient}>
      <MetricsList />
    </UrqlProvider>
  );
};

const MetricsList = () => {

  const dispatch = useDispatch();
  
  const metrics = useSelector((state: IState) => {
    return state.metrics
  });

  const [result] = useUrqlQuery({ query: `query {getMetrics}` });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.metricsDataReceived(data));
  }, [dispatch, data, error]);

  if (fetching) return <CircularProgress />;



  return <>
    {
      metrics.getMetrics.map((m: string) => <div key={m}>{m}</div>)
    }
  </>
};
