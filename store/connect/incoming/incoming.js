/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsIncoming,
  postTeamsIncoming,
  putTeamsIncomingSetting,
} from '../../../api/connect/WebAdmin/Incoming/incoming';
import { getTeamsToken } from '../../../api/connect/WebAdmin/webAdmin';

export const initialModules = [
  /**
   * Webhook용 Token을 요청하는 API
   */
  {
    type: 'get',
    name: 'TEAMS_TOKEN',
    data: false,
    api: getTeamsToken,
  },
  { type: 'set', name: 'TEAMS_TOKEN', data: true },
  /**
   * Incoming Webhook Connect 설정을 단일 조회하는 API
   */
  {
    type: 'get',
    name: 'TEAMS_INCOMING',
    data: true,
    api: getTeamsIncoming,
  },
  {
    type: 'set',
    name: 'TEAMS_INCOMING',
    data: true,
  },
  /**
   * Incoming Webhook Connect 설정을 생성하는 API
   */
  {
    type: 'post',
    name: 'TEAMS_INCOMING',
    data: false,
    api: postTeamsIncoming,
  },
  /**
   * Incoming Webhook Connect 설정을 수정하는 API
   */
  {
    type: 'put',
    name: 'TEAMS_INCOMING_SETTING',
    data: true,
    api: putTeamsIncomingSetting,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_INCOMING',
    data: true,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_INCOMING_VALUE',
    data: true,
  },
];
export const modules = (() => util.createModule(initialModules, 'incoming'))();
export const initialState = {
  input: {},
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_TEAMS_TOKEN:
    case types.SET_TEAMS_INCOMING:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    case types.SET_INPUT_INCOMING_VALUE:
      draft.input[action.data.data.key] = action.data.data.value;
      break;
    default:
      break;
  }
});

export default reducer;
