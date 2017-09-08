import { createStore, applyMiddleware } from 'redux';

import { rootReducer, initialState } from './Reducers'

import loggingMiddleware     from './LoggingMiddleware';
import twitchOauthMiddleware from './Twitch/TwitchOauthMiddleware';
import recentChannelsMiddleware from './RecentChannels/RecentChannelsMiddleware';

export const ConfigureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      loggingMiddleware,
      twitchOauthMiddleware,
      recentChannelsMiddleware,
    )
  );

  return store;
}


export default ConfigureStore;