import { combineReducers } from 'redux';

import * as twitchOauth    from './Twitch/TwitchOauth';
import * as twitchDetails  from './Twitch/TwitchChannels';

import * as youtubeOauth    from './Youtube/YoutubeOauth';
import * as youtubeDetails  from './Youtube/YoutubeChannels';

import * as recentChannels from './RecentChannels/RecentChannels';

import * as messages from './Messages/Messages';

export const rootReducer = combineReducers({
  twitchOauth: twitchOauth.reducer,
  twitchDetails: twitchDetails.reducer,
  youtubeOauth: youtubeOauth.reducer,
  youtubeDetails: youtubeDetails.reducer,
  recentChannels: recentChannels.reducer,
  messages: messages.reducer,
})

export const initialState = {
  twitchOauth: twitchOauth.initialState,
  twitchDetails: twitchDetails.initialState,
  youtubeOauth: youtubeOauth.initialState,
  youtubeDetails: youtubeDetails.initialState,
  recentChannels: recentChannels.initialState,
  messages: messages.initialState
}

export default rootReducer