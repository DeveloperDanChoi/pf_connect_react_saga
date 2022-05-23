/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';
import {util} from "../../service/util";

export const GET_CONNECTS = 'connect/GET_CONNECTS';
export const SET_CONNECTS = 'connect/SET_CONNECTS';
export const GET_TEAMS_CONNECT = 'connect/GET_TEAMS_CONNECT';
export const SET_TEAMS_CONNECT = 'connect/SET_TEAMS_CONNECT';
export const GET_MY_CONNECT = 'connect/GET_MY_CONNECT';
export const SET_MY_CONNECT = 'connect/SET_MY_CONNECT';
export const SET_AUTHENTICATION = 'connect/SET_AUTHENTICATION';
export const SET_CONNECTS_OPEN = 'connect/SET_CONNECTS_OPEN';
export const SET_BANNER_HIDE = 'connect/SET_BANNER_HIDE';
export const UPDATE_CONNECTS = 'connect/UPDATE_CONNECTS';
export const UPDATE_STATUS = 'connect/UPDATE_STATUS';
export const DELETE_CONNECT = 'connect/DELETE_CONNECT';
export const SET_VALUES = 'connect/SET_VALUES';

export const getConnects = () => ({ type: GET_CONNECTS });
export const setConnects = (data) => ({ type: SET_CONNECTS, data });
export const updateConnects = (data) => ({ type: UPDATE_CONNECTS, data });
export const getTeamsConnect = (data) => ({ type: GET_TEAMS_CONNECT, data });
export const setTeamsConnect = (data) => ({ type: SET_TEAMS_CONNECT, data });
export const getMyConnect = (data) => ({ type: GET_MY_CONNECT, data });
export const setMyConnect = (data) => ({ type: SET_MY_CONNECT, data });
export const setAuthentication = (data) => ({ type: SET_AUTHENTICATION, data });
export const setConnectsOpen = (data) => ({ type: SET_CONNECTS_OPEN, data });
export const setValues = (data) => ({ type: SET_VALUES, data });
/**
 * 연결 상태 변경<br>
 * enabled/disabled<br>
 * @param data
 * @returns {{data, type: string}}
 */
export const updateStatus = (data) => ({ type: UPDATE_STATUS, data });
/**
 * 연결 삭제<br>
 * @param data
 * @returns {{data, type: string}}
 */
export const deleteConnect = (data) => ({ type: DELETE_CONNECT, data });

/**
 * 배너 숨기기
 */
export const setBannerHide = (data) => ({ type: SET_BANNER_HIDE, data });

export const initialState = {
  bannerHide: '',
  connects: [],
  myConnect: [],
  teamsConnect: [],
  authentication: [],
  teamsToken: {
    webhookToken: '',
  },
  input: {},
  myConnectCount: '',
};

const tempText = () => {
  return {
    github: {
      label: 'GitHub',
      text: 'GitHub Repository를 등록하여 변경사항을 잔디에서 확인할 수 있습니다.',
    },
    googleCalendar: {
      label: 'Google 캘린더',
      text: 'Google 캘린더에 등록된 일정에 대한 알림을 잔디에서 확인할 수 있습니다.',
    },
    incoming: {
      label: 'Webhook 수신 (Incoming Webhook)',
      text: '웹훅(Webhook)을 지원하는 여러 서비스의 알림을 잔디에서 확인할 수 있습니다.',
    },
    jira: {
      label: 'JIRA',
      text: 'JIRA 이슈 변동 사항을 잔디에서 확인할 수 있습니다.',
    },
    outgoing: {
      label: 'Webhook 발신 (Outgoing Webhook)',
      text: '잔디에서의 메시지를 외부 서비스로 웹훅(Webhook)을 통해 전달할 수 있습니다.',
    },
    teamIncoming: {
      label: '',
      text: '',
    },
    trello: {
      label: 'Trello',
      text: 'Trello 보드의 변동 사항을 잔디에서 확인할 수 있습니다.',
    },
    rss: {
      label: 'RSS 구독',
      text: 'RSS 피드를 통해 최신 뉴스 또는 블로그 업데이트를 잔디에서 확인할 수 있습니다.',
    },
    bitbucket: {
      label: 'Bitbucket',
      text: '연동된 Repository의 변경사항을 잔디에서 확인할 수 있습니다. (Bitbucket Server 는 추후 지원 예정)',
    },
  };
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_CONNECTS:
      action.data = ((data) => {
        for (const conn of data) {
          Object.assign(conn, tempText()[conn.name]);
        }
        return data;
      })([...action.data]);
      draft.connects = action.data;
      break;
    case SET_TEAMS_CONNECT:
      draft.teamsConnect = action.data;
      break;
    case SET_MY_CONNECT:
      draft.myConnect = action.data;
      break;
    case SET_AUTHENTICATION:
      draft.authentication = action.data;
      break;
    case SET_CONNECTS_OPEN:
      draft.connects = [...draft.connects, action.data];
      break;
    case SET_BANNER_HIDE:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
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
    default:
      break;
  }
});

export default reducer;
