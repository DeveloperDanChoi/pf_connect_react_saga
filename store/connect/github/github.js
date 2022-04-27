/* eslint-disable max-len,no-param-reassign,default-param-last */
import produce from '../../../lib/produce';
import { util } from '../../../service/util';

export const GET_GITHUB_REPOS = 'connect/github/GET_GITHUB_REPOS';
export const SET_GITHUB_REPOS = 'connect/github/SET_GITHUB_REPOS';
export const PUT_GITHUB = 'connect/github/PUT_GITHUB';
export const PUT_AUTHENTICATIONS = 'connect/github/PUT_AUTHENTICATIONS';

export const getGithubRepos = () => ({ type: GET_GITHUB_REPOS });
export const setGithubRepos = (data) => ({ type: SET_GITHUB_REPOS, data });
export const putGithub = () => ({ type: PUT_GITHUB });
export const putAuthentications = (data) => ({ type: PUT_AUTHENTICATIONS, data });

export const initialState = {
  githubRepos: {},
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_GITHUB_REPOS:
      draft[util.prefixRemoveToCamelCase(action.type, `${action.type.split('_')[0]}_`)] = action.data;
      break;
    default:
      break;
  }
});

export default reducer;
