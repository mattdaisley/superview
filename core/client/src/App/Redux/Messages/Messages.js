import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  messages: []
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }
    case types.REMOVE_MESSAGE:
      return { ...state, messages: [...state.messages.slice(0, action.payload), ...state.messages.slice(action.payload + 1)] }
    default:
      return state;
  }
}

export default reducer