/* eslint-disable max-len,no-empty-function */
import {
  call, put,
} from 'redux-saga/effects';
import { initialModules, modules } from './jira';
import {
  getTeamsJira,
  postTeamsJira,
  putTeamsJiraSetting,
} from '../../../api/connect/WebAdmin/Jira/jira';
import { getTeamsToken } from '../../../api/connect/WebAdmin/webAdmin';

const { creators } = modules;
export const saga = (() => ({
  /**
   * Webhook용 Token을 요청하는 API
   */
  * getTeamsToken(data) {
    const result = yield call(getTeamsToken, { connectType: 'jira', teamId: 279 });
    yield put(creators.setTeamsToken(result.data));
  },
  /**
   * Jira Connect 설정을 단일 조회하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsJira(data) {
    const result = yield call(getTeamsJira, data.data);
    yield put(creators.setTeamsJira(result.data));
  },
  /**
   * Jira Connect 설정을 생성하는 API
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsJira(data) {
    const params = {
      botName: 'Jira_OK',
      defaultBotName: 'Jira',
      lang: 'ko',
      webhookToken: data.data.jira.teamsToken.webhookToken,
      roomId: 20128232,
    };
    const result = yield call(postTeamsJira, { teamId: 279, data: params });
  },
  /**
   * Jira Connect 설정을 수정하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsJiraSetting(data) {
    const params = {
      connectId: data.data.connectId,
      botName: 'Jira_UDP',
      defaultBotName: 'Jira',
      lang: 'ko',
      roomId: '20128232',
    };
    const result = yield call(putTeamsJiraSetting, { teamId: 279, data: params });
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputJira(data) {
    yield put(creators.setInputJiraValue(data));
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputJiraValue() {},
}))();

export default function* jiraSaga() {}
