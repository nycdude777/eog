import React from 'react';
import { useEffect, useCallback } from 'react';
import { useSubscription } from 'urql';

const topic = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default () => {

    const [{ data, fetching, error }] = useSubscription({ query: topic });

    useEffect(() => {
        if (data) {
            console.log(data['newMeasurement']);
        }
    }, [data, fetching, error]);
  
    if (!data) return null;

    const m = data['newMeasurement'];

    return JSON.stringify(m);
};
