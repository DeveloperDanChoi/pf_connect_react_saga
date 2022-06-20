/* eslint-disable max-len,no-empty-function */
import {
  call, put, select,
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
    yield put(creators.setInputRss({ key: 'botThumbnailFile', value: result.data.botThumbnailFile }));
    yield put(creators.setInputRss({ key: 'botName', value: result.data.botName }));
    yield put(creators.setInputRss({ key: 'roomId', value: result.data.roomId }));
    yield put(creators.setInputRss({ key: 'feedUrl', value: result.data.feedUrl }));
    yield put(creators.setInputRss({ key: 'thumbnail', value: result.data.botThumbnailFile }));
    yield put(creators.setInputRss({ key: 'memberName', value: 'abc' }));
    yield put(creators.setInputRss({ key: 'createAt', value: 'xxxx-xx-xx' }));
    yield put(creators.setInputRss({ key: 'status', value: result.data.status }));
    yield put(creators.setInputRss({ key: 'statusClss', value: result.data.status === 'enabled' ? 'switch on' : 'switch' }));
  },
  * clearTeamsRss(data) {
    yield put(creators.setTeamsRss(data.data));
  },
  /**
   * RSS Connect 설정 생성
   * botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-rss.png',
   * botName: 'RSS 구독C',
   * lang: 'ko',
   * feedUrl: 'https://api.newswire.co.kr/rss/all',
   * roomId: 20128232,
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsRss(data) {
    const { team, user } = yield select((state) => state);
    const { roomId, feedUrl, botName, thumbnail, lang = user.user.account.lang } = data.data.rss.input;

    const result = yield call(postTeamsRss, {
      teamId: team.teamId,
      data: {
        roomId, feedUrl, botName, botThumbnailFile: thumbnail, lang
      }
    });

    // TODO: main refresh
  },
  /**
   * RSS Connect 설정 수정
   * @param data
   * connectId: data.data.connectId,
   * botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-rss.png',
   * botName: 'RSS 구독U',
   * lang: 'ko',
   * roomId: 20128232,
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsRssSetting(data) {
    const { team, user } = yield select((state) => state);
    const { roomId, feedUrl, botName, thumbnail, lang = user.user.account.lang, connectId = data.data.rss.teamsRss.id } = data.data.rss.input;

    const result = yield call(putTeamsRssSetting, {
      teamId: team.teamId,
      data: {
        connectId, botName, lang, roomId, botThumbnailFile: thumbnail
      }
    });

    // TODO: main refresh
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
  /**
   * 사용자 정의 Local
   * @param data
   * @returns {Generator<SimpleEffect<"PUT", PutEffectDescriptor<Generator<*, void, *>>>, void, *>}
   */
  * setLocal(data) {
    console.log('111111')
    yield put(creators.setLocalValue(data));
  },
  * setLocalValue() {},
}))();

export default function* rssSaga() {}
