import {
  all, call, fork, put, select, takeLatest,
} from 'redux-saga/effects';
import { GET_TEAMS_TOKEN } from './connect';

function* getTeamsTokenSaga() {
  console.log(' >>>>> !! ');
}

function* watchTeamsToken() {
  yield takeLatest(GET_TEAMS_TOKEN, getTeamsTokenSaga);
}

export default function* connectSaga() {
  yield all([
    fork(watchTeamsToken),
  ]);
}
