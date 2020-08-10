import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
  at: number,
  metric: string,
  unit: string,
  value: number
};
export type MeasurementPayload = {
  newMeasurement: Measurement
};
export type ApiErrorAction = {
  error: string;
};

const initialState: {[index:string]: Measurement} = {};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementReceived: (state, action: PayloadAction<MeasurementPayload>) => {
      const measurement = action.payload.newMeasurement;
      state[measurement.metric] = measurement;
    },
    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
