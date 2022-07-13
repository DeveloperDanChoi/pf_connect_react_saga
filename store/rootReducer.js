import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import authority from './authority/authority';
import connect from './connect/connect';
import asana from './connect/asana/asana';
import bitbucket from './connect/bitbucket/bitbucket';
import figma from './connect/figma/figma';
import github from './connect/github/github';
import googleCalendar from './connect/googleCalendar/googleCalendar';
import incoming from './connect/incoming/incoming';
import jira from './connect/jira/jira';
import notion from './connect/notion/notion';
import outgoing from './connect/outgoing/outgoing';
import rss from './connect/rss/rss';
import trello from './connect/trello/trello';
import team from './team/team';
import user from './user/user';
import modal from './modal/modal';
import theme from './theme/theme';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const combinedReducer = combineReducers({
  authority,
  connect,

  asana,
  bitbucket,
  figma,
  github,
  googleCalendar,
  incoming,
  jira,
  notion,
  outgoing,
  rss,
  trello,

  team,
  user,
  modal,
  theme,
});

export default persistReducer(persistConfig, combinedReducer);
