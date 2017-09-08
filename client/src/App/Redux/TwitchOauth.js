import * as types from './Types';

// Initial (starting) state
export const initialState = {
  loggedIn: false
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOGIN_STATUS:
      return { ...state, loggedIn: action.payload}
    case types.LOGIN_REQUEST:
      return { ...state}
    case types.LOGIN_SUCCESS:
      return { ...state, loggedIn: action.payload}
    case types.LOGOUT:
      return { ...state, loggedIn: action.payload}
    default:
      return state;
  }
}

export default reducer