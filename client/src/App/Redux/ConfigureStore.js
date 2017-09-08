import { createStore, applyMiddleware } from 'redux';

import { rootReducer, initialState } from './Reducers'

import loggingMiddleware     from './LoggingMiddleware';
import twitchOauthMiddleware from './Twitch/TwitchOauthMiddleware';

export const ConfigureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      loggingMiddleware,
      twitchOauthMiddleware,
    )
  );

  return store;
}


export default ConfigureStore;