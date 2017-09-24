import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  youtubeRecentVideoIds: [],
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SUPERVIEW_YOUTUBE_SUBSCRIPTIONS:
      return { ...state, youtubeRecentVideoIds: action.payload }

    default:
      return state;
  }
}

export default reducer