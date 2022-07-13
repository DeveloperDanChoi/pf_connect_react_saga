/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsFigma,
  postTeamsFigma,
  putTeamsFigmaSetting,
} from '../../../api/connect/WebAdmin/Figma/figma';
import { getTeamsToken } from '../../../api/connect/WebAdmin/webAdmin';
import { reduxModule } from '../../../service/reduxModule';

export const initialModules = [
  /**
   * Webhook용 Token을 요청하는 API<br>
   */
  {
    type: 'get',
    name: 'TEAMS_TOKEN',
    data: false,
    api: getTeamsToken,
    request: {
      params: {
        teamId: 'Jandi Team ID',
        connectType: 'Token을 연결할 Connect 종류',
      },
    },
  },
  { type: 'set', name: 'TEAMS_TOKEN', data: true },
  /**
   * Figma Connect 설정을 단일 조회하는 API<br>
   */
  {
    type: 'get',
    name: 'TEAMS_FIGMA',
    data: true,
    api: getTeamsFigma,
    request: {
      params: {
        teamId: 'Jandi Team ID',
        connectId: 'Connect ID',
      },
    },
  },
  {
    type: 'set',
    name: 'TEAMS_FIGMA',
    data: true,
  },
  /**
   * Figma Connect 설정을 생성하는 API<br>
   */
  {
    type: 'post',
    name: 'TEAMS_FIGMA',
    data: false,
    api: postTeamsFigma,
    request: {
      params: {
        teamId: 'Jandi Team ID',
      },
      body: {
        roomId: 'Room ID',
        webhookToken: 'Webhook Token String',
        botName: 'Bot name',
        botThumbnailFile: '봇의 프로필 이미지',
      },
    },
  },
  /**
   * Figma Connect 설정을 수정하는 API<br>
   */
  {
    type: 'put',
    name: 'TEAMS_FIGMA_SETTING',
    data: true,
    api: putTeamsFigmaSetting,
    request: {
      params: {
        teamId: 'Jandi Team ID',
      },
      body: {
        connectId: 'Connect ID',
        roomId: 'Room ID',
        botName: 'Bot name',
        botThumbnailFile: '봇의 프로필 이미지',
      },
    },
  },
  /**
   * 사용자 정의 데이터<br>
   */
  {
    type: 'set',
    name: 'INPUT_FIGMA',
    data: true,
  },
  /**
   * 사용자 정의 데이터<br>
   */
  {
    type: 'set',
    name: 'INPUT_FIGMA_VALUE',
    data: true,
  },
];
export const modules = (() => reduxModule.modules.create(initialModules, 'figma'))();
export const initialState = {
  teamsFigma: {
    id: 0,
  },
  input: {
    authenticationId: '',
    roomId: '',
    webhookToken: '',
    webhookUrl: '',
    botName: '',
    botThumbnailFile: '',
    lang: '',
    langText: '한국어',
    searchText: '',
    selectedTopic: 'JANDI',
    searchRooms: [],
    searchFilters: [],
    member: { name: '' },
  },
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_TEAMS_TOKEN:
    case types.SET_TEAMS_FIGMA:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    case types.SET_INPUT_FIGMA_VALUE:
      draft.input[action.data.data.key] = action.data.data.value;
      break;
    default:
      break;
  }
});

export default reducer;
