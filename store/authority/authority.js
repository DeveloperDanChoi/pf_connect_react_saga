import produce from '../../lib/produce';
import { HYDRATE } from 'next-redux-wrapper';

export const AUTHORIZE = 'authority/AUTHORIZE';
export const DOMAIN_CHECK_ERROR = 'authority/DOMAIN_CHECK_ERROR';

export const authorize = (data) => ({ type: AUTHORIZE, data });

export const domainCheckError = (data) => ({
  type: DOMAIN_CHECK_ERROR,
  data,
});

const initialState = {
  isTeamDomainValid: true,
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload }
    case DOMAIN_CHECK_ERROR:
      // eslint-disable-next-line no-param-reassign
      draft.isTeamDomainValid = false;
      break;
    default:
      break;
  }
});

export default reducer;
