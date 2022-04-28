/* eslint-disable max-len */
import {
  all, call, fork, put, takeLatest,
} from 'redux-saga/effects';
import {
  GET_TRELLO_BOARDS,
  setTrelloBoards,
  PUT_TRELLO,
  PUT_AUTHENTICATIONS,
} from './trello';
import { getAuthenticationTrelloBoardsList, deleteAuthentications } from '../../../api/connect/Authentication/authentication';
import { postTeamsTrello } from '../../../api/connect/WebAdmin/Trello/trello';

export function* trelloBoardsSaga() {
  const result = yield call(getAuthenticationTrelloBoardsList);
  if (result.status === 200) {
    yield put(setTrelloBoards(result.data));
  }
}
export function* saveTrello() {
  const params = {
    authenticationId: 273,
    botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-trello.png',
    botName: 'Trello',
    defaultBotName: 'Trello',
    lang: 'ko',
    showBoardRenamed: false,
    showCardAttachmentCreated: true,
    showCardChecklistCreated: true,
    showCardChecklistItemCreated: true,
    showCardChecklistItemUpdated: true,
    showCardCommentCreated: true,
    showCardCreated: true,
    showCardDescriptionUpdated: false,
    showCardDueDateUpdated: false,
    showCardMemberCreated: false,
    showCardMoved: true,
    showCardRenamed: false,
    showListCreated: true,
    showListRenamed: false,
    showBoardMemberCreated: false,
    showCardLabelCreated: false,
    showCardLabelDeleted: false,
    showListArchived: false,
    showListUnarchived: false,
    showCardArchived: false,
    showCardUnarchived: false,
    // TODO: why ?? error
    showBoardListFromMoved: false,
    showBoardListToMoved: false,
    roomId: 20128232,
    trelloBoardId: '6268eb6cfa80bf7f39def56d',
    trelloBoardName: 'first',
  };
  yield call(postTeamsTrello, { teamId: 279, data: params });
  // yield put(putGooglecalendar(result.data));
}
export function* saveAuthentications(data) {
  const result = yield call(deleteAuthentications, { teamId: 279, authenticationId: data.data.authenticationId });
  if (result.status === 200) {
    yield put(setTrelloBoards({}));
  }
  // yield put(putGooglecalendar(result.data));
}

function* watchTrelloBoards() {
  yield takeLatest(GET_TRELLO_BOARDS, trelloBoardsSaga);
}
function* watchTrello() {
  yield takeLatest(PUT_TRELLO, saveTrello);
}
function* watchAuthentications() {
  yield takeLatest(PUT_AUTHENTICATIONS, saveAuthentications);
}
export default function* trelloSaga() {
  yield all([
    fork(watchTrelloBoards),
    fork(watchTrello),
    fork(watchAuthentications),
  ]);
}
