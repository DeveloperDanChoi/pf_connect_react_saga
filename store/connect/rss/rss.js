/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsRss,
  postTeamsRss,
  putTeamsRssSetting,
} from '../../../api/connect/WebAdmin/RSS/rss';
import { reduxModule } from '../../../service/reduxModule';

export const initialModules = [
  /**
   * RSS Connect 설정 단일 조회<br>
   */
  {
    type: 'get',
    name: 'TEAMS_RSS',
    data: true,
    api: getTeamsRss,
    request: {
      params: {
        teamId: 'Jandi Team ID',
        connectId: 'Connect ID',
      },
    },
  },
  {
    type: 'set',
    name: 'TEAMS_RSS',
    data: true,
  },
  /**
   * RSS Connect 설정 생성<br>
   */
  {
    type: 'post',
    name: 'TEAMS_RSS',
    data: false,
    api: postTeamsRss,
    request: {
      params: {
        teamId: 'Jandi Team ID',
      },
      body: {
        roomId: 'Room ID',
        feedUrl: 'RSS feed URL',
        botName: 'Bot name',
        botThumbnailFile: '봇의 프로필 이미지',
        lang: 'Language',
      },
      validate: [
        { name: 'roomId', type: 'string', msg: 'roomId' },
        { name: 'feedUrl', type: 'string', msg: 'feedUrl' },
        { name: 'botName', type: 'string', msg: 'botName' },
      ],
    },
  },
  /**
   * RSS Connect 설정 수정<br>
   */
  {
    type: 'put',
    name: 'TEAMS_RSS_SETTING',
    data: true,
    api: putTeamsRssSetting,
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
      validate: [
        { name: 'connectId', type: 'string', msg: 'connectId' },
        { name: 'roomId', type: 'string', msg: 'roomId' },
        { name: 'feedUrl', type: 'string', msg: 'feedUrl' },
        { name: 'botName', type: 'string', msg: 'botName' },
      ],
    },
  },
  /**
   * 사용자 정의 데이터<br>
   */
  {
    type: 'set',
    name: 'INPUT_RSS',
    data: true,
  },
  /**
   * 사용자 정의 데이터<br>
   */
  {
    type: 'set',
    name: 'INPUT_RSS_VALUE',
    data: true,
  },
  /**
   * 사용자 정의 로컬<br>
   */
  {
    type: 'set',
    name: 'LOCAL',
    data: true,
  },
  /**
   * 사용자 정의 로컬<br>
   */
  {
    type: 'set',
    name: 'LOCAL_VALUE',
    data: true,
  },
];
export const modules = (() => reduxModule.modules.create(initialModules, 'rss'))();
export const initialState = {
  teamsRss: {
    id: 0,
  },
  input: {
    roomId: '20128232',
    feedUrl: '',
    botName: '',
    botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-rss.png',
    lang: 'ko',
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
  local: {
    isEdit: false,
  },
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_INPUT_RSS_VALUE:
      draft.input[action.data.data.key] = action.data.data.value;
      break;
    case types.SET_LOCAL_VALUE:
      draft.local[action.data.data.key] = action.data.data.value;
      break;
    case types.SET_TEAMS_RSS:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
