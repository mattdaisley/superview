import { combineReducers } from 'redux'

import windowReducer     from './modules/window' 
import sideNavReducer    from './modules/leftSideNav' 
import twitchApiReducer  from './modules/twitch/twitchApi' 
import twitchAuthReducer from './modules/twitch/twitchAuth' 

export const rootReducer = combineReducers({
  window: windowReducer,
  sideNav: sideNavReducer,
  twitchApi: twitchApiReducer,
  twitchAuth: twitchAuthReducer,
})

export default rootReducer