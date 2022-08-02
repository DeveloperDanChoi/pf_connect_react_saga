/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsOutgoing,
  postTeamsOutgoing,
  putTeamsOutgoingSetting,
} from '../../../api/connect/WebAdmin/Outgoing/outgoing';
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
   * Outgoing Webhook Connect 설정을 단일 조회하는 API<br>
   */
  {
    type: 'get',
    name: 'TEAMS_OUTGOING',
    data: true,
    api: getTeamsOutgoing,
    request: {
      params: {
        teamId: 'Jandi Team ID',
        connectId: 'Connect ID',
      },
    },
  },
  {
    type: 'set',
    name: 'TEAMS_OUTGOING',
    data: true,
  },
  /**
   * Outgoing Webhook Connect 설정을 생성하는 API<br>
   */
  {
    type: 'post',
    name: 'TEAMS_OUTGOING',
    data: false,
    api: postTeamsOutgoing,
    request: {
      params: {
        teamId: 'Jandi Team ID',
      },
      body: {
        roomId: 'Room ID',
        webhookToken: 'Webhook Token String',
        webhookUrl: 'Webhook URL',
        keyword: '시작 키워드 특수문자/공백 불가, 추후 comma separated',
        lang: '커넥트 설정 언어',
        botName: 'Bot name',
        botThumbnailFile: '봇의 프로필 이미지',
      },
      validate: [
        { name: 'roomId', type: 'string', msg: 'roomId' },
        { name: 'lang', type: 'string', msg: 'lang' },
        { name: 'webhookToken', type: 'string', msg: 'webhookToken' },
        { name: 'webhookUrl', type: 'string', msg: 'webhookUrl' },
        { name: 'keyword', type: 'string', msg: 'keyword' },
        { name: 'botName', type: 'string', msg: 'botName' },
      ],
    },
  },
  /**
   * Outgoing Webhook Connect 설정을 수정하는 API<br>
   */
  {
    type: 'put',
    name: 'TEAMS_OUTGOING_SETTING',
    data: true,
    api: putTeamsOutgoingSetting,
    request: {
      params: {
        teamId: 'Jandi Team ID',
      },
      body: {
        connectId: 'Connect ID',
        roomId: 'Room ID',
        webhookToken: 'Webhook Token String',
        webhookUrl: 'Webhook URL',
        keyword: '시작 키워드 특수문자/공백 불가, 추후 comma separated',
        lang: '커넥트 설정 언어',
        botName: 'Bot name',
        botThumbnailFile: '봇의 프로필 이미지',
      },
      validate: [
        { name: 'connectId', type: 'string', msg: 'connectId' },
        { name: 'roomId', type: 'string', msg: 'roomId' },
        { name: 'lang', type: 'string', msg: 'lang' },
        { name: 'webhookToken', type: 'string', msg: 'webhookToken' },
        { name: 'webhookUrl', type: 'string', msg: 'webhookUrl' },
        { name: 'keyword', type: 'string', msg: 'keyword' },
        { name: 'botName', type: 'string', msg: 'botName' },
      ],
    },
  },
  /**
   * 사용자 정의 데이터<br>
   */
  {
    type: 'set',
    name: 'INPUT_OUTGOING',
    data: true,
  },
  /**
   * 사용자 정의 데이터<br>
   */
  {
    type: 'set',
    name: 'INPUT_OUTGOING_VALUE',
    data: true,
  },
];
export const modules = (() => reduxModule.modules.create(initialModules, 'outgoing'))();
export const initialState = {
  teamsOutgoing: {
    id: 0,
  },
  teamsToken: {
    webhookToken: '',
  },
  input: {
    roomId: '',
    webhookToken: '',
    webhookUrl: '',
    keyword: '',
    lang: '',
    botName: '',
    botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-outgoing.png',
    langText: '한국어',
    searchCalText: '',
    selectedAuthentication: '',
    selectedCal: '',
    searchText: '',
    selectedTopic: 'JANDI',
    searchRooms: [],
    searchFilters: [],
    searchCalFilters: [],
    member: { name: '' },
  },
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_TEAMS_TOKEN:
    case types.SET_TEAMS_OUTGOING:
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
