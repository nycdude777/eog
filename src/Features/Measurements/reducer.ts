import { createSlice, PayloadAction } from 'redux-starter-kit';
import CircularBuffer from '../../components/Dashboard/workspace/data/CircularBuffer';

export type Measurement = {
  at: number,
  metric: string,
  unit: string,
  value: number
};

export type MultipleMeasurements = {
  metric: string,
  measurements: Measurement[],
}

export type MeasurementPayload = {
  newMeasurement: Measurement
};

export type MultipleMeasurementsPayload = {
  getMultipleMeasurements: MultipleMeasurements[]
};

export type ApiErrorAction = {
  error: string;
};

export type MetricData = {
  latest: Measurement | null,
  buffer: CircularBuffer | null,
};

const initialState: {[index:string]: MetricData} = {};

var initialized = false;

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementReceived: (state, action: PayloadAction<MeasurementPayload>) => {
      const measurement = action.payload.newMeasurement;
      if (!state[measurement.metric]) {
        state[measurement.metric] = { latest: null, buffer: null };
      }
      state[measurement.metric].latest = measurement;
      // write latest measurement to circular buffer
      if (state[measurement.metric].buffer) {
        state[measurement.metric].buffer!.write((index: number, array: []) => {
          Object.assign(array[index], measurement);
        });
      }
    },
    multipleMeasurementsReceived: (state, action: PayloadAction<MultipleMeasurementsPayload>) => {
      const results = action.payload.getMultipleMeasurements;
      results.forEach(result => {
        result.measurements.sort((a,b) => a.at - b.at); //sort asc on timestamp just in case
        if (!state[result.metric]) {
          state[result.metric] = { latest: null, buffer: null };
        }
        state[result.metric].buffer = CircularBuffer.fromArray(result.measurements);
        initialized = true;
      });
      
    },
    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    measurementHistoryApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

