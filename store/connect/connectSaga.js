import {
  all, call, fork, put, select, takeLatest,
} from 'redux-saga/effects';
import { Router } from 'next/router';
import {
  DELETE_CONNECT,
  GET_TEAMS_CONNECT,
  setTeamsConnect,
  setMyConnect,
  UPDATE_STATUS,
  updateStatus,
  setValues,
  initValues,
  modules as connectModules,
} from './connect';
import { getTeamsConnect, getTeamsToken, webAdmin } from '../../api/connect/WebAdmin/webAdmin';
import { getV1AdminTeamsMembers } from '../../api/team/Admin/admin';
import { putTeamsGithubStatus } from '../../api/connect/WebAdmin/Github/github';
import { util } from '../../service/util';
import { initValues as userInitValues, modules as userModules } from '../user/user';
import { getAuthenticationList } from '../../api/connect/Authentication/authentication';

/**
 * 연결 상태 변경<br>
 * enabled/disabled<br>
 * @param params
 * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<RT | RT | RT>>, void, *>}
 */
function* updateStatusSaga({ data, event }) {
  const { teamId, id: connectId, status } = data;
  const result = yield call(webAdmin[data.type].putTeamsStatus, {
    teamId,
    data: {
      connectId,
      status: status === 'enabled' ? 'disabled' : 'enabled',
    },
  });
  // update
  // myConnect , teamsConnect
  // yield put(setTeamsConnect(result.data));
  // yield put(setMyConnect(myConnect));
  // yield put(setValues({ key: 'myConnectCount', value: connectCount }));
  if (result.status === 200 && event) {
    // TODO: 여기서 해야 하는가?
    // 리스트 페이지
    if (event.target.closest('tr')) {
      // TODO: 디테일한 제어할 수 있게 개선
      yield put(connectModules.creators.getTeamsConnect(teamId));
      // event.target.closest('tr').classList.toggle('disabled');
    } else {
      event.target.closest('.switch').classList.toggle('on');
    }
  }
  console.log(result);
}
/**
 * 연결 삭제<br>
 * @param params
 * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<RT | RT | RT>>, void, *>}
 */
function* deleteConnectSaga({ data, router }) {
  // TODO: 개발 후 주석 풀 것
  const { teamId, id: connectId } = data;
  // const result = yield call(webAdmin[data.type].deleteTeams, {
  //   teamId,
  //   connectId,
  // });
  // console.log(result);

  // TODO: 삭제가 정상적으로 처리되면 myConnect 데이터 업데이트 디테일한 처리 필요
  yield put(connectModules.creators.getTeamsConnect(teamId));

  if (router) router.push('/app', '/app');
}

/**
 * 데이터 가공하는 함수<br>
 * @type {{initialize: (function(*): *)}}
 */
const teamsConnectConvert = (() => {
  let data = {};
  let team = {};
  const statusClss = (value) => (value === 'enabled' ? 'switch on' : 'switch');
  const statusText = (value) => (value === 'enabled' ? '작동중' : '중지됨');
  /**
   * topic name<br>
   * @param value
   */
  const getTopicName = (value) => {
    const { topics } = team.topics;
    const topicsLength = topics.length;
    let topicName = 'not found';
    for (let i = 0; i < topicsLength; i++) {
      if (topics[i].id === value) {
        topicName = topics[i].name;
        break;
      }
    }
    // console.log('name >>>>' , topicName)
    return topicName;
  };
  /**
   * 멤버 정보<br>
   * @param value
   */
  const getMember = (value) => {
    const { teamsMembers } = team;
    const memberLength = teamsMembers.length;

    for (let i = 0; i < memberLength; i++) {
      if (teamsMembers[i].id === value) {
        return teamsMembers[i];
      }
    }

    return {};
  };

  function initialize(result, { team: teamData, user }) {
    data = result.data;
    team = teamData;

    for (const connectType in data) {
      for (const item of data[connectType]) {
        item.statusClss = statusClss(item.status);
        item.statusText = statusText(item.status);
        item.createdAt = util.dateFormat(item.createdAt);
        // item.roomName = getTopicName(item.roomId);
        item.member = getMember(item.memberId);
        item.roomName = '비공개 토픽 또는 1:1메시지';
        for (const topics of team.rooms.topics) {
          if (item.roomId === topics.id) {
            item.roomName = topics.name;
            break;
          }
        }
        for (const chats of user.rooms.chats) {
          if (item.roomId === chats.id) {
            for (const bots of user.rooms.bots) {
              if (chats.companionId === bots.id) {
                item.roomName = bots.name;
                break;
              }
            }
            break;
          }
        }
      }
    }
    return result;
  }
  return {
    initialize,
  };
})();
function* watchUpdateStatus() {
  yield takeLatest(UPDATE_STATUS, updateStatusSaga);
}
function* watchDeleteConnect() {
  yield takeLatest(DELETE_CONNECT, deleteConnectSaga);
}

const connectCreators = connectModules.creators;
const userCreators = userModules.creators;
export const saga = (() => ({
  /**
   * 팀에 연결된 모든 Connect 정보<br>
   */
  * getTeamsConnect(data) {
    const { user, team } = yield select((state) => state);
    const memberId = user.user.member.id;
    const result = teamsConnectConvert
      .initialize(yield call(getTeamsConnect, data.data), { team, user });
    let connectTotalCount = 0;
    const myConnect = ((data) => {
      // TODO: 나의 잔디 커넥트 api 필요
      // filter myConnect
      const myConn = {};
      for (const connectType in data) {
        let connectCount = 0;
        for (const item of data[connectType]) {
          if (item.memberId === memberId) {
            myConn[connectType] = myConn[connectType] || {
              data: [], datas: [], current: 0, page: 0, interval: 10, initCount: 3, count: 0,
            };
            connectTotalCount++;
            connectCount++;
            if (connectCount > 3) {
              item.display = 'none';
            }
            if (connectCount <= myConn[connectType].initCount) {
              myConn[connectType].data.push(item);
            }
            myConn[connectType].datas.push(item);
            myConn[connectType].count = connectCount;
          }
        }
      }

      return myConn;
    })(result.data);

    yield put(connectCreators.setTeamsConnect(result.data));
    yield put(userCreators.setMyConnect(myConnect));
    yield put(userCreators.setMyConnectCount(connectTotalCount));
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns
   */
  * setInputConnect(data) {
    yield put(connectCreators.setInputConnectValue(data));
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns
   */
  * setInputConnectValue() {},
}))();

export default function* connectSaga() {
  yield all([
    fork(watchUpdateStatus),
    fork(watchDeleteConnect),
  ]);
}
