/* eslint-disable max-len */
import {
  all, call, fork, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  POST_TEAMS_RSS,
} from './rss';
import { postTeamsRss } from '../../../api/connect/WebAdmin/RSS/rss';

export function* postTeamsRssSaga() {
  const params = {
    botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-rss.png',
    botName: 'RSS 구독3',
    defaultBotName: 'RSS 구독',
    lang: 'ko',
    feedUrl: 'https://api.newswire.co.kr/rss/all',
    roomId: 20128232,
  };
  yield call(postTeamsRss, { teamId: 279, data: params });
}

function* watchPostTeamsRss() {
  yield takeLatest(POST_TEAMS_RSS, postTeamsRssSaga);
}
export default function* rssSaga() {
  yield all([
    fork(watchPostTeamsRss),
  ]);
}
