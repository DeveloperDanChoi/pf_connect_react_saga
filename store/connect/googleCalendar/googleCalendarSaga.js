/* eslint-disable max-len,no-empty-function */
import {
  call, put,
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
    const result = yield call(getTeamsGoogleCalendar, data.data);
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

    yield put(creators.setInputGoogleCalendar({ key: 'createdAt', value: util.dateFormat(result.data.createdAt) }));
  },
  /**
   * 구글 캘린더와 Connect 연동을 하는 API<br>
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsGoogleCalendar(data) {
    const params = {
      googleId: 'dan.choi@tosslab.com',
      calendarId: 'dan.choi@tosslab.com',
      calendarSummary: 'dan.choi@tosslab.com',
      roomId: '20128232',
      hasNotificationBefore: 'true',
      notificationBefore: '15m',
      hasAllDayNotification: 'true',
      allDayNotificationBeforeDates: '0d',
      allDayNotificationHour: '9',
      hasDailyScheduleSummary: 'true',
      dailyScheduleSummary: '9',
      hasWeeklyScheduleSummary: 'true',
      weeklyScheduleSummaryHour: '9',
      weeklyScheduleSummaryDayOfWeek: 'MO',
      newEventNotification: 'true',
      updatedEventNotification: 'true',
      cancelledEventNotification: 'true',
      botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-googleCalendar.png',
      botName: 'Google 캘린더',
      defaultBotName: 'Google 캘린더',
      lang: 'ko',
    };
    const result = yield call(postTeamsGoogleCalendar, { teamId: 279, data: params });
  },
  /**
   * 구글 캘린더 Connect 연동 설정을 변경하는 API<br>
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsGoogleCalendarSetting(data) {
    // load initialModule
    const moduleData = reduxModule.modules.get(initialModules, reduxModule.typeName.get(data.type));
    // set request data
    reduxModule.modules.sets(moduleData.request.body, data.data);
    moduleData.request.body.connectId = data.data.id;
    moduleData.request.params.teamId = data.data.teamId;

    const result = yield call(moduleData.api, moduleData.request);

    if (result.status !== 200) {
      console.error('update fail !!');
      yield put(creators.getTeamsGoogleCalendar({
        connectId: moduleData.request.body.connectId,
        teamId: moduleData.request.params.teamId,
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
