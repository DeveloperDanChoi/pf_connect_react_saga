/* eslint-disable max-len,no-empty-function */
import {
  call, put,
} from 'redux-saga/effects';
import { initialModules, modules } from './github';
import {
  getAuthenticationGithubReposList,
  deleteAuthentications,
} from '../../../api/connect/Authentication/authentication';
import {
  getTeamsGithub,
  postTeamsGithub,
  putTeamsGithubSetting,
} from '../../../api/connect/WebAdmin/Github/github';

const { creators } = modules;
export const saga = (() => ({
  /**
   * 인증된 GitHub 정보와 해당 유저의 repositories 리스트 조회
   */
  * getAuthenticationGithubReposList() {
    // TODO: 정보가 있을 경우에만 call
    const result = yield call(getAuthenticationGithubReposList);
    if (result) {
      yield put(creators.setAuthenticationGithubReposList(result.data));
    }
  },
  /**
   * 단일 Github Connect 조회
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsGithub(data) {
    const result = yield call(getTeamsGithub, data.data);
    yield put(creators.setTeamsGithub(result.data));
  },
  /**
   * Github Connect 설정 생성
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsGithub(data) {
    const params = {
      mode: 'authed',
      authenticationId: 280,
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-github.png',
      botName: 'GitHub',
      defaultBotName: 'GitHub',
      lang: 'ko',
      roomId: 20128232,
      hookRepoId: 472152353,
      hookRepoName: 'DeveloperDanChoi/devConnect',
      hookEvent: 'push,commit_comment,pull_request,pull_request_review_comment,issues,issue_comment,pull_request_review',
      hookBranch: '',
    };
    const result = yield call(postTeamsGithub, { teamId: 279, data: params });
  },
  /**
   * Github Connect 설정 수정
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * putTeamsGithubSetting(data) {
    const params = {
      connectId: data.data.connectId,
      mode: 'authed',
      authenticationId: 280,
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-github.png',
      botName: 'GitHub2',
      defaultBotName: 'GitHub',
      lang: 'ko',
      roomId: 20128232,
      hookRepoId: 472152353,
      hookRepoName: 'DeveloperDanChoi/devConnect',
      hookEvent: 'push,commit_comment,pull_request,pull_request_review_comment,issues,issue_comment,pull_request_review',
      hookBranch: '',
    };
    const result = yield call(putTeamsGithubSetting, { teamId: 279, data: params });
  },
  /**
   * 연동 서비스 인증 삭제
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * deleteAuthentications(data) {
    const { authenticationId } = data.data;
    const result = yield call(deleteAuthentications, { authenticationId });
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputGithub(data) {
    yield put(creators.setInputGithubValue(data));
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputGithubValue() {},
}))();

export default function* githubSaga() {}
