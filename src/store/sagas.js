import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricsSaga from '../Features/Metrics/saga';

export default function* root() {

  const spawnAll = () => {
    spawn(weatherSaga);
    spawn(metricsSaga);
  };

  yield spawnAll();

}
