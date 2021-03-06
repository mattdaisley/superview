import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  youtubeRecentVideoIds: [],
  retryStack: [],
  watchHistory: [],
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SUPERVIEW_YOUTUBE_SUBSCRIPTIONS:
      return { ...state, youtubeRecentVideoIds: action.payload }
    case types.SUPERVIEW_ADD_RETRY:
      return { ...state, retryStack: [ ...state.retryStack, action.payload ] }
    case types.SUPERVIEW_DO_RETRY:
      return { ...state, retryStack: action.payload }
    case types.SUPERVIEW_LOG_HISTORY:
      return { ...state, watchHistory: [ ...state.watchHistory, action.payload ] }
    case types.SUPERVIEW_GET_HISTORY:
      return { ...state, watchHistory: action.payload }
    default:
      return state;
  }
}

export default reducer