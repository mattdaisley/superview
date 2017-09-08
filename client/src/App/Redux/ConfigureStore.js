import { createStore, applyMiddleware } from 'redux';

import { rootReducer, initialState } from './Reducers'

import loggingMiddleware     from './LoggingMiddleware';
import twitchOauthMiddleware from './Twitch/TwitchOauthMiddleware';
import twitchApiMiddleware   from './Twitch/TwitchApiMiddleware';
import recentChannelsMiddleware from './RecentChannels/RecentChannelsMiddleware';

export const ConfigureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      loggingMiddleware,
      twitchOauthMiddleware,
      twitchApiMiddleware,
      recentChannelsMiddleware,
    )
  );

  return store;
}


export default ConfigureStore;