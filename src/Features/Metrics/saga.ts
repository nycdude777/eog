import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as MetricsActions, ApiErrorAction } from './reducer';
import { PayloadAction } from 'redux-starter-kit';

export default function* watchApiError() {
  yield takeEvery(MetricsActions.metricsApiErrorReceived.type, handleApiError);
}

function* handleApiError(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}
