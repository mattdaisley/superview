import * as types from '../Types';

// Initial (starting) state
export const initialState = {
  openState: 'closed',
  sourceType: '',
  loaded: false,
  playing: false,
  players: [],
  sources: [],
}

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.PLAYER_OPEN:
    case types.PLAYER_CLOSE:
    case types.PLAYER_MINIMIZE:
      return { ...state, openState: action.payload.openState }
    case types.PLAYER_REGISTER:
    case types.PLAYER_DEREGISTER:
      return { ...state, players: action.payload.players }
    case types.PLAYER_PLAY:
    case types.PLAYER_PAUSE:
      return { ...state, playing: action.payload.playing }
    case types.PLAYER_SOURCES:
      return { ...state, sourceType: action.payload.sourceType, sources: action.payload.sources }
    case types.PLAYER_LOADED:
      return { ...state, loaded: action.payload.loaded }
    default:
      return state;
  }
}

export default reducer