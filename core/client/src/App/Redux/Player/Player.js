import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  open: false,
  sourceType: '',
  playing: true,
  sources: {},
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.PLAYER_OPEN:
    case types.PLAYER_CLOSE:
      return { ...state, open: action.payload.open }
    case types.PLAYER_REGISTER:
    case types.PLAYER_DEREGISTER:
      return { ...state, sources: action.payload.sources }
    case types.PLAYER_PLAY:
    case types.PLAYER_PAUSE:
      return { ...state, playing: action.payload.playing }
    default:
      return state;
  }
}

export default reducer