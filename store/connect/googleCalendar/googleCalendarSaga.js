/* eslint-disable max-len,no-empty-function */
import {
  call, put, select,
} from 'redux-saga/effects';
import { initialModules, modules } from './googleCalendar';
import {
  getAuthenticationGoogleCalendarCalendarList,
  deleteAuthentications,
} from '../../../api/connect/Authentication/authentication';
import {
  getTeamsGoogleCalendar,
  postTeamsGoogleCalendar, putTeamsGoogleCalendarSetting,
} from '../../../api/connect/WebAdmin/GoogleCalendar/googleCalendar';
import { getV1AdminTeamsMembers } from '../../../api/team/Admin/admin';
import { util } from '../../../service/util';
import { reduxModule } from "../../../service/reduxModule";
import { converter } from "../../../service/converter";

const { creators } = modules;
export const saga = (() => ({
  /**
   * 구글 캘린더에 등록된 캘린더 리스트를 반환하는 API<br>
   */
  * getAuthenticationGoogleCalendarCalendarList() {
    const result = yield call(getAuthenticationGoogleCalendarCalendarList);
    yield put(creators.setAuthenticationGoogleCalendarCalendarList(result.data));
  },
  /**
   * 구글 캘린더 Connect 연동 정보를 반환하는 API<br>
   * 멤버 정보가 없을 경우 함께 불러와야 함<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsGoogleCalendar(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.params, { ...data.data, teamId: team.teamId });

    const result = yield call(api, request);
    const resultMembers = yield call(getV1AdminTeamsMembers, result.data.teamId);

    for (const member of resultMembers.data.records) {
      if (member.id === result.data.memberId) {
        yield put(creators.setInputGoogleCalendar({ key: 'member', value: member }));
        break;
      }
    }

    // TODO: 제거 하거나 편집일 떄 input -> teams 데이터로 변경
    yield put(creators.setTeamsGoogleCalendar(result.data));

    for (const key in result.data) {
      yield put(creators.setInputGoogleCalendar({ key, value: result.data[key] }));
    }
    yield put(creators.setInputGoogleCalendar({ key: 'type', value: 'googleCalendar' }));
    yield put(creators.setInputGoogleCalendar({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
    yield put(creators.setInputGoogleCalendar({ key: 'statusClss', value: converter.statusClss(result.data.status) }));
  },
  /**
   * 구글 캘린더와 Connect 연동을 하는 API<br>
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsGoogleCalendar(data) {
    const { team } = yield select((state) => state);
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.body, data.data);
    // custom request data
    request.params.teamId = team.teamId;
    request.body.botThumbnailFile = util.base64ToBlob(data.data.botThumbnailUrl);

    const result = yield call(api, request);
  },
  /**
   * 구글 캘린더 Connect 연동 설정을 변경하는 API<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsGoogleCalendarSetting(data) {
    // load initialModule
    const { request, api } = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(request.body, data.data);
    // custom request data
    request.body.connectId = data.data.id;
    request.params.teamId = data.data.teamId;
    request.body.botThumbnailFile = util.base64ToBlob(data.data.botThumbnailUrl);

    const result = yield call(api, request);

    if (result.status !== 200) {
      console.error('update fail !!');
      yield put(creators.getTeamsGoogleCalendar({
        connectId: request.body.connectId,
        teamId: request.params.teamId,
      }));
    }
  },
  /**
   * 연동 서비스 인증 삭제<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * deleteAuthentications(data) {
    const { authenticationId } = data.data;
    const result = yield call(deleteAuthentications, { authenticationId });

    yield put(creators.getAuthenticationGoogleCalendarCalendarList());
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputGoogleCalendar(data) {
    yield put(creators.setInputGoogleCalendarValue(data));
  },
  /**
   * 사용자 정의 데이터<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputGoogleCalendarValue() {},
}))();

export default function* googleCalendarSaga() {}
