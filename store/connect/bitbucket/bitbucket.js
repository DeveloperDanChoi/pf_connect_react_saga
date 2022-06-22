/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsBitbucket,
  postTeamsBitbucket,
  putTeamsBitbucketSetting,
} from '../../../api/connect/WebAdmin/Bitbucket/bitbucket';
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
   * Bitbucket Connect 설정을 단일 조회하는 API
   */
  {
    type: 'get',
    name: 'TEAMS_BITBUCKET',
    data: true,
    api: getTeamsBitbucket,
  },
  {
    type: 'set',
    name: 'TEAMS_BITBUCKET',
    data: true,
  },
  /**
   * Bitbucket Connect 설정을 생성하는 API
   */
  {
    type: 'post',
    name: 'TEAMS_BITBUCKET',
    data: false,
    api: postTeamsBitbucket,
  },
  /**
   * Bitbucket Connect 설정을 수정하는 API
   */
  {
    type: 'put',
    name: 'TEAMS_BITBUCKET_SETTING',
    data: true,
    api: putTeamsBitbucketSetting,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_BITBUCKET',
    data: true,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_BITBUCKET_VALUE',
    data: true,
  },
];
export const modules = (() => util.createModule(initialModules, 'bitbucket'))();
export const initialState = {
  teamsBitbucket: {
    id: 0,
  },
  input: {
    roomId: '',
    webhookToken: '',
    botName: '',
    botThumbnailFile: '',
    lang: '',
    langText: '한국어',
    searchText: '',
    selectedTopic: 'JANDI',
    searchRooms: [],
    searchFilters: [],
  },
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_TEAMS_TOKEN:
    case types.SET_TEAMS_BITBUCKET:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    case types.SET_INPUT_BITBUCKET_VALUE:
      draft.input[action.data.data.key] = action.data.data.value;
      break;
    default:
      break;
  }
});

export default reducer;
