import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  twitchFollowing: [],
  twitchFeatured: [],
  twitchSearchResults: []
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_TWITCH_FOLLOWING:
      return { ...state, twitchFollowing: action.payload }
    case types.RESET_TWITCH_FOLLOWING:
      return { ...state, twitchFollowing: [] }
    case types.GET_TWITCH_FEATURED:
      return { ...state, twitchFeatured: action.payload }
    case types.RESET_TWITCH_FEATURED:
      return { ...state, twitchFeatured: [] }
    case types.TWITCH_SEARCH:
      return { ...state, twitchSearchResults: action.payload }
    case types.RESET_TWITCH_SEARCH:
    return { ...state, twitchSearchResults: [] }
    default:
      return state;
  }
}

export default reducer