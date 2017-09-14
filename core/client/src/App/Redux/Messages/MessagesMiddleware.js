import * as types from '../Types';

const messagesMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'messages') {
    return next(action);
  }

  switch (action.type) {
    case types.SET_MESSAGE:
      console.log(action);
      let setMessageAction = Object.assign({}, action, {
        payload: action.meta.message
      });
      delete setMessageAction.meta;
      store.dispatch(setMessageAction);
      break
    case types.REMOVE_MESSAGE:
      let removeMessageAction = Object.assign({}, action, {
        payload: action.meta.index
      });
      delete removeMessageAction.meta;
      store.dispatch(removeMessageAction);
      break
    default:
      break
  }

}

export default messagesMiddleware