/* eslint-disable max-len,no-empty-function */
import {
  call, put,
} from 'redux-saga/effects';
import { initialModules, modules } from './outgoing';
import {
  getTeamsOutgoing,
  postTeamsOutgoing, putTeamsOutgoingSetting,
} from '../../../api/connect/WebAdmin/Outgoing/outgoing';
import { getTeamsToken } from '../../../api/connect/WebAdmin/webAdmin';

const { creators } = modules;
export const saga = (() => ({
  /**
   * Webhook용 Token을 요청하는 API
   */
  * getTeamsToken(data) {
    const result = yield call(getTeamsToken, { connectType: 'outgoing', teamId: 279 });
    yield put(creators.setTeamsToken(result.data));
  },
  /**
   * Outgoing Webhook Connect 설정을 단일 조회하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsOutgoing(data) {
    const result = yield call(getTeamsOutgoing, data.data);

    yield put(creators.setTeamsOutgoing(result.data));
  },
  /**
   * Outgoing Webhook Connect 설정을 생성하는 API
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsOutgoing(data) {
    const params = {
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-outgoing.png',
      botName: '2022 abcd',
      defaultBotName: 'Webhook 발신 (Outgoing Webhook)',
      lang: 'ko',
      webhookUrl: 'https://script.google.com/macros/s/AKfycbxJhY0vRZ5o21BiGHCs6NUUJg2yca2op5azxsHAqWGnemsxCC9a56bg6xIrA8tw6N8Cfg/exec',
      webhookToken: data.data.outgoing.teamsToken.webhookToken,
      keyword: 'abcd',
      roomId: 20128232,
    };
    const result = yield call(postTeamsOutgoing, { teamId: 279, data: params });
  },
  /**
   * Outgoing Webhook Connect 설정을 수정하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsOutgoingSetting(data) {
    const params = {
      connectId: data.data.connectId,
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-outgoing.png',
      botName: '2022 abcd',
      defaultBotName: 'Webhook 발신 (Outgoing Webhook)',
      lang: 'ko',
      webhookUrl: 'https://script.google.com/macros/s/AKfycbxJhY0vRZ5o21BiGHCs6NUUJg2yca2op5azxsHAqWGnemsxCC9a56bg6xIrA8tw6N8Cfg/exec',
      webhookToken: data.data.outgoing.teamsToken.webhookToken,
      keyword: 'abcd',
      roomId: 20128232,
    };
    const result = yield call(putTeamsOutgoingSetting, { teamId: 279, data: params });
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputOutgoing(data) {
    yield put(creators.setInputOutgoingValue(data));
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputOutgoingValue() {},
}))();

export default function* outgoingSaga() {}
