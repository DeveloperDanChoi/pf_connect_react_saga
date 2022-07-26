/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';
import { util } from '../../service/util';
import { reduxModule } from '../../service/reduxModule';

export const initialModules = [
  /**
   * User Info<br>
   * Account and Member 데이터<br>
   */
  { type: 'get', name: 'USER', data: false },
  { type: 'set', name: 'USER', data: true },
  /**
   * 내가 참여한 토픽 리스트<br>
   * Start data for connect<br>
   * TODO: getV1AdminTeamsTopics api와 중복되는 데이터라서 deprecated 검토 필요
   */
  { type: 'get', name: 'ROOMS', data: false },
  { type: 'set', name: 'ROOMS', data: true },
  /**
   * 팀에 연결된 나의 Connect 정보<br>
   */
  { type: 'get', name: 'MY_CONNECT', data: false },
  { type: 'set', name: 'MY_CONNECT', data: true },
  /**
   * 팀에 연결된 나의 Connect 총 Count<br>
   */
  { type: 'get', name: 'MY_CONNECT_COUNT', data: false },
  { type: 'set', name: 'MY_CONNECT_COUNT', data: true },
];
export const modules = (() => reduxModule.modules.create(initialModules, 'user'))();

const initialState = {
  myConnect: [],
  myConnectCount: -1,
  rooms: {
    bots: [],
    chats: [],
    topics: [],
    folders: [],
  },
  user: {
    account: {
      lang: 'ko',
    },
    member: {
      id: 0,
    }
  },
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_MY_CONNECT:
    case types.SET_MY_CONNECT_COUNT:
    case types.SET_MY_CONNECT_INFO:
    case types.SET_USER:
    case types.SET_ROOMS:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
