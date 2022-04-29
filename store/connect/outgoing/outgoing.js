/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';

export const POST_TEAMS_OUTGOING = 'connect/outgoing/POST_TEAMS_OUTGOING';
export const SET_TEAMS_OUTGOING_TOKEN = 'connect/outgoing/SET_TEAMS_OUTGOING_TOKEN';

export const postTeamsOutgoing = (data) => ({ type: POST_TEAMS_OUTGOING, data });
export const setTeamsOutgoingToken = (data) => ({ type: SET_TEAMS_OUTGOING_TOKEN, data });

export const initialState = {
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_TEAMS_OUTGOING_TOKEN:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
