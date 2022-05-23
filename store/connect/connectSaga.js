import {
  all, call, fork, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  DELETE_CONNECT,
  GET_TEAMS_CONNECT,
  setTeamsConnect,
  setMyConnect,
  UPDATE_STATUS,
  updateStatus,
  setValues
} from './connect';
import {getTeamsConnect, getTeamsToken, webAdmin} from '../../api/connect/WebAdmin/webAdmin';
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

function* teamsConnectSaga({ data }) {
  const { user, team } = yield select((state) => state);
  const result = yield call(getTeamsConnect, data);
  let connectCount = 0;
  const myConnect = ((data, { teamId }, { memberships }) => {
    const memberId = (() => {
      for (const item of memberships) {
        if (item.teamId === teamId && item.status === 'enabled') {
          return item.memberId;
        }
      }
      return 0;
    })();

    // TODO: 나의 잔디 커넥트 api 필요
    // filter myConnect
    const myConn = {};
    for (const connectType in data) {
      for (const item of data[connectType]) {
        if ( item.memberId === memberId) {
          myConn[connectType] = myConn[connectType] || [];
          myConn[connectType].push(item);
          connectCount++;
        }
      }
    }

    return myConn;
  })(result.data, team, user.user);
  yield put(setTeamsConnect(result.data));
  yield put(setMyConnect(myConnect));
  yield put(setValues({ key: 'myConnectCount', value: connectCount }));
}

function* watchUpdateStatus() {
  yield takeLatest(UPDATE_STATUS, updateStatusSaga);
}
function* watchDeleteConnect() {
  yield takeLatest(DELETE_CONNECT, deleteConnectSaga);
}
function* watchTeamsConnect() {
  yield takeLatest(GET_TEAMS_CONNECT, teamsConnectSaga);
}

export default function* connectSaga() {
  yield all([
    fork(watchUpdateStatus),
    fork(watchDeleteConnect),
    fork(watchTeamsConnect),
  ]);
}
