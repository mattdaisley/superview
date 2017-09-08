import { createStore, applyMiddleware } from 'redux';

import { rootReducer, initialState } from './Reducers'

import loggingMiddleware     from './LoggingMiddleware';
import apiMiddleware         from './ApiMiddleware';
import twitchOauthMiddleware from './TwitchOauthMiddleware';

export const ConfigureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      apiMiddleware,
      loggingMiddleware,
      twitchOauthMiddleware,
    )
  );

  return store;
}


export default ConfigureStore;