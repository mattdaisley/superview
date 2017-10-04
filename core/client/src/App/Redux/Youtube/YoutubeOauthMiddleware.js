import * as types from '../Types';

import { setYoutubeLoggedIn, setYoutubeLogginRequested, youtubeLoginRefresh, youtubeLoginSuccess, youtubeDoRetry, resetGoogleProfile } from './YoutubeActionCreators'
import { superViewDoRetry } from '../SuperViewApi/SuperViewApiActionCreators'
// import { setToken, removeToken, hasToken } from '../../Util/tokenYoutube';
import { setToken, setRefresh, removeToken, hasToken, getToken, getRefresh, setGoogleUserId } from '../../Util/tokenYoutube';

const youtubeOauthMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'youtubeOauth') {
    return next(action);
  }

  switch (action.type) {
    case types.YOUTUBE_LOGIN_STATUS:
      const prevStatus = store.getState().youtubeOauth.loggedIn;
      let newAction = Object.assign({}, action, {
        payload: (hasToken() && prevStatus)
      });
      delete newAction.meta;
      store.dispatch(newAction);
      break

    case types.YOUTUBE_SET_ISLOGGEDIN:
      let newSetIsLoggedinAction = Object.assign({}, action, {
        payload: action.meta.status
      });
      delete newSetIsLoggedinAction.meta;
      store.dispatch(newSetIsLoggedinAction);
      if ( !!newSetIsLoggedinAction.payload ) {
        store.dispatch(youtubeDoRetry()) 
        store.dispatch(superViewDoRetry()) 
      }
      break

    case types.YOUTUBE_LOGIN_REQUEST:
      store.dispatch(setYoutubeLogginRequested(true));
      // TODO: move this to a popup
      const {url} = action.meta;
      window.location.replace(url);
      break

    case types.YOUTUBE_LOGIN_REFRESH:
      let basePath;
      switch (process.env.NODE_ENV) {
        case 'development':
          basePath = 'http://127.0.0.1:7768';
          break;
        case 'production':
        default:
          basePath = 'https://www.superview.tv';
          break;
      }
      let refreshUrl = basePath + '/oauth2/google/refresh?access_token=' + action.meta.access_token + '&refresh_token=' + action.meta.refresh_token;
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
              google_user_id: json.google_user_id,
              expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null,
              referrer,
            }
            store.dispatch(youtubeLoginSuccess(result));
          }
        })
        .catch( err => {} )
      break;

    case types.YOUTUBE_AUTH_SUCCESS:
      setToken(action.meta.token, action.meta.expiresAt)
      if ( action.meta.google_user_id ) setGoogleUserId(action.meta.google_user_id)
      setRefresh(action.meta.refresh)
      store.dispatch(setYoutubeLogginRequested(false));
      let newLoginAction = Object.assign({}, action, {
        payload: hasToken()
      });
      delete newLoginAction.meta;
      store.dispatch(newLoginAction);
      // console.log(newLoginAction);
      if ( action.meta.referrer ) { 
        window.location.href = action.meta.referrer 
      } else { 
        store.dispatch(setYoutubeLoggedIn(true))
      }
      break;

    case types.YOUTUBE_AUTH_FAILURE:
      // console.log('YOUTUBE_AUTH_FAILURE action.meta:', action.meta);
      const isLogginRequested = store.getState().youtubeOauth.logginRequested;
      // console.log('YOUTUBE_AUTH_FAILURE !isLogginRequested && !!action.meta.refresh', !isLogginRequested && !!action.meta.refresh);
      if ( !isLogginRequested && !!action.meta.refresh ) {
        const tokens = {
          access_token: getToken(),
          refresh_token: getRefresh(),
        }
        store.dispatch(setYoutubeLogginRequested(true));
        store.dispatch(youtubeLoginRefresh(tokens))
      }
      let newFailureAction = Object.assign({}, action, {
        payload: false
      });
      delete newFailureAction.meta;
      store.dispatch(newFailureAction);
      break;

    case types.YOUTUBE_LOGOUT:
      removeToken()
      let newLogoutAction = Object.assign({}, action, {
        payload: hasToken()
      });
      delete newLogoutAction.meta;
      store.dispatch(newLogoutAction);
      store.dispatch(resetGoogleProfile());
      break
      
    case types.YOUTUBE_ADD_RETRY:
      // console.log('YOUTUBE_ADD_RETRY');
      let newRetryAction = Object.assign({}, action, {
        payload: action.meta.retryOptions
      })
      delete newRetryAction.meta;
      store.dispatch(newRetryAction);
      break;

    case types.YOUTUBE_DO_RETRY:
      let retryStack = store.getState().youtubeOauth.retryStack;
      // console.log('YOUTUBE_DO_RETRY retryStack:', retryStack);
      if ( retryStack.length > 0 ) {
        retryStack.forEach( stackItem => {
          // console.log('RetryOptions expires > Date.now():', stackItem.retryOptions.expires, Date.now(), stackItem.retryOptions.expires > Date.now())
          if ( stackItem.retryOptions.expires > Date.now() ) {
            stackItem.retryOptions.functionToRetry();
          }
        })
      }
      let newDoRetryAction = Object.assign({}, action, {
        payload: []
      })
      delete newDoRetryAction.meta;
      store.dispatch(newDoRetryAction);
      break;

    default:
      break
  }

}

export default youtubeOauthMiddleware