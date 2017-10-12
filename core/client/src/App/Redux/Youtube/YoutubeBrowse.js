import * as types from '../Types'

// Initial (starting) state
export const initialState = {
  googleProfile: undefined,
  youtubeSearchResults: [],
  youtubePopularResults: [],
  youtubeRecentResults: [],
  youtubeVideoRatings: [],
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_GOOGLE_PROFILE:
      return { ...state, googleProfile: action.payload }
    case types.RESET_GOOGLE_PROFILE:
      return { ...state, googleProfile: undefined }
    case types.YOUTUBE_SEARCH:
      return { ...state, youtubeSearchResults: action.payload }
    case types.RESET_YOUTUBE_SEARCH:
      return { ...state, youtubeSearchResults: [] }
    case types.YOUTUBE_POPULAR:
      return { ...state, youtubePopularResults: action.payload }
    case types.YOUTUBE_RECENT:
      return { ...state, youtubeRecentResults: action.payload }
    case types.SET_VIDEO_RATINGS:
      return { ...state, youtubeVideoRatings: [ ...action.payload ] }
    case types.RESET_VIDEO_RATINGS:
      return { ...state, youtubeVideoRatings: [] }

    default:
      return state
  }
}

export default reducer