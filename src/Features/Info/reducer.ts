import { createSlice, PayloadAction } from 'redux-starter-kit';

export type TopicInfo = {
  topic?: string,
  description?: string,
};

const initialState: TopicInfo = {};

const slice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<TopicInfo>) => {
      Object.assign(state, action.payload);
    },
    clear: (state, action: PayloadAction<TopicInfo>) => {
      Object.assign(state, {topic: null, description: null});
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

