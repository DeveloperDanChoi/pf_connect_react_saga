/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsRss,
  postTeamsRss,
  putTeamsRssSetting,
} from '../../../api/connect/WebAdmin/RSS/rss';

export const initialModules = [
  /**
   * RSS Connect 설정 단일 조회
   */
  {
    type: 'get',
    name: 'TEAMS_RSS',
    data: true,
    api: getTeamsRss,
  },
  {
    type: 'set',
    name: 'TEAMS_RSS',
    data: true,
  },
  /**
   * RSS Connect 설정 생성
   */
  {
    type: 'post',
    name: 'TEAMS_RSS',
    data: false,
    api: postTeamsRss,
  },
  /**
   * RSS Connect 설정 수정
   */
  {
    type: 'put',
    name: 'TEAMS_RSS_SETTING',
    data: true,
    api: putTeamsRssSetting,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_RSS',
    data: true,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_RSS_VALUE',
    data: true,
  },
  /**
   * 사용자 정의 로컬
   */
  {
    type: 'set',
    name: 'LOCAL',
    data: true,
  },
  /**
   * 사용자 정의 로컬
   */
  {
    type: 'set',
    name: 'LOCAL_VALUE',
    data: true,
  },
];
export const modules = (() => util.createModule(initialModules, 'rss'))();
export const initialState = {
  input: {
    roomId: '20128232',
    feedUrl: '',
    botName: '',
    botThumbnailFile: '',
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
  },
  local: {
    isEdit: false,
  },
  teamsRss: {
    id: 0,
  }
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
