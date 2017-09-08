import { combineReducers } from 'redux';

import * as twitchOauth from './Twitch/TwitchOauth';
import * as recentChannels from './RecentChannels/RecentChannels';

export const rootReducer = combineReducers({
  twitchOauth: twitchOauth.reducer,
  recentChannels: recentChannels.reducer,
})

export const initialState = {
  twitchOauth: twitchOauth.initialState,
  recentChannels: recentChannels.initialState,
}

export default rootReducer