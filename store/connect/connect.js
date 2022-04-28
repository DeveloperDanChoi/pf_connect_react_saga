/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';

export const GET_TEAMS_TOKEN = ''
export const GET_CONNECTS = 'connect/GET_CONNECTS';
export const SET_CONNECTS = 'connect/SET_CONNECTS';
export const SET_TEAMS_CONNECT = 'connect/SET_TEAMS_CONNECT';
export const SET_AUTHENTICATION = 'connect/SET_AUTHENTICATION';
export const SET_CONNECTS_OPEN = 'connect/SET_CONNECTS_OPEN';

export const getConnects = () => ({ type: GET_CONNECTS });
export const setConnects = (data) => ({ type: SET_CONNECTS, data });
export const setTeamsConnect = (data) => ({ type: SET_TEAMS_CONNECT, data });
export const setAuthentication = (data) => ({ type: SET_AUTHENTICATION, data });
export const setConnectsOpen = (data) => ({ type: SET_CONNECTS_OPEN, data });

export const initialState = {
  connects: [],
  teamsConnect: [],
  authentication: [],
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_CONNECTS:
      draft.connects = action.data;
      break;
    case SET_TEAMS_CONNECT:
      draft.teamsConnect = action.data;
      break;
    case SET_AUTHENTICATION:
      draft.authentication = action.data;
      break;
    case SET_CONNECTS_OPEN:
      draft.connects = [...draft.connects, action.data];
      break;
    default:
      break;
  }
});

export default reducer;
