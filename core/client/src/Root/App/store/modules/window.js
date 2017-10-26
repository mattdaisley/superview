const SET_WIDTH  = 'app/window/SET_WIDTH'
const SET_HEIGHT = 'app/window/SET_HEIGHT'

const initialState = {
  width: 0,
  height: 0,
}

export default function windowReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_WIDTH:
      return { ...state, width: action.payload }
    case SET_HEIGHT:
      return { ...state, height: action.payload }
    default:
      return state
  }
}

export function setWidth( width ) {
  return {
    type: SET_WIDTH,
    payload: width,
  }
}

export function setHeight( height ) {
  return {
    type: SET_HEIGHT,
    payload: height,
  }
}