const SET_IS_OPEN  = 'sideNav/SET_IS_OPEN'

const initialState = {
  isOpen: false,
}

export default function twitchApiReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_OPEN:
      return { ...state, open: action.payload }
    default:
      return state
  }
}