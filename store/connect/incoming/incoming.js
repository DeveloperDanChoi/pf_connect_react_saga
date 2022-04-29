/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';

export const POST_TEAMS_INCOMING = 'connect/incoming/POST_TEAMS_INCOMING';
export const SET_TEAMS_INCOMING_TOKEN = 'connect/incoming/SET_TEAMS_INCOMING_TOKEN';

export const postTeamsIncoming = (data) => ({ type: POST_TEAMS_INCOMING, data });
export const setTeamsIncomingToken = (data) => ({ type: SET_TEAMS_INCOMING_TOKEN, data });

export const initialState = {
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_TEAMS_INCOMING_TOKEN:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
