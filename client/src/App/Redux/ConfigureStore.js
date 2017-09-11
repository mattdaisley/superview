import { createStore, applyMiddleware } from 'redux';

import { rootReducer, initialState } from './Reducers'

import loggingMiddleware     from './LoggingMiddleware';

import recentChannelsMiddleware from './RecentChannels/RecentChannelsMiddleware';

import twitchOauthMiddleware from './Twitch/TwitchOauthMiddleware';
import twitchApiMiddleware   from './Twitch/TwitchApiMiddleware';

import youtubeOauthMiddleware from './Youtube/YoutubeOauthMiddleware';
import youtubeApiMiddleware   from './Youtube/YoutubeApiMiddleware';

import messagesMiddleware from './Messages/MessagesMiddleware';

export const ConfigureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      loggingMiddleware,
      recentChannelsMiddleware,
      twitchOauthMiddleware,
      twitchApiMiddleware,
      youtubeOauthMiddleware,
      youtubeApiMiddleware,
      messagesMiddleware,
    )
  );

  return store;
}


export default ConfigureStore;