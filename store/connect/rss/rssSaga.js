/* eslint-disable max-len,no-empty-function */
import {
  call, put,
} from 'redux-saga/effects';
import { initialModules, modules } from './rss';
import {
  getTeamsRss,
  postTeamsRss, putTeamsRssSetting,
} from '../../../api/connect/WebAdmin/RSS/rss';

const { creators } = modules;
export const saga = (() => ({
  /**
   * RSS Connect 설정 단일 조회
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsRss(data) {
    const result = yield call(getTeamsRss, data.data);
    yield put(creators.setTeamsRss(result.data));
  },
  /**
   * RSS Connect 설정 생성
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsRss(data) {
    const params = {
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-rss.png',
      botName: 'RSS 구독C',
      defaultBotName: 'RSS 구독',
      lang: 'ko',
      feedUrl: 'https://api.newswire.co.kr/rss/all',
      roomId: 20128232,
    };
    const result = yield call(postTeamsRss, { teamId: 279, data: params });
  },
  /**
   * RSS Connect 설정 수정
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsRssSetting(data) {
    const params = {
      connectId: data.data.connectId,
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-rss.png',
      botName: 'RSS 구독U',
      defaultBotName: 'RSS 구독',
      lang: 'ko',
      feedUrl: 'https://api.newswire.co.kr/rss/all',
      roomId: 20128232,
    };
    const result = yield call(putTeamsRssSetting, { teamId: 279, data: params });
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputRss(data) {
    yield put(creators.setInputRssValue(data));
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputRssValue() {},
}))();

export default function* rssSaga() {}
