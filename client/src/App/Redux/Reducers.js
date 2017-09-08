import { combineReducers } from 'redux';

import * as twitchOauth from './Twitch/TwitchOauth';

export const rootReducer = combineReducers({
  twitchOauth: twitchOauth.reducer,
})

export const initialState = {
  twitchOauth: twitchOauth.initialState,
}

export default rootReducer