import { combineReducers } from 'redux';

import * as twitchOauth    from './Twitch/TwitchOauth';
import * as twitchDetails  from './PlayerDetails/Twitch';
import * as recentChannels from './RecentChannels/RecentChannels';

export const rootReducer = combineReducers({
  twitchOauth: twitchOauth.reducer,
  twitchDetails: twitchDetails.reducer,
  recentChannels: recentChannels.reducer,
})

export const initialState = {
  twitchOauth: twitchOauth.initialState,
  twitchDetails: twitchDetails.initialState,
  recentChannels: recentChannels.initialState,
}

export default rootReducer