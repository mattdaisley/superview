import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  loggedIn: true,
  logginRequested: false,
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.YOUTUBE_LOGIN_STATUS:
      return { ...state, loggedIn: action.payload}
    case types.YOUTUBE_LOGIN_REQUEST:
      return { ...state}
    case types.YOUTUBE_LOGIN_REFRESH:
      return { ...state}
    case types.YOUTUBE_LOGIN_REQUESTED:
      return { ...state, logginRequested: action.payload }
    case types.YOUTUBE_AUTH_SUCCESS:
      return { ...state, loggedIn: action.payload}
    case types.YOUTUBE_AUTH_FAILURE:
      return { ...state, loggedIn: action.payload}
    case types.YOUTUBE_LOGOUT:
      return { ...state, loggedIn: action.payload}
    default:
      return state;
  }
}

export default reducer