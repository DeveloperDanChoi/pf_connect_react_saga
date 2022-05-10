/* eslint-disable max-len,no-empty-function */
import {
  call, put,
} from 'redux-saga/effects';
import { initialModules, modules } from './incoming';
import {
  getTeamsIncoming,
  postTeamsIncoming,
  putTeamsIncomingSetting,
} from '../../../api/connect/WebAdmin/Incoming/incoming';
import { getTeamsToken } from '../../../api/connect/WebAdmin/webAdmin';

const { creators } = modules;
export const saga = (() => ({
  /**
   * Webhook용 Token을 요청하는 API
   */
  * getTeamsToken(data) {
    const result = yield call(getTeamsToken, { connectType: 'incoming', teamId: 279 });
    yield put(creators.setTeamsToken(result.data));
  },
  /**
   * Incoming Webhook Connect 설정을 단일 조회하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsIncoming(data) {
    const result = yield call(getTeamsIncoming, data.data);
    yield put(creators.setTeamsIncoming(result.data));
  },
  /**
   * Incoming Webhook Connect 설정을 생성하는 API
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsIncoming(data) {
    const params = {
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-incoming.png',
      botName: 'Webhook 수신 (Incoming Webhook)',
      // defaultBotName: 'Webhook 수신 (Incoming Webhook)',
      // lang: 'ko',
      webhookToken: data.data.incoming.teamsToken.webhookToken,
      roomId: 20128232,
    };
    const result = yield call(postTeamsIncoming, { teamId: 279, data: params });
  },
  /**
   * Incoming Webhook Connect 설정을 수정하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsIncomingSetting(data) {
    const params = {
      connectId: data.data.connectId,
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-incoming.png',
      botName: 'Webhook 수신 (Incoming Webhook)_UPT',
      defaultBotName: 'Webhook 수신 (Incoming Webhook)',
      lang: 'ko',
      webhookToken: data.data.incoming.teamsToken.webhookToken,
      roomId: 20128232,
    };
    const result = yield call(putTeamsIncomingSetting, { teamId: 279, data: params });
  },
}))();

export default function* incomingSaga() {}
