import config from './config';
import { setToken, setRefresh, removeToken, hasToken, getToken, getRefresh, setTwitchUserId } from './tokens';

import { twitchApiActionCreators } from './twitchApi'

const clientId = config.clientId;
const requestUri = config.requestUri;
const redirectUri = config.redirectUri;


const SET_ISLOGGEDIN     = 'app/twitch/twitchAuth/SET_ISLOGGEDIN'
const SET_AUTH_REQUESTED = 'app/twitch/twitchAuth/SET_AUTH_REQUESTED'

const AUTH_REQUEST   = 'app/twitch/twitchAuth/AUTH_REQUEST'
const AUTH_SUCCESS   = 'app/twitch/twitchAuth/AUTH_SUCCESS'
const AUTH_FAILURE   = 'app/twitch/twitchAuth/AUTH_FAILURE'
const LOGOUT         = 'app/twitch/twitchAuth/LOGOUT'
const ADD_RETRY      = 'app/twitch/twitchAuth/ADD_RETRY'
const DO_RETRY       = 'app/twitch/twitchAuth/DO_RETRY'



const initialState = {
  loggedIn: undefined,
  loginRequested: false,
  retryStack: [],
}


const setTwitchLoggedIn = ( isLoggedIn ) => {
  return ({
    type: SET_ISLOGGEDIN,
    payload: isLoggedIn
  })
}

const getTwitchLoginStatus = () => (dispatch, getState) => {
  const prevStatus = getState().twitchAuth.loggedIn
  const isLoggedIn = hasToken() && !!prevStatus
  dispatch(setTwitchLoggedIn(isLoggedIn));
}

const setTwitchLogginRequested = ( isLoginRequested ) => {
  return ({
    type: SET_AUTH_REQUESTED,
    payload: isLoginRequested
  })
}



const twitchLoginSuccess = ({token, refresh, expiresAt, referrer}) => (dispatch, getState) => {
  setToken(token, expiresAt)
  setRefresh(refresh) 
  if ( hasToken() ) {
    dispatch(setTwitchLogginRequested(false))
    dispatch(setTwitchLoggedIn(true))

    if ( referrer ) window.location.href = referrer
  }
}

const twitchLoginFailure = ( {refresh = false} ) => (dispatch, getState)=> {
  const isLogginRequested = getState().twitchAuth.loginRequested
  if ( !isLogginRequested && !!refresh ) {
    const tokens = {
      access_token: getToken(),
      refresh_token: getRefresh(),
    }
    dispatch(setTwitchLogginRequested(true));
    dispatch(doAuthRefresh(tokens))
    dispatch(twitchApiActionCreators.setTwitchProfile(undefined));
  }
  dispatch(setTwitchLoggedIn(false));
}

const doAuthRefresh = ( tokens ) => (dispatch, getState) => {
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

  let refreshUrl = basePath + '/oauth2/twitch/refresh?access_token=' + tokens.access_token + '&refresh_token=' + tokens.refresh_token;
  // let headers = { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' };
  // fetch(refreshUrl, headers)

  fetch(refreshUrl)
    .then(resp => resp.json())
    .then(json => {
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
        dispatch(twitchLoginSuccess(result));
      }
    })
    .catch( err => dispatch(twitchLoginFailure({})) )
}




const twitchLogin = ( referrer ) => {
  
  const requestEnpoint = 'oauth2/authorize'
  const responseType = 'token';
  const scope = 'user_read';
  const state = 'twitchLoggedIn,' + referrer;

  return ({
    type: AUTH_REQUEST,
    meta: {
      type: 'twitchAuth',
      payload: {},
      url: requestUri + requestEnpoint + '?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=' + responseType + '&scope=' + scope + '&state=' + state
    }
  })
}

// const twitchLoginRefresh = ( {access_token, refresh_token} ) => {
//   return ({
//     type: AUTH_REFRESH,
//     meta: {
//       type: 'twitchAuth',
//       payload: {},
//       access_token,
//       refresh_token
//     }
//   })
// }

// const twitchLoginSuccess = ({token, refresh, expiresAt, referrer}) => {
//   return ({
    
//     type: AUTH_SUCCESS,
//     payload: true,
//     meta: {
//       type: 'twitchAuth',
//       token,
//       refresh,
//       expiresAt,
//       referrer
//     }
//   })
// }

// const twitchLoginFailure = ({refresh}) => {
//   // console.log('in TwitchActionCreators twitchLoginFailure');
//   return ({
//     type: AUTH_FAILURE,
//     payload: false,
//     meta: {
//       type: 'twitchAuth',
//       refresh: refresh || false
//     }
//   })
// }

const twitchLogout = () => ({
  type: LOGOUT,
  payload: false,
  meta: { type: 'twitchAuth' }
})


const twitchAuthActionCreators = {
  setTwitchLoggedIn,
  getTwitchLoginStatus,
  twitchLoginFailure,
  doAuthRefresh,
};

const twitchAuthActionTypes = {
  SET_ISLOGGEDIN,
  SET_AUTH_REQUESTED,

  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT,
  ADD_RETRY,
  DO_RETRY,
};

export {
  twitchAuthActionCreators,
  twitchAuthActionTypes,
};


export default function twitchAuthReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SET_ISLOGGEDIN:
      return { ...state, loggedIn: action.payload}
    case SET_AUTH_REQUESTED:
      return { ...state, loginRequested: action.payload }

    case AUTH_REQUEST:
      return { ...state }
    case AUTH_SUCCESS:
      return { ...state, loggedIn: action.payload}
    case AUTH_FAILURE:
      return { ...state, loggedIn: action.payload}
    case LOGOUT:
      return { ...state, loggedIn: action.payload}
    case ADD_RETRY:
      return { ...state, retryStack: [ ...state.retryStack, action.payload ] }
    case DO_RETRY:
      return { ...state, retryStack: action.payload }
    default:
      return state
  }
}
