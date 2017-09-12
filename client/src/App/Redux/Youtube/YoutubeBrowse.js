import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  youtubeSearchResults: []
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.YOUTUBE_SEARCH:
      return { ...state, youtubeSearchResults: action.payload }
    case types.RESET_YOUTUBE_SEARCH:
    return { ...state, youtubeSearchResults: [] }
    default:
      return state;
  }
}

export default reducer