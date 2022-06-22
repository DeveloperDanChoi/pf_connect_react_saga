/* eslint-disable max-len,no-empty-function */
import {
  call, put,
} from 'redux-saga/effects';
import { initialModules, modules } from './trello';
import {
  getAuthenticationTrelloBoardsList,
  deleteAuthentications,
} from '../../../api/connect/Authentication/authentication';
import {
  getTeamsTrello,
  postTeamsTrello, putTeamsTrelloSetting,
} from '../../../api/connect/WebAdmin/Trello/trello';

const { creators } = modules;
export const saga = (() => ({
  /**
   * Webhook Trello Board List 조회
   */
  * getAuthenticationTrelloBoardsList() {
    const result = yield call(getAuthenticationTrelloBoardsList);
    yield put(creators.setAuthenticationTrelloBoardsList(result.data));
  },
  /**
   * Connect Trello Service 조회
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>|SimpleEffect<"PUT", PutEffectDescriptor<*>>, void, *>}
   */
  * getTeamsTrello(data) {
    const result = yield call(getTeamsTrello, data.data);
    yield put(creators.setTeamsTrello(result.data));
    // yield put(creators.setInputRss({ key: 'botThumbnailFile', value: result.data.botThumbnailFile }));
    for (const key in result.data) {
      yield put(creators.setInputTrello({ key, value: result.data[key] }));
    }
  },
  /**
   * Connect Trello Service 생성
   * @param data
   * @returns {Generator<*, void, *>}
   */
  * postTeamsTrello(data) {
    const { authenticationTrelloBoardsList } = data.data.trello;
    const params = {
      authenticationId: authenticationTrelloBoardsList.authenticationId,
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
      showBoardListFromMoved: true,
      showBoardListToMoved: false,
      roomId: 20128232,
      trelloBoardId: authenticationTrelloBoardsList.boards[0].id,
      trelloBoardName: 'first',
    };
    const result = yield call(postTeamsTrello, { teamId: 279, data: params });
  },
  /**
   * Connect Trello Service 설정 변경
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * putTeamsTrelloSetting(data) {
    const { authenticationTrelloBoardsList } = data.data.trello;
    const params = {
      connectId: Number(data.data.connectId),
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
      trelloBoardId: authenticationTrelloBoardsList.boards[0].id,
      trelloBoardName: 'first',
    };
    // console.log( data , params )
    const result = yield call(putTeamsTrelloSetting, { teamId: 279, data: params });
  },
  /**
   * 연동 서비스 인증 삭제
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * deleteAuthentications(data) {
    const { authenticationId } = data.data;
    const result = yield call(deleteAuthentications, { authenticationId });
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputTrello(data) {
    yield put(creators.setInputTrelloValue(data));
  },
  /**
   * 사용자 정의 데이터
   * @param data
   * @returns {Generator<SimpleEffect<"CALL", CallEffectDescriptor<(function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*): Promise<AxiosResponse<*>>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
   */
  * setInputTrelloValue() {},
}))();

export default function* trelloSaga() {}
