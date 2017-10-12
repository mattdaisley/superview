import * as types from '../Types'

// Initial (starting) state
export const initialState = {
  channels: [],
  chatChannel: undefined
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_CHANNELS:
      return { ...state, channels: [ ...action.payload ] }
    case types.SET_CHANNEL_IDS:
      return { ...state, channels: [ ...action.payload ] }
    case types.RESET_CHANNELS:
      return { ...state, channels: [] }
    case types.SET_CHAT_CHANNEL:
      return { ...state, chatChannel: action.chatChannel }
    default:
      return state
  }
}

export default reducer