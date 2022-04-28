import {
  all, call, fork, put, select, takeLatest,
} from 'redux-saga/effects';
import { GET_TEAMS_TOKEN, setTeamsToken } from './connect';
import { getTeamsToken } from '../../api/connect/WebAdmin/webAdmin';

function* getTeamsTokenSaga(data) {
  data.data.teamId = 279;
  const result = yield call(getTeamsToken, data.data);
  console.log(result);
  yield put(setTeamsToken(result.data));
}

function* watchTeamsToken() {
  yield takeLatest(GET_TEAMS_TOKEN, getTeamsTokenSaga);
}

export default function* connectSaga() {
  yield all([
    fork(watchTeamsToken),
  ]);
}
