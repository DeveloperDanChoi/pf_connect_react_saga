import produce from '../../../lib/produce';
import { util } from '../../../service/util';
import {
  getTeamsTrello,
  postTeamsTrello,
  putTeamsTrelloSetting,
} from '../../../api/connect/WebAdmin/Trello/trello';
import {
  deleteAuthentications,
  getAuthenticationTrelloBoardsList,
} from '../../../api/connect/Authentication/authentication';

export const initialModules = [
  /**
   * Webhook Trello Board List 조회
   */
  {
    type: 'get',
    name: 'AUTHENTICATION_TRELLO_BOARDS_LIST',
    data: false,
    api: getAuthenticationTrelloBoardsList,
  },
  { type: 'set', name: 'AUTHENTICATION_TRELLO_BOARDS_LIST', data: true },
  /**
   * Connect Trello Service 조회
   */
  {
    type: 'get',
    name: 'TEAMS_TRELLO',
    data: true,
    api: getTeamsTrello,
  },
  {
    type: 'set',
    name: 'TEAMS_TRELLO',
    data: true,
  },
  /**
   * Connect Trello Service 생성
   */
  {
    type: 'post',
    name: 'TEAMS_TRELLO',
    data: false,
    api: postTeamsTrello,
  },
  /**
   * Connect Trello Service 설정 변경
   */
  {
    type: 'put',
    name: 'TEAMS_TRELLO_SETTING',
    data: true,
    api: putTeamsTrelloSetting,
  },
  /**
   * 연동 서비스 인증 삭제
   */
  {
    type: 'delete',
    name: 'AUTHENTICATIONS',
    data: true,
    api: deleteAuthentications,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_TRELLO',
    data: true,
  },
  /**
   * 사용자 정의 데이터
   */
  {
    type: 'set',
    name: 'INPUT_TRELLO_VALUE',
    data: true,
  },
];
export const modules = (() => util.createModule(initialModules, 'trello'))();
export const initialState = {
  authenticationTrelloBoardsList: {
    boards: [],
  },
  input: {
    botName: '',
    botThumbnailFile: '',
    authenticationId: '',
    trelloBoardId: '',
    trelloBoardName: '',
    lang: '',
    roomId: '',
    showBoardListFromMoved: false,
    showBoardListToMoved: '',
    showBoardMemberCreated: false,
    showBoardRenamed: false,
    showCardArchived: false,
    showCardAttachmentCreated: false,
    showCardChecklistCreated: false,
    showCardChecklistItemCreated: false,
    showCardChecklistItemUpdated: false,
    showCardCommentCreated: false,
    showCardCreated: false,
    showCardDescriptionUpdated: false,
    showCardDueDateUpdated: false,
    showCardLabelCreated: false,
    showCardLabelDeleted: '',
    showCardMemberCreated: false,
    showCardMoved: false,
    showCardRenamed: false,
    showCardUnarchived: '',
    showListArchived: false,
    showListCreated: false,
    showListRenamed: false,
    showListUnarchived: '',
    langText: '한국어',
    searchBoardText: '',
    selectedAuthentication: '',
    selectedBoard: 'board 선택',
    searchText: '',
    selectedTopic: 'JANDI',
    searchRooms: [],
    searchFilters: [],
    searchBoardFilters: [],
    /**
     카드가 생성되었을 때
     카드가 옮겨졌을 때
     카드 이름이 변경되었을 때
     코멘트가 카드에 추가되었을 때
     첨부 파일이 카드에 추가되었을 때
     설명(Description)이 변경되었을 때
     마감일(Due date)이 변경되었을 때
     라벨(Label)이 변경되었을 때
     카드에 멤버가 추가되었을 때
     카드가 archive 또는 unarchive되었을 때
     리스트가 생성되었을 때
     리스트 이름이 바뀌었을 때
     리스트가 다른 보드로 옮겨졌을 때
     리스트가 archive 또는 unarchive되었을 때
     보드 이름이 바뀌었을 때
     보드에 멤버가 추가되었을 때
     체크리스트가 카드에 추가되었을 때
     체크리스트 아이템이 생성되었을 때
     체크리스트 아이템이 완료(Complete)/미완료(Incomplete)로 될 때
     */
    settingChecked: {
      showCardCreated: false,
      showCardMoved: false, // showBoardListToMoved
      showCardRenamed: false,
      showCardCommentCreated: false,
      showCardAttachmentCreated: false,
      showCardDescriptionUpdated: false,
      showCardDueDateUpdated: false,
      showCardLabelCreated: false, // showCardLabelDeleted
      showCardMemberCreated: false,
      showCardArchived: false,
      showListCreated: false,
      showListRenamed: false,
      showBoardListFromMoved: false,
      showListArchived: false, // showListUnarchived
      showBoardRenamed: false,
      showBoardMemberCreated: false,
      showCardChecklistCreated: false,
      showCardChecklistItemCreated: false,
      showCardChecklistItemUpdated: false,
    },
  },
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_AUTHENTICATION_TRELLO_BOARDS_LIST:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    case types.SET_INPUT_TRELLO_VALUE:
      draft.input[action.data.data.key] = action.data.data.value;
      break;
    default:
      break;
  }
});

export default reducer;
