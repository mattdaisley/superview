import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  loggedIn: false,
  logginRequested: false,
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.TWITCH_AUTH_STATUS:
      return { ...state, loggedIn: action.payload}
    case types.TWITCH_AUTH_REQUEST:
      return { ...state}
    case types.TWITCH_AUTH_REFRESH:
      return { ...state}
    case types.TWITCH_AUTH_REQUESTED:
      return { ...state, logginRequested: action.payload }
    case types.TWITCH_AUTH_SUCCESS:
      return { ...state, loggedIn: action.payload}
    case types.TWITCH_AUTH_FAILURE:
      return { ...state, loggedIn: action.payload}
    case types.TWITCH_LOGOUT:
      return { ...state, loggedIn: action.payload}
    default:
      return state;
  }
}

export default reducer