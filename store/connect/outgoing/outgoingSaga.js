/* eslint-disable max-len */
import {
  all, call, fork, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  POST_TEAMS_OUTGOING,
} from './outgoing';
import { postTeamsOutgoing } from '../../../api/connect/WebAdmin/Outgoing/outgoing';
import { getTeamsToken } from '../connect';

export function* postTeamsOutgoingSaga() {
  const data = yield select(getTeamsToken);
  const params = {
    botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-outgoing.png',
    botName: '2022 abcd',
    defaultBotName: 'Webhook 발신 (Outgoing Webhook)',
    lang: 'ko',
    webhookUrl: 'https://script.google.com/macros/s/AKfycbxJhY0vRZ5o21BiGHCs6NUUJg2yca2op5azxsHAqWGnemsxCC9a56bg6xIrA8tw6N8Cfg/exec',
    webhookToken: data.data.connect.teamsToken.webhookToken,
    keyword: 'abcd',
    roomId: 20128232,
  };
  yield call(postTeamsOutgoing, { teamId: 279, data: params });
}

function* watchPostTeamsOutgoing() {
  yield takeLatest(POST_TEAMS_OUTGOING, postTeamsOutgoingSaga);
}
export default function* outgoingSaga() {
  yield all([
    fork(watchPostTeamsOutgoing),
  ]);
}
