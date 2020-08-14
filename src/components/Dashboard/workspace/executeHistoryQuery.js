import { actions } from '../../../Features/Measurements/reducer';

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

async function executeHistoryQuery(metric, client, dispatch) {

    console.log('Get history for ' + metric);
    
    const result = await client.query(
        query, 
        {
            input: {
                metricName: metric,
                after: +new Date() - 30 * 60 * 1000,
            }
        }
    ).toPromise();
    
    const { data, error } = result;
    
    if (error) {
        dispatch(actions.measurementHistoryApiErrorReceived({ error: error.message }));
        return;
    }
    
    dispatch(actions.multipleMeasurementsReceived(data));

  
};

export default executeHistoryQuery;