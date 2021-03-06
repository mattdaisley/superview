import { combineReducers } from 'redux';

import * as superViewApi   from './SuperViewApi/SuperViewApi';

import * as twitchOauth    from './Twitch/TwitchOauth';
import * as twitchDetails  from './Twitch/TwitchChannels';
import * as twitchBrowse   from './Twitch/TwitchBrowse';

import * as youtubeOauth    from './Youtube/YoutubeOauth';
import * as youtubeDetails  from './Youtube/YoutubeChannels';
import * as youtubeBrowse   from './Youtube/YoutubeBrowse';

import * as recentChannels from './RecentChannels/RecentChannels';

import * as messages from './Messages/Messages';

import * as window   from './Window/Window'; 

import * as player       from './Player/Player';
import * as channelsList from './Player/ChannelsList/ChannelsList';

export const rootReducer = combineReducers({
  superViewApi: superViewApi.reducer,
  channelsList: channelsList.reducer,
  twitchOauth: twitchOauth.reducer,
  twitchDetails: twitchDetails.reducer,
  twitchBrowse: twitchBrowse.reducer,
  youtubeOauth: youtubeOauth.reducer,
  youtubeDetails: youtubeDetails.reducer,
  youtubeBrowse: youtubeBrowse.reducer,
  recentChannels: recentChannels.reducer,
  messages: messages.reducer,
  window: window.reducer,
  player: player.reducer,
})

export const initialState = {
  superViewApi: superViewApi.initialState,
  channelsList: channelsList.initialState,
  twitchOauth: twitchOauth.initialState,
  twitchDetails: twitchDetails.initialState,
  twitchBrowse: twitchBrowse.initialState,
  youtubeOauth: youtubeOauth.initialState,
  youtubeDetails: youtubeDetails.initialState,
  youtubeBrowse: youtubeBrowse.initialState,
  recentChannels: recentChannels.initialState,
  messages: messages.initialState,
  window: window.initialState,
  player: player.initialState,
}

export default rootReducer