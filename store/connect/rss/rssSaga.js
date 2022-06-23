/* eslint-disable max-len,no-empty-function */
import {
  call, put, select,
} from 'redux-saga/effects';
import { initialModules, modules } from './rss';
import {
  getTeamsRss,
  postTeamsRss, putTeamsRssSetting,
} from '../../../api/connect/WebAdmin/RSS/rss';
import { getV1AdminTeamsMembers } from "../../../api/team/Admin/admin";
import { util } from "../../../service/util";
import { reduxModule } from "../../../service/reduxModule";

const { creators } = modules;
export const saga = (() => ({
  /**
   * RSS Connect 설정 단일 조회<br>
   * 멤버 정보가 없을 경우 함께 불러와야 함<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsRss(data) {
    const result = yield call(getTeamsRss, data.data);
    const resultMembers = yield call(getV1AdminTeamsMembers, result.data.teamId);

    for (const member of resultMembers.data.records) {
      if (member.id === result.data.memberId) {
        yield put(creators.setInputRss({ key: 'member', value: member }));
        break;
      }
    }

    // TODO: 제거 하거나 편집일 떄 input -> teams 데이터로 변경
    yield put(creators.setTeamsRss(result.data));

    for (const key in result.data) {
      yield put(creators.setInputRss({ key, value: result.data[key] }));
    }

    yield put(creators.setInputRss({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
    // yield put(creators.setInputRss({ key: 'botThumbnailFile', value: result.data.botThumbnailFile }));
    // yield put(creators.setInputRss({ key: 'botName', value: result.data.botName }));
    // yield put(creators.setInputRss({ key: 'roomId', value: result.data.roomId }));
    // yield put(creators.setInputRss({ key: 'feedUrl', value: result.data.feedUrl }));
    // yield put(creators.setInputRss({ key: 'thumbnail', value: result.data.botThumbnailFile }));
    // yield put(creators.setInputRss({ key: 'memberName', value: 'abc' }));
    // yield put(creators.setInputRss({ key: 'createAt', value: 'xxxx-xx-xx' }));
    // yield put(creators.setInputRss({ key: 'status', value: result.data.status }));
    // yield put(creators.setInputRss({ key: 'statusClss', value: result.data.status === 'enabled' ? 'switch on' : 'switch' }));
  },
  * clearTeamsRss(data) {
    yield put(creators.setTeamsRss(data.data));
  },
  /**
   * RSS Connect 설정 생성<br>
   * botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-rss.png',<br>
   * botName: 'RSS 구독C',<br>
   * lang: 'ko',<br>
   * feedUrl: 'https://api.newswire.co.kr/rss/all',<br>
   * roomId: 20128232,<br>
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
   * RSS Connect 설정 수정<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsRssSetting(data) {
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.body, data.data);
    moduleData.request.body.connectId = data.data.id;
    moduleData.request.params.teamId = data.data.teamId;

    const result = yield call(moduleData.api, moduleData.request);

    if (result.status !== 200) {
      console.error('update fail !!');
      yield put(creators.getTeamsRss({
        connectId: moduleData.request.body.connectId,
        teamId: moduleData.request.params.teamId,
      }));
    }
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputRss(data) {
    yield put(creators.setInputRssValue(data));
  },
  /**
   * 사용자 정의 데이터<br>
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
    yield put(creators.setLocalValue(data));
  },
  * setLocalValue() {},
}))();

export default function* rssSaga() {}
