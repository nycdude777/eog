import React from 'react';
import { useEffect, useCallback } from 'react';
import { useSubscription } from 'urql';
import { actions } from '../Measurements/reducer';
import Snackbar from '../SnackBuffet';
import { useDispatch } from 'react-redux';

const topic = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default (props) => {

    const dispatch = useDispatch();

    const [{ data, fetching, error }] = useSubscription({ query: topic });

    useEffect(() => {
        if (data) {
            if (error) {
                dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
            }
            if (data) {
                dispatch(actions.measurementReceived(data));
            }
        }
    }, [data, fetching, error]);
      
    return <>
        {
            error &&
            <Snackbar open={true} severity="error" message={error.message} />
        }
    </>;
};
