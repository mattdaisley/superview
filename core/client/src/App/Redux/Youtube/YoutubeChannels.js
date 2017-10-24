import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  videos: [],
  channelDetails: [],
  channel: {},
  playlistItems: [],
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_YOUTUBE_VIDEOS:
      return { ...state, videos: action.payload }
    case types.RESET_YOUTUBE_VIDEOS:
      return { ...state, videos: [] }
    case types.GET_YOUTUBE_CHANNEL_DETAILS_FROM_VIDEOS:
      return { ...state, channelDetails: action.payload }
    case types.RESET_YOUTUBE_CHANNEL_DETAILS_FROM_VIDEOS:
      return { ...state, channelDetails: [] }
    case types.GET_YOUTUBE_CHANNEL:
      return { ...state, channel: action.payload }
    case types.GET_YOUTUBE_PLAYLIST_ITEMS:
      return { ...state, playlistItems: state.playlistItems.push( action.payload ) }
    default:
      return state;
  }
}

export default reducer