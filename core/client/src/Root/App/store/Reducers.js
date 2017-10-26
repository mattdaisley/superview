import { combineReducers } from 'redux'

import windowReducer     from './modules/window' 
import sideNavReducer    from './modules/leftSideNav' 
import twitchApiReducer  from './modules/twitch/twitchApi' 
import twitchAuthReducer from './modules/twitch/twitchAuth' 
import googleApiReducer  from './modules/google/googleApi' 
import googleAuthReducer from './modules/google/googleAuth' 

export const rootReducer = combineReducers({
  window: windowReducer,
  sideNav: sideNavReducer,
  twitchApi: twitchApiReducer,
  twitchAuth: twitchAuthReducer,
  googleApi: googleApiReducer,
  googleAuth: googleAuthReducer,
})

export default rootReducer