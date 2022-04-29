import {
  all, call, fork, put, select, takeLatest,
} from 'redux-saga/effects';
import {
  GET_GOOGLECALENDAR_CALENDARLIST,
  setGooglecalendarCalendarlist,
  PUT_GOOGLECALENDAR,
  PUT_AUTHENTICATIONS,
} from './googleCalendar';
import { getAuthenticationGoogleCalendarCalendarList, deleteAuthentications } from '../../../api/connect/Authentication/authentication';
import { postTeamsGoogleCalendar } from '../../../api/connect/WebAdmin/GoogleCalendar/googleCalendar';

export function* googleCalendarCalendarList() {
  const result = yield call(getAuthenticationGoogleCalendarCalendarList);
  yield put(setGooglecalendarCalendarlist(result.data));
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
  console.log(data);
  const result = yield call(deleteAuthentications, { teamId: 279, authenticationId: data.data.authenticationId });
  if (result.status === 200) {

  }
  // yield put(putGooglecalendar(result.data));
}

/*
googleId: dan.choi@tosslab.com
calendarId: dan.choi@tosslab.com
calendarSummary: dan.choi@tosslab.com
roomId: 20128232
hasNotificationBefore: true
notificationBefore: 15m
hasAllDayNotification: true
allDayNotificationBeforeDates: 0d
allDayNotificationHour: 9
hasDailyScheduleSummary: true
dailyScheduleSummary: 9
hasWeeklyScheduleSummary: true
weeklyScheduleSummaryHour: 9
weeklyScheduleSummaryDayOfWeek: MO
newEventNotification: true
updatedEventNotification: true
cancelledEventNotification: true
botThumbnailFile: https://cdn.jandi.io/files-resource/bots/bot-googleCalendar.png
botName: Google 캘린더
defaultBotName: Google 캘린더
lang: ko
 */

function* watchGoogleCalendarCalendarList() {
  yield takeLatest(GET_GOOGLECALENDAR_CALENDARLIST, googleCalendarCalendarList);
}
function* watchGoogleCalendar() {
  yield takeLatest(PUT_GOOGLECALENDAR, saveGoogleCalendar);
}
function* watchAuthentications() {
  yield takeLatest(PUT_AUTHENTICATIONS, saveAuthentications);
}
export default function* googleCalendarSaga() {
  yield all([
    fork(watchGoogleCalendarCalendarList),
    fork(watchGoogleCalendar),
    fork(watchAuthentications),
  ]);
}
