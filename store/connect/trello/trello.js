import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsTrello,
  postTeamsTrello,
  putTeamsTrelloSetting,
} from '../../../api/connect/WebAdmin/Trello/trello';
import {
  deleteAuthentications,
  getAuthenticationTrelloBoardsList,
} from '../../../api/connect/Authentication/authentication';

export const initialModules = [
  /**
   * Webhook Trello Board List 조회
   */
  {
    type: 'get',
    name: 'AUTHENTICATION_TRELLO_BOARDS_LIST',
    data: false,
    api: getAuthenticationTrelloBoardsList,
  },
  { type: 'set', name: 'AUTHENTICATION_TRELLO_BOARDS_LIST', data: true },
  /**
   * Connect Trello Service 조회
   */
  {
    type: 'get',
    name: 'TEAMS_TRELLO',
    data: true,
    api: getTeamsTrello,
  },
  {
    type: 'set',
    name: 'TEAMS_TRELLO',
    data: true,
  },
  /**
   * Connect Trello Service 생성
   */
  {
    type: 'post',
    name: 'TEAMS_TRELLO',
    data: false,
    api: postTeamsTrello,
  },
  /**
   * Connect Trello Service 설정 변경
   */
  {
    type: 'put',
    name: 'TEAMS_TRELLO_SETTING',
    data: true,
    api: putTeamsTrelloSetting,
  },
  /**
   * 연동 서비스 인증 삭제
   */
  {
    type: 'delete',
    name: 'AUTHENTICATIONS',
    data: true,
    api: deleteAuthentications,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_TRELLO',
    data: true,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_TRELLO_VALUE',
    data: true,
  },
];
export const modules = (() => util.createModule(initialModules, 'trello'))();
export const initialState = {
  authenticationTrelloBoardsList: {},
  input: {},
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_AUTHENTICATION_TRELLO_BOARDS_LIST:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    case types.SET_INPUT_TRELLO_VALUE:
      draft.input[action.data.data.key] = action.data.data.value;
      break;
    default:
      break;
  }
});

export default reducer;
