/* eslint-disable max-len */
import {
  all, call, fork, put, takeLatest,
} from 'redux-saga/effects';
import {
  GET_GITHUB_REPOS,
  setGithubRepos,
  PUT_GITHUB,
  PUT_AUTHENTICATIONS,
} from './github';
import { getGithubRepos, putAuthentications } from '../../../api/connect/authentication';
import { postGithub } from '../../../api/connect/webAdmin/github';

export function* githubReposSaga() {
  const result = yield call(getGithubRepos);
  if (result.status === 200) {
    yield put(setGithubRepos(result.data));
  }
}
export function* saveGithub() {
  const params = {
    mode: 'authed',
    authenticationId: 265,
    botThumbnailFile: 'https://cdn.jandi.io/files-resource/bots/bot-github.png',
    botName: 'GitHub',
    defaultBotName: 'GitHub',
    lang: 'ko',
    roomId: 20128232,
    hookRepoId: 472152353,
    hookRepoName: 'DeveloperDanChoi/devConnect',
    hookEvent: 'push,commit_comment,pull_request,pull_request_review_comment,issues,issue_comment,pull_request_review',
    hookBranch: '',
  };
  yield call(postGithub, { teamId: 279, data: params });
  // yield put(putGooglecalendar(result.data));
}
export function* saveAuthentications(data) {
  const result = yield call(putAuthentications, { teamId: 279, authenticationId: data.data.authenticationId });
  if (result.status === 200) {
    yield put(setGithubRepos({}));
  }
  // yield put(putGooglecalendar(result.data));
}

function* watchGithubRepos() {
  yield takeLatest(GET_GITHUB_REPOS, githubReposSaga);
}
function* watchGithub() {
  yield takeLatest(PUT_GITHUB, saveGithub);
}
function* watchAuthentications() {
  yield takeLatest(PUT_AUTHENTICATIONS, saveAuthentications);
}
export default function* githubSaga() {
  yield all([
    fork(watchGithubRepos),
    fork(watchGithub),
    fork(watchAuthentications),
  ]);
}
