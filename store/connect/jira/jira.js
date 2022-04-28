/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';

export const POST_TEAMS_JIRA = 'connect/jira/POST_TEAMS_JIRA';
export const SET_TEAMS_JIRA_TOKEN = 'connect/jira/SET_TEAMS_JIRA_TOKEN';
export const GET_TRELLO_BOARDS = 'connect/trello/GET_TRELLO_BOARDS';
export const SET_TRELLO_BOARDS = 'connect/trello/SET_TRELLO_BOARDS';
export const PUT_TRELLO = 'connect/trello/PUT_TRELLO';
export const PUT_AUTHENTICATIONS = 'connect/trello/PUT_AUTHENTICATIONS';

export const postTeamsJira = (data) => ({ type: POST_TEAMS_JIRA, data });
export const setTeamsJiraToken = (data) => ({ type: SET_TEAMS_JIRA_TOKEN, data });
export const getTrelloBoards = () => ({ type: GET_TRELLO_BOARDS });
export const setTrelloBoards = (data) => ({ type: SET_TRELLO_BOARDS, data });
export const putTrello = () => ({ type: PUT_TRELLO });
export const putAuthentications = (data) => ({ type: PUT_AUTHENTICATIONS, data });

export const initialState = {
  trelloBoards: {},
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_TRELLO_BOARDS:
    case SET_TEAMS_JIRA_TOKEN:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
