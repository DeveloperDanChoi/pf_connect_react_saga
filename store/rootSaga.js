import {
  all, fork,
} from 'redux-saga/effects';

import authorizeSaga from './authority/authoritySaga';
import connectSaga from './connect/connectSaga';
import trelloSaga from './connect/trello/trelloSaga';
import jiraSaga from './connect/jira/jiraSaga';
import bitbucketSaga from './connect/bitbucket/bitbucketSaga';
import rssSaga from './connect/rss/rssSaga';
import outgoingSaga from './connect/outgoing/outgoingSaga';
import incomingSaga from './connect/incoming/incomingSaga';
import githubSaga from './connect/github/githubSaga';
import googleCalendarSaga from './connect/googleCalendar/googleCalendarSaga';
import teamSaga from './team/teamSaga';
import userSaga from './user/userSaga';
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
    fork(jiraSaga),
    fork(bitbucketSaga),
    fork(rssSaga),
    fork(outgoingSaga),
    fork(incomingSaga),
    fork(githubSaga),
    fork(googleCalendarSaga),
    // fork(commonSaga),
    // fork(userLoginSaga),
    // fork(authSagas),
    // fork(memberManagementSaga),
    // fork(organizationSaga),
    fork(userSaga),
    fork(teamSaga),
    // fork(securitySagas),
    // fork(paymentSagas),
    // fork(downloadHistorySagas),
    // fork(socketSaga),
  ]);
}
