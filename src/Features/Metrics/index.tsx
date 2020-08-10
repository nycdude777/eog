import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress  from '@material-ui/core/CircularProgress';
import { useQuery as useUrqlQuery } from 'urql';
import { actions } from './reducer';

export default () => {

  const dispatch = useDispatch();

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

  return <CircularProgress />;
};

