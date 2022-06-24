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
import { reduxModule } from '../../../service/reduxModule';

export const initialModules = [
  /**
   * 구글 캘린더에 등록된 캘린더 리스트를 반환하는 API<br>
   */
  {
    type: 'get',
    name: 'AUTHENTICATION_GITHUB_REPOS_LIST',
    data: false,
    api: getAuthenticationGithubReposList,
  },
  { type: 'set', name: 'AUTHENTICATION_GITHUB_REPOS_LIST', data: true },
  /**
   * 단일 Github Connect 조회<br>
   */
  {
    type: 'get',
    name: 'TEAMS_GITHUB',
    data: true,
    api: getTeamsGithub,
    request: {
      params: {
        teamId: 'Jandi Team ID',
        connectId: 'Connect ID',
      },
    },
  },
  {
    type: 'set',
    name: 'TEAMS_GITHUB',
    data: true,
  },
  /**
   * Github Connect 설정 생성<br>
   */
  {
    type: 'post',
    name: 'TEAMS_GITHUB',
    data: false,
    api: postTeamsGithub,
    request: {
      params: {
        teamId: 'Jandi Team ID',
      },
      body: {
        mode: 'Enum(\'authed\', \'unauthed\')',
        roomId: 'Room ID',
        botName: 'Bot name',
        botThumbnailFile: '봇의 프로필 이미지',
        lang: '커넥트 설정 언어',
        authenticationId: '인증 ID',
        hookRepoId: 'Github Repo ID',
        hookRepoName: 'Github Repo 이름(full_name),format: owner/repo',
        hookEvent: '연동할 Github webhook events 목록(Github 참고) push,commit_comment,create,delete',
        hookBranch: '연동할 Branch 목록, master,develop,feature/connect',
        webhookToken: 'Webhook Token String - webhook url 재생성 한 경우',
      },
    },
  },
  /**
   * Github Connect 설정 수정<br>
   */
  {
    type: 'put',
    name: 'TEAMS_GITHUB_SETTING',
    data: true,
    api: putTeamsGithubSetting,
    request: {
      params: {
        teamId: 'Jandi Team ID',
      },
      body: {
        // 수동모드 무엇?
        mode: 'Enum(\'authed\', \'unauthed\')',
        connectId: '연동된 커넥트 ID',
        roomId: '수정할 Room ID',
        botName: '수정할 봇 이름',
        botThumbnailFile: '커넥트 봇 프로필 이미지 파일',
        lang: '커넥트 설정 언어',
        hookRepoId: 'Github Repo ID',
        hookRepoName: 'Github Repo 이름(full_name),format: owner/repo',
        hookEvent: '연동할 Github webhook events 목록(Github 참고) push,commit_comment,create,delete',
        hookBranch: '연동할 Branch 목록, master,develop,feature/connect',
        webhookToken: 'Webhook Token String - webhook url 재생성 한 경우',
        authenticationId: '인증 ID',
      },
    },
  },
  /**
   * 연동 서비스 인증 삭제<br>
   */
  {
    type: 'delete',
    name: 'AUTHENTICATIONS',
    data: true,
    api: deleteAuthentications,
  },
  /**
   * 사용자 정의 데이터<br>
   */
  {
    type: 'set',
    name: 'INPUT_GITHUB',
    data: true,
  },
  /**
   * 사용자 정의 데이터<br>
   */
  {
    type: 'set',
    name: 'INPUT_GITHUB_VALUE',
    data: true,
  },
];
export const modules = (() => reduxModule.modules.create(initialModules, 'github'))();
export const initialState = {
  authenticationGithubReposList: {
    authenticationId: '',
    authenticationName: '',
    repos: [],
  },
  teamsGithub: {
    id: 0,
  },
  input: {
    mode: 'authed',
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
    selectedRepo: 'Repository 선택',
    selectedAuthentication: 'gmail.com',
    searchRepos: [],
    searchRepoFilters: [],
    searchText: '',
    selectedTopic: 'JANDI',
    searchRooms: [],
    searchFilters: [],
    member: { name: '' },
    hookEventChecked: {
      commit: false,
      commitComment: false,
      pullRequest: false,
      pullRequestComment: false,
      issue: false,
      issueComment: false,
      branchTag: false,
      pullRequestReview: false,
    },
  },
  getHookEventList: [
    { id: 'commit', text: 'Commits', value: ['push'] },
    { id: 'commitComment', text: 'Commit Comments', value: ['commit_comment'] },
    { id: 'pullRequest', text: 'Pull Requests Opened / Closed', value: ['pull_request'] },
    { id: 'pullRequestComment', text: 'Pull Request Comments', value: ['pull_request_review_comment'] },
    { id: 'issue', text: 'Issue Opened / Closed', value: ['issues'] },
    { id: 'issueComment', text: 'Issue Comments', value: ['issues_comment'] },
    { id: 'branchTag', text: 'Branch or Tag Created / Deleted', value: ['create', 'delete'] },
    { id: 'pullRequestReview', text: 'Pull Request Review', value: ['pull_request_review'] },
  ],
  getHookEvent: {
    push: 'commit',
    commit_comment: 'commitComment',
    pull_request: 'pullRequest',
    pull_request_review_comment: 'pullRequestComment',
    issues: 'issue',
    issue_comment: 'issueComment',
    create: 'branchTag',
    pull_request_review: 'pullRequestReview',
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
