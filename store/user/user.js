/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';
import { util } from '../../service/util';

export const USER = 'user/USER';
export const SET_USER = 'user/SET_USER';

export const user = (data) => ({ type: USER, data });
export const setUser = (data) => ({ type: SET_USER, data });

const initialState = {
  user: {
    lang: 'ko',
  },
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case USER:
      break;
    case SET_USER:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
