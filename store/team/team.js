/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';
import { util } from '../../service/util';

export const SET_TEAM = 'team/SET_TEAM';
export const SET_TEAM_ID = 'team/SET_TEAM_ID';
export const SET_PAGE_TITLE = 'team/SET_PAGE_TITLE';

export const setTeam = (data) => ({ type: SET_TEAM, data });
export const setTeamId = (data) => ({ type: SET_TEAM_ID, data });
export const setPageTitle = (data) => ({ type: SET_PAGE_TITLE, data });

export const initialState = {
  teamId: 0,
  pageTitle: '',
  team: {},
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_TEAM_ID:
    case SET_PAGE_TITLE:
    case SET_TEAM:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
