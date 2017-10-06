import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  width: '0', 
  height: '0',
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_WINDOW_WIDTH:
      return { ...state, width: action.payload }
    case types.SET_WINDOW_HEIGHT:
      return { ...state, height: action.payload }
    default:
      return state;
  }
}

export default reducer