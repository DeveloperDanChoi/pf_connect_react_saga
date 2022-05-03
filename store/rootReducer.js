import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import authority from './authority/authority';
import connect from './connect/connect';
import trello from './connect/trello/trello';
import jira from './connect/jira/jira';
import bitbucket from './connect/bitbucket/bitbucket';
import rss from './connect/rss/rss';
import outgoing from './connect/outgoing/outgoing';
import incoming from './connect/incoming/incoming';
import github from './connect/github/github';
import googleCalendar from './connect/googleCalendar/googleCalendar';
import team from './team/team';
import user from './user/user';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const combinedReducer = combineReducers({
  authority,
  connect,
  trello,
  jira,
  bitbucket,
  rss,
  outgoing,
  incoming,
  github,
  googleCalendar,
  team,
  user,
});

export default persistReducer(persistConfig, combinedReducer);
