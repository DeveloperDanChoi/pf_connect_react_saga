/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';

export const POST_TEAMS_RSS = 'connect/rss/POST_TEAMS_RSS';

export const postTeamsRss = (data) => ({ type: POST_TEAMS_RSS, data });

export const initialState = {
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    default:
      break;
  }
});

export default reducer;
