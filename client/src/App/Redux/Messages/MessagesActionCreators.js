import * as types from '../Types';

export const setMessage = (message) => ({
  type: types.SET_MESSAGE,
  meta: {
    type: 'messages',
    message: message
  }
})

export const removeMessage = (index) => ({
  type: types.REMOVE_MESSAGE,
  meta: {
    type: 'messages',
    index: index
  }
})