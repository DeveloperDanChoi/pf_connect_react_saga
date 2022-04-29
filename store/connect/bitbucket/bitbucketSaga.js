/* eslint-disable max-len */
import {
  all, call, fork, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  GET_TRELLO_BOARDS,
  setTrelloBoards,
  PUT_TRELLO,
  PUT_AUTHENTICATIONS, POST_TEAMS_BITBUCKET,
  setTeamsJiraToken,
} from './bitbucket';
import { getAuthenticationTrelloBoardsList, deleteAuthentications } from '../../../api/connect/Authentication/authentication';
import { postTeamsBitbucket } from '../../../api/connect/WebAdmin/Bitbucket/bitbucket';
import { getTeamsToken } from '../connect';

export function* postTeamsBitbucketSaga() {
  const data = yield select(getTeamsToken);
  console.log(data.data.connect.teamsToken.webhookToken);
  const params = {
    botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-bitbucket.png',
    botName: 'Bitbucket2',
    defaultBotName: 'Bitbucket',
    lang: 'ko',
    webhookToken: data.data.connect.teamsToken.webhookToken,
    roomId: 20128232,
  };
  yield call(postTeamsBitbucket, { teamId: 279, data: params });
  // yield put(putGooglecalendar(result.data));
}

function* watchPostTeamsBitbucket() {
  yield takeLatest(POST_TEAMS_BITBUCKET, postTeamsBitbucketSaga);
}
export default function* bitbucketSaga() {
  yield all([
    fork(watchPostTeamsBitbucket),
  ]);
}
