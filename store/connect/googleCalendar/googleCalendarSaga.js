/* eslint-disable max-len */
import {
  all, call, fork, put, takeLatest,
} from 'redux-saga/effects';
import {
  GET_GOOGLECALENDAR_CALENDARLIST,
  GET_GOOGLECALENDAR,
  setGooglecalendarCalendarlist,
  POST_GOOGLECALENDAR,
  PUT_AUTHENTICATIONS, setGooglecalendarCalendar, PUT_GOOGLECALENDAR_SETTING,
} from './googleCalendar';
import { getAuthenticationGoogleCalendarCalendarList, deleteAuthentications } from '../../../api/connect/Authentication/authentication';
import {
  getTeamsGoogleCalendar,
  postTeamsGoogleCalendar
} from '../../../api/connect/WebAdmin/GoogleCalendar/googleCalendar';

export function* googleCalendarCalendarList() {
  const result = yield call(getAuthenticationGoogleCalendarCalendarList);
  yield put(setGooglecalendarCalendarlist(result.data));
}
export function* googleCalendarCalendarSaga(data) {
  const result = yield call(getTeamsGoogleCalendar, data.data);
  yield put(setGooglecalendarCalendar(result.data));
}

export function* saveGoogleCalendar() {
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
  // yield put(putGooglecalendar(result.data));
}
export function* saveAuthentications(data) {
  const result = yield call(deleteAuthentications, { teamId: 279, authenticationId: data.data.authenticationId });
  if (result.status === 200) {

  }
  // yield put(putGooglecalendar(result.data));
}
export function* putGoogleCalendarSetting(data) {
  const result = yield call(deleteAuthentications, { teamId: 279, authenticationId: data.data.authenticationId });
  if (result.status === 200) {

  }
  // yield put(putGooglecalendar(result.data));
}

function* watchGoogleCalendarCalendarList() {
  yield takeLatest(GET_GOOGLECALENDAR_CALENDARLIST, googleCalendarCalendarList);
}
function* watchGoogleCalendarCalendar() {
  yield takeLatest(GET_GOOGLECALENDAR, googleCalendarCalendarSaga);
}
function* watchGoogleCalendar() {
  yield takeLatest(POST_GOOGLECALENDAR, saveGoogleCalendar);
}
function* watchAuthentications() {
  yield takeLatest(PUT_AUTHENTICATIONS, saveAuthentications);
}
function* watchGoogleCalendarSetting() {
  yield takeLatest(PUT_GOOGLECALENDAR_SETTING, putGoogleCalendarSetting);
}
export default function* googleCalendarSaga() {
  yield all([
    fork(watchGoogleCalendarCalendarList),
    fork(watchGoogleCalendarCalendar),
    fork(watchGoogleCalendar),
    fork(watchAuthentications),
    fork(watchGoogleCalendarSetting),
  ]);
}
