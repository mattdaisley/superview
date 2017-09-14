import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  recentChannels: []
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_RECENT_CHANNELS_ITEMS:
      return { ...state, recentChannels: action.payload }
    case types.SET_RECENT_CHANNELS_ITEM:
      return { ...state, recentChannels: action.payload }
    default:
      return state;
  }
}

export default reducer