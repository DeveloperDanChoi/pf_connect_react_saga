/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsOutgoing,
  postTeamsOutgoing,
  putTeamsOutgoingSetting,
} from '../../../api/connect/WebAdmin/Outgoing/outgoing';
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
   * Outgoing Webhook Connect 설정을 단일 조회하는 API
   */
  {
    type: 'get',
    name: 'TEAMS_OUTGOING',
    data: true,
    api: getTeamsOutgoing,
  },
  {
    type: 'set',
    name: 'TEAMS_OUTGOING',
    data: true,
  },
  /**
   * Outgoing Webhook Connect 설정을 생성하는 API
   */
  {
    type: 'post',
    name: 'TEAMS_OUTGOING',
    data: false,
    api: postTeamsOutgoing,
  },
  /**
   * Outgoing Webhook Connect 설정을 수정하는 API
   */
  {
    type: 'put',
    name: 'TEAMS_OUTGOING_SETTING',
    data: true,
    api: putTeamsOutgoingSetting,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_OUTGOING',
    data: true,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_OUTGOING_VALUE',
    data: true,
  },
];
export const modules = (() => util.createModule(initialModules, 'outgoing'))();
export const initialState = {
  teamsToken: {
    webhookToken: '',
  },
  input: {},
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_TEAMS_TOKEN:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    case types.SET_INPUT_OUTGOING_VALUE:
      draft.input[action.data.data.key] = action.data.data.value;
      break;
    default:
      break;
  }
});

export default reducer;
