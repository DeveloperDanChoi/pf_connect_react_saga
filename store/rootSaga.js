import {
  all, fork,
} from 'redux-saga/effects';

import authorizeSaga from './authority/authoritySaga';
import connectSaga from './connect/connectSaga';
import trelloSaga from './connect/trello/trelloSaga';
import githubSaga from './connect/github/githubSaga';
import googleCalendarSaga from './connect/googleCalendar/googleCalendarSaga';
import teamSaga from './team/teamSaga';
import { config } from '../lib/config';

// eslint-disable-next-line require-yield
function* configUrl() {
  if (typeof window !== 'undefined') config.setConfig(window.jandiApp?.dev?.config);
}

export default function* rootSaga() {
  yield all([
    configUrl(),
    fork(authorizeSaga),
    fork(connectSaga),
    fork(trelloSaga),
    fork(githubSaga),
    fork(googleCalendarSaga),
    // fork(commonSaga),
    // fork(userLoginSaga),
    // fork(authSagas),
    // fork(memberManagementSaga),
    // fork(organizationSaga),
    fork(teamSaga),
    // fork(securitySagas),
    // fork(paymentSagas),
    // fork(downloadHistorySagas),
    // fork(socketSaga),
  ]);
}
