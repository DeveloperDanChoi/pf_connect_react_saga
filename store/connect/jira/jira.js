/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsJira,
  postTeamsJira,
  putTeamsJiraSetting,
} from '../../../api/connect/WebAdmin/Jira/jira';
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
   * Jira Connect 설정을 단일 조회하는 API
   */
  {
    type: 'get',
    name: 'TEAMS_JIRA',
    data: true,
    api: getTeamsJira,
  },
  {
    type: 'set',
    name: 'TEAMS_JIRA',
    data: true,
  },
  /**
   * Jira Connect 설정을 생성하는 API
   */
  {
    type: 'post',
    name: 'TEAMS_JIRA',
    data: false,
    api: postTeamsJira,
  },
  /**
   * Jira Connect 설정을 수정하는 API
   */
  {
    type: 'put',
    name: 'TEAMS_JIRA_SETTING',
    data: true,
    api: putTeamsJiraSetting,
  },
];
export const modules = (() => util.createModule(initialModules, 'jira'))();
export const initialState = {
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_TEAMS_TOKEN:
    case types.SET_TEAMS_JIRA:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
