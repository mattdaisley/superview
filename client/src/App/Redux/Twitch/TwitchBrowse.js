import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  twitchFollowing: []
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_TWITCH_FOLLOWING:
      return { ...state, twitchFollowing: action.payload }
    case types.RESET_TWITCH_FOLLOWING:
      return { ...state, twitchFollowing: [] }
    default:
      return state;
  }
}

export default reducer