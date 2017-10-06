import * as types from '../Types';

const windowMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'windowState') {
    return next(action);
  }

  switch (action.type) {
    case types.SET_WINDOW_WIDTH:
      let windowWidthAction = Object.assign({}, action, {
        payload: action.meta.width
      });
      delete windowWidthAction.meta;
      store.dispatch(windowWidthAction);
      break
    case types.SET_WINDOW_HEIGHT:
      let windowHeightAction = Object.assign({}, action, {
        payload: action.meta.height
      });
      delete windowHeightAction.meta;
      store.dispatch(windowHeightAction);
      break
    default:
      break
  }

}

export default windowMiddleware