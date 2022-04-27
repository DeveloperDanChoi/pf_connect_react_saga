import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import rootMiddleware from './rootMiddleware';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, ...rootMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return { persistor: persistStore(store), ...store };
};

const wrapperOpt = {
  debug: process.env.NODE_ENV === 'development',
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
};

const wrapper = createWrapper(configureStore, wrapperOpt);

export default wrapper;
