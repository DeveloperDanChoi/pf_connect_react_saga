/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../lib/produce';
import { util } from '../../service/util';
import { reduxModule } from '../../service/reduxModule';

export const initialModules = [
  /**
   * Temp Theme
   */
  { type: 'get', name: 'THEME', data: false },
  { type: 'set', name: 'THEME', data: true },
];
export const modules = (() => reduxModule.modules.create(initialModules, 'theme'))();

const initialState = {
  theme: 'light',
};

const { types } = modules;
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case types.SET_THEME:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
