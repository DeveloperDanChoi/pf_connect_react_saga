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
import { converter } from "../../../service/converter";
import { redirectToMain } from "../../../lib/helpers/routeHelper";
import { Toast } from "../../../components/ui/Toast/Toast";

const { creators } = modules;
export const saga = (() => ({
  /**
   * RSS Connect 설정 단일 조회<br>
   * 멤버 정보가 없을 경우 함께 불러와야 함<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsRss(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.params, { ...data.data, teamId: team.teamId });

    const result = yield call(api, request);
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

    yield put(creators.setInputRss({ key: 'type', value: 'rss' }));
    yield put(creators.setInputRss({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
    yield put(creators.setInputRss({ key: 'statusClss', value: converter.statusClss(result.data.status) }));
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
    const { team } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.body, data.data);
    // custom request data
    request.params.teamId = team.teamId;
    request.body.botThumbnailFile = util.base64ToBlob(data.data.botThumbnailFile);

    // validation
    const validMsg = reduxModule.modules.validate(request.validate, request.body);

    if (validMsg !== '') {
      yield put(Toast.show({ msg: validMsg, type: 'warning' }));
      return;
    }

    // request save
    const result = yield call(api, request);

    if (result.status === 200) {
      redirectToMain();
      return;
    }

    switch (result.status) {
      case 400:
      case 403:
        switch (result.data.code) {
          case 40305:
            yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
            break;
          default:
            yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
        }
        break;
      case 500:
        yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
        break;
      default:
        yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
    }
  },
  /**
   * RSS Connect 설정 수정<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsRssSetting(data) {
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.body, data.data);
    request.body.connectId = data.data.id;
    request.params.teamId = data.data.teamId;
    request.body.botThumbnailFile = util.base64ToBlob(data.data.botThumbnailFile);

    // validation
    const validMsg = reduxModule.modules.validate(request.validate, request.body);

    if (validMsg !== '') {
      yield put(Toast.show({ msg: validMsg, type: 'warning' }));
      return;
    }

    // request save
    const result = yield call(api, request);

    if (result.status === 200) {
      redirectToMain();
      return;
    }

    switch (result.status) {
      case 400:
      case 403:
        switch (result.data.code) {
          case 40305:
            yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
            break;
          default:
            yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
        }
        break;
      case 500:
        yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
        break;
      default:
        yield put(Toast.show({ msg: result.data.msg, type: 'error' }));
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
