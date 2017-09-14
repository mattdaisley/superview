import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  channels: [],
  channelDetails: []
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_TWITCH_CHANNEL:
      return { ...state, channels: action.payload }
    case types.GET_TWITCH_CHANNEL_DETAILS:
      return { ...state, channelDetails: action.payload }
    case types.RESET_TWITCH_CHANNEL:
      return { ...state, channels: [] }
    case types.RESET_TWITCH_CHANNEL_DETAILS:
      return { ...state, channelDetails: [] }
    default:
      return state;
  }
}

export default reducer