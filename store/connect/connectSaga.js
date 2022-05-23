import {
  all, call, fork, put, select, takeLatest,
} from 'redux-saga/effects';
import {DELETE_CONNECT, UPDATE_STATUS, updateStatus} from './connect';
import { getTeamsToken, webAdmin } from '../../api/connect/WebAdmin/webAdmin';
import { putTeamsGithubStatus } from '../../api/connect/WebAdmin/Github/github';

/**
 * 연결 상태 변경<br>
 * enabled/disabled<br>
 * @param params
 * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<RT | RT | RT>>, void, *>}
 */
function* updateStatusSaga({ data }) {
  const { teamId, id: connectId, status } = data;
  const result = yield call(webAdmin[data.type]['putTeamsStatus'], {
    teamId,
    data: {
      connectId,
      status: status === 'enabled' ? 'disabled' : 'enabled',
    },
  });
  console.log(result);
}
/**
 * 연결 삭제<br>
 * @param params
 * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<RT | RT | RT>>, void, *>}
 */
function* deleteConnectSaga({ data }) {
  const { teamId, id: connectId } = data;
  const result = yield call(webAdmin[data.type]['deleteTeams'], {
    teamId,
    connectId,
  });
  console.log(result);
}

function* watchUpdateStatus() {
  yield takeLatest(UPDATE_STATUS, updateStatusSaga);
}
function* watchDeleteConnect() {
  yield takeLatest(DELETE_CONNECT, deleteConnectSaga);
}

export default function* connectSaga() {
  yield all([
    fork(watchUpdateStatus),
    fork(watchDeleteConnect),
  ]);
}
