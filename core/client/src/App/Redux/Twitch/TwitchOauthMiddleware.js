import * as types from '../Types';

import { setTwitchLogginRequested, twitchLoginRefresh, twitchLoginSuccess } from './TwitchActionCreators'

import { setToken, setRefresh, removeToken, hasToken, getToken, getRefresh } from '../../Util/tokenTwitch';

const twitchOauthMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'twitchOauth') {
    return next(action);
  }

  switch (action.type) {
    case types.TWITCH_AUTH_STATUS:
      const prevStatus = store.getState().youtubeOauth.loggedIn;
      let newAction = Object.assign({}, action, {
        payload: (hasToken() && prevStatus)
      });
      delete newAction.meta;
      store.dispatch(newAction);
      break

    case types.TWITCH_AUTH_REQUEST:
      store.dispatch(setTwitchLogginRequested(true));
      // TODO: move this to a popup
      const {url} = action.meta;
      window.location.replace(url);
      break
      
    case types.TWITCH_AUTH_REFRESH:
      // console.log('TWITCH_AUTH_REFRESH', action.meta);
      let refreshUrl = 'http://127.0.0.1:7768/oauth2/twitch/refresh?access_token=' + action.meta.access_token + '&refresh_token=' + action.meta.refresh_token;
      // console.log('in YOUTUBE_LOGIN_REFRESH url:', refreshUrl);

      // let headers = { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' };
      // fetch(refreshUrl, headers)

      fetch(refreshUrl)
        .then(resp => resp.json())
        .then(json => {
          // console.log(json);
          if ( !json.error ) {
            const expiresIn = json.expiry_date ? parseInt(json.expiry_date, 10) : NaN
            const state = ( json.state ) ? json.state.split(',') : []
            const referrer = state[1]

            let result = {
              token: json.access_token,
              refresh: json.refresh_token,
              expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null,
              referrer,
            }
            store.dispatch(twitchLoginSuccess(result));
          }
        })
        .catch( err => {} )
      break;
      
    case types.TWITCH_AUTH_SUCCESS:
      setToken(action.meta.token, action.meta.expiresAt)
      setRefresh(action.meta.refresh)
      store.dispatch(setTwitchLogginRequested(false));
      let newLoginAction = Object.assign({}, action, {
        payload: hasToken()
      });
      delete newLoginAction.meta;
      store.dispatch(newLoginAction);
      // console.log(newLoginAction);
      if ( action.meta.referrer ) window.location.href = action.meta.referrer
      // window.location.href = '/';
      break;
      
    case types.TWITCH_AUTH_FAILURE:
      // console.log('TWITCH_AUTH_FAILURE action.meta:', action.meta);
      const isLogginRequested = store.getState().twitchOauth.logginRequested;
      // console.log('TWITCH_AUTH_FAILURE !isLogginRequested && !!action.meta.refresh', !isLogginRequested && !!action.meta.refresh);
      if ( !isLogginRequested && !!action.meta.refresh ) {
        const tokens = {
          access_token: getToken(),
          refresh_token: getRefresh(),
        }
        store.dispatch(setTwitchLogginRequested(true));
        store.dispatch(twitchLoginRefresh(tokens))
      }
      let newFailureAction = Object.assign({}, action, {
        payload: false
      });
      delete newFailureAction.meta;
      store.dispatch(newFailureAction);
      break;
      
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