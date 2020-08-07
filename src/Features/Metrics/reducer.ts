import { createSlice, PayloadAction } from 'redux-starter-kit';

export type AvailableMetrics = {
  getMetrics: string[]
};

export type ApiErrorAction = {
  error: string;
};

const initialState: AvailableMetrics = {
  getMetrics: [],
}

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataReceived: (state, action: PayloadAction<AvailableMetrics>) => {
      const data = action.payload.getMetrics;
      state.getMetrics = data;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
