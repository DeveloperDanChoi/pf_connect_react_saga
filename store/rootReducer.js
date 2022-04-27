import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import authority from './authority/authority';
import connect from './connect/connect';
import trello from './connect/trello/trello';
import github from './connect/github/github';
import googleCalendar from './connect/googleCalendar/googleCalendar';
import team from './team/team';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const combinedReducer = combineReducers({
  authority,
  connect,
  trello,
  github,
  googleCalendar,
  team,
});

export default persistReducer(persistConfig, combinedReducer);
