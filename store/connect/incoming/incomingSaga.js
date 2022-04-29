/* eslint-disable max-len */
import {
  all, call, fork, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  POST_TEAMS_INCOMING,
} from './incoming';
import { postTeamsIncoming } from '../../../api/connect/WebAdmin/Incoming/incoming';
import { getTeamsToken } from '../connect';

export function* postTeamsIncomingSaga() {
  const data = yield select(getTeamsToken);
  const params = {
    botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-incoming.png',
    botName: 'Webhook 수신 (Incoming Webhook)2',
    defaultBotName: 'Webhook 수신 (Incoming Webhook)',
    lang: 'ko',
    webhookToken: data.data.connect.teamsToken.webhookToken,
    roomId: 20128232,
  };
  yield call(postTeamsIncoming, { teamId: 279, data: params });
}

function* watchPostTeamsIncoming() {
  yield takeLatest(POST_TEAMS_INCOMING, postTeamsIncomingSaga);
}
export default function* incomingSaga() {
  yield all([
    fork(watchPostTeamsIncoming),
  ]);
}
