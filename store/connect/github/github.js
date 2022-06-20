/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsGithub,
  postTeamsGithub,
  putTeamsGithubSetting,
} from '../../../api/connect/WebAdmin/Github/github';
import {
  deleteAuthentications,
  getAuthenticationGithubReposList,
} from '../../../api/connect/Authentication/authentication';

export const initialModules = [
  /**
   * 구글 캘린더에 등록된 캘린더 리스트를 반환하는 API
   */
  {
    type: 'get',
    name: 'AUTHENTICATION_GITHUB_REPOS_LIST',
    data: false,
    api: getAuthenticationGithubReposList,
  },
  { type: 'set', name: 'AUTHENTICATION_GITHUB_REPOS_LIST', data: true },
  /**
   * 단일 Github Connect 조회
   */
  {
    type: 'get',
    name: 'TEAMS_GITHUB',
    data: true,
    api: getTeamsGithub,
  },
  {
    type: 'set',
    name: 'TEAMS_GITHUB',
    data: true,
  },
  /**
   * Github Connect 설정 생성
   */
  {
    type: 'post',
    name: 'TEAMS_GITHUB',
    data: false,
    api: postTeamsGithub,
  },
  /**
   * Github Connect 설정 수정
   */
  {
    type: 'put',
    name: 'TEAMS_GITHUB_SETTING',
    data: true,
    api: putTeamsGithubSetting,
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
    name: 'INPUT_GITHUB',
    data: true,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_GITHUB_VALUE',
    data: true,
  },
];
export const modules = (() => util.createModule(initialModules, 'github'))();
export const initialState = {
  authenticationGithubReposList: {
    authenticationId: '',
  },
  input: {
    mode: '', // check !!
    roomId: '',
    botName: '',
    botThumbnailFile: '',
    lang: '',
    authenticationId: '',
    hookRepoId: '',
    hookRepoName: '',
    hookEvent: '',
    hookBranch: '',
    webhookToken: '',
    langText: '한국어',
    searchRepoText: '',
    selectedRepo: 'repo',
    searchRepos: [],
    searchRepoFilters: [],
    searchText: '',
    selectedTopic: 'JANDI',
    searchRooms: [],
    searchFilters: [],
  },
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_TEAMS_GITHUB:
    case types.SET_AUTHENTICATION_GITHUB_REPOS_LIST:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    case types.SET_INPUT_GITHUB_VALUE:
      draft.input[action.data.data.key] = action.data.data.value;
      break;
    default:
      break;
  }
});

export default reducer;
