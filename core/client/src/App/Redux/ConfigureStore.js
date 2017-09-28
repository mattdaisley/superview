import { createStore, applyMiddleware } from 'redux';

import { rootReducer, initialState } from './Reducers'

import loggingMiddleware     from './LoggingMiddleware';

import superViewApiMiddleware   from './SuperViewApi/SuperViewApiMiddleware';

import channelsListMiddleware from './ChannelsList/ChannelsListMiddleware';

import recentChannelsMiddleware from './RecentChannels/RecentChannelsMiddleware';

import twitchOauthMiddleware from './Twitch/TwitchOauthMiddleware';
import twitchApiMiddleware   from './Twitch/TwitchApiMiddleware';

import youtubeOauthMiddleware from './Youtube/YoutubeOauthMiddleware';
import youtubeApiMiddleware   from './Youtube/YoutubeApiMiddleware';

import messagesMiddleware from './Messages/MessagesMiddleware';

import playerMiddleware from './Player/PlayerMiddleware';

export const ConfigureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      loggingMiddleware,
      superViewApiMiddleware,
      channelsListMiddleware,
      recentChannelsMiddleware,
      twitchOauthMiddleware,
      twitchApiMiddleware,
      youtubeOauthMiddleware,
      youtubeApiMiddleware,
      messagesMiddleware,
      playerMiddleware
    )
  );

  return store;
}


export default ConfigureStore;