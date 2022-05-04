/* eslint-disable max-len,no-empty-function */
import {
  all, call, fork, put, takeLatest,
} from 'redux-saga/effects';
import { initialModules, modules } from './googleCalendar';
import { getAuthenticationGoogleCalendarCalendarList, deleteAuthentications } from '../../../api/connect/Authentication/authentication';
import {
  getTeamsGoogleCalendar,
  postTeamsGoogleCalendar,
} from '../../../api/connect/WebAdmin/GoogleCalendar/googleCalendar';
import { util } from '../../../service/util';

export const saga = (() => ({
  getGooglecalendarCalendarlist: function* getGooglecalendarCalendarlist() {
    const result = yield call(getAuthenticationGoogleCalendarCalendarList);
    yield put(modules.creators.setGooglecalendarCalendarlist(result.data));
  },
  getGoogleCalendarCalendar: function* googleCalendarCalendarSaga(data) {
    const result = yield call(getTeamsGoogleCalendar, data.data);
    yield put(modules.creators.setGooglecalendarCalendar(result.data));
  },
  saveGoogleCalendar: function* saveGoogleCalendar(data) {
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
  saveAuthentications: function* saveAuthentications(data) {
    const result = yield call(deleteAuthentications, { teamId: 279, authenticationId: data.data.authenticationId });
  },
  putGoogleCalendarSetting: function* putGoogleCalendarSetting(data) {
    const result = yield call(deleteAuthentications, { teamId: 279, authenticationId: data.data.authenticationId });
  },
}))();

export default function* googleCalendarSaga() {}
