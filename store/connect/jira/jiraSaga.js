/* eslint-disable max-len */
import {
  all, call, fork, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  GET_TRELLO_BOARDS,
  setTrelloBoards,
  PUT_TRELLO,
  PUT_AUTHENTICATIONS, POST_TEAMS_JIRA,
  setTeamsJiraToken,
} from './jira';
import { getAuthenticationTrelloBoardsList, deleteAuthentications } from '../../../api/connect/Authentication/authentication';
import { postTeamsJira } from '../../../api/connect/WebAdmin/Jira/jira';
import {getTeamsToken} from "../connect";

export function* trelloBoardsSaga() {
  const result = yield call(getAuthenticationTrelloBoardsList);
  if (result.status === 200) {
    yield put(setTrelloBoards(result.data));
  }
}
export function* postTeamsJiraSaga() {
  const data = yield select(getTeamsToken);
  console.log(data.data.connect.teamsToken.webhookToken);
  const params = {
    botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-jira.png',
    botName: 'JIRA1',
    defaultBotName: 'JIRA',
    lang: 'ko',
    webhookToken: data.data.connect.teamsToken.webhookToken,
    roomId: 20128232,
  };
  yield call(postTeamsJira, { teamId: 279, data: params });
  // yield put(putGooglecalendar(result.data));
}
export function* saveAuthentications(data) {
  const result = yield call(deleteAuthentications, { teamId: 279, authenticationId: data.data.authenticationId });
  if (result.status === 200) {
    yield put(setTrelloBoards({}));
  }
  // yield put(putGooglecalendar(result.data));
}

function* watchPostTeamsJira() {
  yield takeLatest(POST_TEAMS_JIRA, postTeamsJiraSaga);
}
export default function* jiraSaga() {
  yield all([
    fork(watchPostTeamsJira),
  ]);
}
