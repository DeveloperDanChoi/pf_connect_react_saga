/* eslint-disable max-len,no-empty-function */
import {
  call, put,
} from 'redux-saga/effects';
import { initialModules, modules } from './bitbucket';
import {
  getTeamsBitbucket,
  postTeamsBitbucket, putTeamsBitbucketSetting,
} from '../../../api/connect/WebAdmin/Bitbucket/bitbucket';
import { getTeamsToken } from '../../../api/connect/WebAdmin/webAdmin';

const { creators } = modules;
export const saga = (() => ({
  /**
   * Webhook용 Token을 요청하는 API
   */
  * getTeamsToken(data) {
    const result = yield call(getTeamsToken, { connectType: 'bitbucket', teamId: 279 });
    yield put(creators.setTeamsToken(result.data));
  },
  /**
   * Bitbucket Connect 설정을 단일 조회하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsBitbucket(data) {
    const result = yield call(getTeamsBitbucket, data.data);
    yield put(creators.setTeamsBitbucket(result.data));
  },
  /**
   * Bitbucket Connect 설정을 생성하는 API
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsBitbucket(data) {
    const params = {
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-bitbucket.png',
      botName: 'Bitbucket_OK',
      defaultBotName: 'Bitbucket',
      lang: 'ko',
      webhookToken: data.data.bitbucket.teamsToken.webhookToken,
      roomId: 20128232,
    };
    const result = yield call(postTeamsBitbucket, { teamId: 279, data: params });
  },
  /**
   * Bitbucket Connect 설정을 수정하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsBitbucketSetting(data) {
    const params = {
      connectId: data.data.connectId,
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-bitbucket.png',
      botName: 'Bitbucket',
      defaultBotName: 'Bitbucket',
      lang: 'ko',
      roomId: '20128232',
    };
    const result = yield call(putTeamsBitbucketSetting, { teamId: 279, data: params });
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputBitbucket(data) {
    yield put(creators.setInputBitbucketValue(data));
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputBitbucketValue() {},
}))();

export default function* bitbucketSaga() {}
