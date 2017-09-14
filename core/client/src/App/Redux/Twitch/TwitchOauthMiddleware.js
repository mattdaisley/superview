import * as types from '../Types';

import { setToken, removeToken, hasToken } from '../../Util/tokenTwitch';

const twitchOauthMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'twitchOauth') {
    return next(action);
  }

  switch (action.type) {
    case types.TWITCH_LOGIN_STATUS:
      let newAction = Object.assign({}, action, {
        payload: hasToken()
      });
      delete newAction.meta;
      store.dispatch(newAction);
      break
    case types.TWITCH_LOGIN_REQUEST:
      const {url} = action.meta;
      window.location.replace(url);
      break
    case types.TWITCH_LOGIN_SUCCESS:
      setToken(action.meta.token, action.meta.expiresAt)
      let newLoginAction = Object.assign({}, action, {
        payload: hasToken()
      });
      delete newLoginAction.meta;
      store.dispatch(newLoginAction);
      console.log(newLoginAction);
      if ( action.meta.referrer ) window.location.href = action.meta.referrer
      break
    case types.TWITCH_LOGIN_FAILURE:
    case types.TWITCH_LOGOUT:
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

export default twitchOauthMiddleware