/* eslint-disable max-len,no-empty-function */
import {
  call, put, select,
} from 'redux-saga/effects';
import { initialModules, modules } from './bitbucket';
import {
  getTeamsBitbucket,
  postTeamsBitbucket, putTeamsBitbucketSetting,
} from '../../../api/connect/WebAdmin/Bitbucket/bitbucket';
import { getTeamsToken } from '../../../api/connect/WebAdmin/webAdmin';
import { getV1AdminTeamsMembers } from "../../../api/team/Admin/admin";
import { util } from "../../../service/util";
import { reduxModule } from "../../../service/reduxModule";
import { converter } from "../../../service/converter";
import { redirectToMain } from "../../../lib/helpers/routeHelper";
import { Toast } from "../../../components/ui/Toast/Toast";

const { creators } = modules;
export const saga = (() => ({
  /**
   * Webhook용 Token을 요청하는 API<br>
   */
  * getTeamsToken(data, connectType = 'bitbucket') {
    const { team } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.params, { connectType, teamId: team.teamId });

    const result = yield call(api, request);

    yield put(creators.setTeamsToken(result.data));

    for (const key in result.data) {
      yield put(creators.setInputBitbucket({ key, value: result.data[key] }));
    }
  },
  /**
   * Bitbucket Connect 설정을 단일 조회하는 API<br>
   * 멤버 정보가 없을 경우 함께 불러와야 함<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsBitbucket(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.params, { ...data.data, teamId: team.teamId });

    const result = yield call(api, request);
    const resultMembers = yield call(getV1AdminTeamsMembers, result.data.teamId);

    for (const member of resultMembers.data.records) {
      if (member.id === result.data.memberId) {
        yield put(creators.setInputBitbucket({ key: 'member', value: member }));
        break;
      }
    }

    // TODO: 제거 하거나 편집일 떄 input -> teams 데이터로 변경
    yield put(creators.setTeamsBitbucket(result.data));

    for (const key in result.data) {
      yield put(creators.setInputBitbucket({ key, value: result.data[key] }));
    }

    yield put(creators.setInputBitbucket({ key: 'type', value: 'bitbucket' }));
    yield put(creators.setInputBitbucket({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
    yield put(creators.setInputBitbucket({ key: 'statusClss', value: converter.statusClss(result.data.status) }));
  },
  /**
   * Bitbucket Connect 설정을 생성하는 API<br>
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsBitbucket(data) {
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
   * Bitbucket Connect 설정을 수정하는 API<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsBitbucketSetting(data) {
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.body, data.data);
    // custom request data
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
  * setInputBitbucket(data) {
    yield put(creators.setInputBitbucketValue(data));
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputBitbucketValue() {},
}))();

export default function* bitbucketSaga() {}
