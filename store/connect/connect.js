/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';
import { util } from '../../service/util';
import { reduxModule } from '../../service/reduxModule';
export const initialModules = [
  /**
   * Connect 공통 정보<br>
   */
  { type: 'get', name: 'CONNECTS', data: false },
  { type: 'set', name: 'CONNECTS', data: true },
  /**
   * 멤버에게 연결된 connect 인증<br>
   */
  { type: 'get', name: 'AUTHENTICATION', data: false },
  { type: 'set', name: 'AUTHENTICATION', data: true },
  /**
   * 팀에 연결된 모든 Connect 정보<br>
   */
  { type: 'get', name: 'TEAMS_CONNECT', data: false },
  { type: 'set', name: 'TEAMS_CONNECT', data: true },
  /**
   * 커넥트 상세 데이터<br>
   */
  { type: 'get', name: 'TEAMS_CONNECT_DETAIL', data: false },
  { type: 'set', name: 'TEAMS_CONNECT_DETAIL', data: true },
];
export const modules = (() => reduxModule.modules.create(initialModules, 'connect'))();

// export const GET_TEAMS_CONNECT = 'connect/GET_TEAMS_CONNECT';
// export const SET_TEAMS_CONNECT = 'connect/SET_TEAMS_CONNECT';
export const GET_MY_CONNECT = 'connect/GET_MY_CONNECT';
export const SET_MY_CONNECT = 'connect/SET_MY_CONNECT';
export const SET_CONNECTS_OPEN = 'connect/SET_CONNECTS_OPEN';
export const UPDATE_CONNECTS = 'connect/UPDATE_CONNECTS';
export const UPDATE_STATUS = 'connect/UPDATE_STATUS';
export const DELETE_CONNECT = 'connect/DELETE_CONNECT';
export const SET_VALUES = 'connect/SET_VALUES';
export const INIT_VALUES = 'connect/INIT_VALUES';

export const updateConnects = (data) => ({ type: UPDATE_CONNECTS, data });
// export const getTeamsConnect = (data) => ({ type: GET_TEAMS_CONNECT, data });
// export const setTeamsConnect = (data) => ({ type: SET_TEAMS_CONNECT, data });
export const getMyConnect = (data) => ({ type: GET_MY_CONNECT, data });
export const setMyConnect = (data) => ({ type: SET_MY_CONNECT, data });
export const setConnectsOpen = (data) => ({ type: SET_CONNECTS_OPEN, data });
export const setValues = (data) => ({ type: SET_VALUES, data });
export const initValues = (data) => ({ type: INIT_VALUES, data });
/**
 * 연결 상태 변경<br>
 * enabled/disabled<br>
 * @param data
 * @returns {{data, type: string}}
 */
export const updateStatus = (data, event) => ({ type: UPDATE_STATUS, data, event });
/**
 * 연결 삭제<br>
 * @param data
 * @returns {{data, type: string}}
 */
export const deleteConnect = (data, router) => ({ type: DELETE_CONNECT, data, router });

/**
 * connects 전체 서비스 배열
 * connectsObj 전체 서비스 객체
 * teamsConnect 팀에 연결된 서비스
 * authentication 내가 인증한 정보
 */
export const initialState = {
  connects: [],
  connectsObj: {},
  teamsConnect: {},
  teamsConnectDetail: {
    bitbucket: {
      datas: [],
      current: 0,
      interval: 13,
    },
    github: {
      datas: [],
      current: 0,
      interval: 13,
    },
    googleCalendar: {
      datas: [],
      current: 0,
      interval: 13,
    },
    incoming: {
      datas: [],
      current: 0,
      interval: 13,
    },
    jira: {
      datas: [],
      current: 0,
      interval: 13,
    },
    outgoing: {
      datas: [],
      current: 0,
      interval: 13,
    },
    rss: {
      datas: [],
      current: 0,
      interval: 13,
    },
    trello: {
      datas: [],
      current: 0,
      interval: 13,
    },
  },
  authentication: [],
  teamsToken: {
    webhookToken: '',
  },
  input: {},
  connectDetail: [],
};

const tempText = () => {
  return {
    github: {
      label: 'GitHub',
      text: 'GitHub Repository를 등록하여 변경사항을 잔디에서 확인할 수 있습니다.',
      category: '소스 제어 및 코드 관리',
    },
    googleCalendar: {
      label: 'Google 캘린더',
      text: 'Google 캘린더에 등록된 일정에 대한 알림을 잔디에서 확인할 수 있습니다.',
      category: '일정 관리, 캘린더 공유',
    },
    incoming: {
      label: 'Webhook 수신 (Incoming Webhook)',
      text: '웹훅(Webhook)을 지원하는 여러 서비스의 알림을 잔디에서 확인할 수 있습니다.',
      category: '생산성, 커스텀마이징',
    },
    jira: {
      label: 'JIRA',
      text: 'JIRA 이슈 변동 사항을 잔디에서 확인할 수 있습니다.',
      category: '이슈 추적, 프로젝트 관리',
    },
    outgoing: {
      label: 'Webhook 발신 (Outgoing Webhook)',
      text: '잔디에서의 메시지를 외부 서비스로 웹훅(Webhook)을 통해 전달할 수 있습니다.',
      category: '생산성, 커스텀마이징',
    },
    teamIncoming: {
      label: '',
      text: '',
      category: '',
    },
    trello: {
      label: 'Trello',
      text: 'Trello 보드의 변동 사항을 잔디에서 확인할 수 있습니다.',
      category: '프로젝트 관리, 생산성',
    },
    rss: {
      label: 'RSS 구독',
      text: 'RSS 피드를 통해 최신 뉴스 또는 블로그 업데이트를 잔디에서 확인할 수 있습니다.',
      category: '콘텐츠, 미디어 및 뉴스',
    },
    bitbucket: {
      label: 'Bitbucket',
      text: '연동된 Repository의 변경사항을 잔디에서 확인할 수 있습니다. (Bitbucket Server 는 추후 지원 예정)',
      category: '코드 호스팅 및 관리',
    },
  };
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    // case SET_TEAMS_CONNECT:
    //   draft.teamsConnect = action.data;
    //   break;
    case SET_MY_CONNECT:
      draft.myConnect = action.data;
      break;
    case SET_CONNECTS_OPEN:
      draft.connects = [...draft.connects, action.data];
      break;
    case UPDATE_CONNECTS:
      draft.connects = ((data) => {
        for(const conn of draft.connects) {
          // console.log( conn.display )
          conn.display = 'none';
        }
        return draft.connects;
      })();
      break;
    case SET_VALUES:
      draft[action.data.key] = action.data.value;
      break;
    case INIT_VALUES:
      draft[action.data.key] = action.data.value;
      break;
    case types.SET_CONNECTS:
      action.data = ((data) => {
        for (const conn of data) {
          Object.assign(conn, tempText()[conn.name]);
        }
        return data;
      })([...action.data]);
      draft.connects = action.data;
      draft.connectsObj = ((data, length) => {
        const obj = {};
        for (let i = 0; i < length; i++) {
          obj[data[i].name] = data[i];
        }
        return obj;
      })(action.data, action.data.length);
      break;
    case types.SET_AUTHENTICATION:
    case types.SET_TEAMS_CONNECT:
    case types.SET_TEAMS_CONNECT_DETAIL:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    case types.GET_TEAMS_CONNECT_DETAIL:
      console.log(draft, action);
      break;
    default:
      break;
  }
});

export default reducer;
