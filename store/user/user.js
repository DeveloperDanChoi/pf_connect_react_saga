/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';
import { util } from '../../service/util';

export const initialModules = [
  /**
   * User Info
   */
  { type: 'get', name: 'USER', data: false },
  { type: 'set', name: 'USER', data: true },
  /**
   * L10N
   */
  { type: 'set', name: 'L10N', data: true },
];
export const modules = (() => util.createModule(initialModules, 'user'))();

const initialState = {
  user: {
    lang: 'ko',
  },
  l10n: {},
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_USER:
    case types.SET_L10N:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
