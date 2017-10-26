const SET_IS_OPEN  = 'app/leftSideNav/SET_IS_OPEN'

const initialState = {
  isOpen: false,
}

export default function sideNavReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_OPEN:
      return { ...state, open: action.payload }
    default:
      return state
  }
}

export function openSideNav( ) {
  return {
    type: SET_IS_OPEN,
    payload: true,
  }
}

export function closeSideNav( ) {
  return {
    type: SET_IS_OPEN,
    payload: false,
  }
}