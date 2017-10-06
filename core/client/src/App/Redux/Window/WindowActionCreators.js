import * as types from '../Types';

export const setWindowWidth = (width) => ({
  type: types.SET_WINDOW_WIDTH,
  meta: {
    type: 'windowState',
    width: width
  }
})

export const setWindowHeight = (height) => ({
  type: types.SET_WINDOW_HEIGHT,
  meta: {
    type: 'windowState',
    height: height
  }
})