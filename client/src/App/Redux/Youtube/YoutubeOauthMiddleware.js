import * as types from '../Types';

import { setToken, removeToken, hasToken } from '../../Util/tokenYoutube';

const youtubeOauthMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'youtubeOauth') {
    return next(action);
  }

  switch (action.type) {
    case types.YOUTUBE_LOGIN_STATUS:
      let newAction = Object.assign({}, action, {
        payload: hasToken()
      });
      delete newAction.meta;
      store.dispatch(newAction);
      break
    case types.YOUTUBE_LOGIN_REQUEST:
      const {url} = action.meta;
      window.location.replace(url);
      break
    case types.YOUTUBE_LOGIN_SUCCESS:
      setToken(action.meta.token, action.meta.expiresAt)
      let newLoginAction = Object.assign({}, action, {
        payload: hasToken()
      });
      delete newLoginAction.meta;
      store.dispatch(newLoginAction);
      break
    case types.YOUTUBE_LOGIN_FAILURE:
    case types.YOUTUBE_LOGOUT:
      removeToken()
      let newLogoutAction = Object.assign({}, action, {
        payload: hasToken()
      });
      delete newLogoutAction.meta;
      store.dispatch(newLogoutAction);
      break
    default:
      break
  }

}

export default youtubeOauthMiddleware