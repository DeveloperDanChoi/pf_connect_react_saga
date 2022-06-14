/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';
const prefix = 'team/';

export const INIT_VALUES = prefix + 'INIT_VALUES';
export const initValues = (data) => ({ type: INIT_VALUES, data });

export const initialState = {
  teamId: 0,
  team: {},
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case INIT_VALUES:
      draft[action.data.key] = action.data.value;
      break;
    default:
      break;
  }
});

export default reducer;
