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

const { creators } = modules;
export const saga = (() => ({
  /**
   * 구글 캘린더에 등록된 캘린더 리스트를 반환하는 API
   */
  * getAuthenticationGoogleCalendarCalendarList() {
    const result = yield call(getAuthenticationGoogleCalendarCalendarList);
    yield put(creators.setAuthenticationGoogleCalendarCalendarList(result.data));
  },
  /**
   * 구글 캘린더 Connect 연동 정보를 반환하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsGoogleCalendar(data) {
    const result = yield call(getTeamsGoogleCalendar, data.data);
    yield put(creators.setTeamsGoogleCalendar(result.data));
  },
  /**
   * 구글 캘린더와 Connect 연동을 하는 API
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
   * 구글 캘린더 Connect 연동 설정을 변경하는 API
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsGoogleCalendarSetting(data) {
    const params = {
      connectId: data.data.connectId,
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
      botName: 'Google 캘린더2',
      defaultBotName: 'Google 캘린더',
      lang: 'ko',
    };
    const result = yield call(putTeamsGoogleCalendarSetting, { teamId: 279, data: params });
  },
  /**
   * 연동 서비스 인증 삭제
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * deleteAuthentications(data) {
    const { authenticationId } = data.data;
    const result = yield call(deleteAuthentications, { authenticationId });
  },
}))();

export default function* googleCalendarSaga() {}
