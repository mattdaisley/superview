import config from './config';
import { setToken, setRefresh, removeToken, hasToken, getToken, getRefresh, setTwitchUserId } from './twitchTokens';

const clientId = config.clientId;
const requestUri = config.requestUri;
const redirectUri = config.redirectUri;


const AUTH_STATUS    = 'app/twitch/twitchAuth/AUTH_STATUS'
const SET_ISLOGGEDIN = 'app/twitch/twitchAuth/SET_ISLOGGEDIN'
const AUTH_REQUEST   = 'app/twitch/twitchAuth/AUTH_REQUEST'
const AUTH_REQUESTED = 'app/twitch/twitchAuth/AUTH_REQUESTED'
const AUTH_REFRESH   = 'app/twitch/twitchAuth/AUTH_REFRESH'
const AUTH_SUCCESS   = 'app/twitch/twitchAuth/AUTH_SUCCESS'
const AUTH_FAILURE   = 'app/twitch/twitchAuth/AUTH_FAILURE'
const LOGOUT         = 'app/twitch/twitchAuth/LOGOUT'
const ADD_RETRY      = 'app/twitch/twitchAuth/ADD_RETRY'
const DO_RETRY       = 'app/twitch/twitchAuth/DO_RETRY'



const initialState = {
  loggedIn: undefined,
  logginRequested: false,
  retryStack: [],
}


const setTwitchLoggedIn = ( isLoggedIn ) => {
  return ({
    type: SET_ISLOGGEDIN,
    payload: isLoggedIn
  })
}

// loginWithTwitter: () => (dispatch, getState) => {
//   hello('twitter').login()
//     .then(res => {
//       dispatch({type: types.LOGGED_IN, payload: res});
//     }, err => {
//       dispatch({type: types.ERROR_LOGGING_IN, payload: res});
//     })
// }

const getTwitchLoginStatus = () => (dispatch, getState) => {
  const prevStatus = getState().twitchAuth.loggedIn
  const isLoggedIn = hasToken() && !!prevStatus
  console.log(hasToken(), isLoggedIn)
  dispatch(setTwitchLoggedIn(isLoggedIn));
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

const twitchLoginRefresh = ( {access_token, refresh_token} ) => {
  return ({
    type: AUTH_REFRESH,
    meta: {
      type: 'twitchAuth',
      payload: {},
      access_token,
      refresh_token
    }
  })
}

const setTwitchLogginRequested = ( logginRequested ) => {
  return ({
    type: AUTH_REQUESTED,
    meta: {
      type: 'twitchAuth',
      payload: logginRequested
    }
  })
}

const twitchLoginSuccess = ({token, refresh, expiresAt, referrer}) => {
  return ({
    
    type: AUTH_SUCCESS,
    payload: true,
    meta: {
      type: 'twitchAuth',
      token,
      refresh,
      expiresAt,
      referrer
    }
  })
}

const twitchLoginFailure = ({refresh}) => {
  // console.log('in TwitchActionCreators twitchLoginFailure');
  return ({
    type: AUTH_FAILURE,
    payload: false,
    meta: {
      type: 'twitchAuth',
      refresh: refresh || false
    }
  })
}

const twitchLogout = () => ({
  type: LOGOUT,
  payload: false,
  meta: { type: 'twitchAuth' }
})


const twitchAuthActionCreators = {
  setTwitchLoggedIn,
  getTwitchLoginStatus
};

const twitchAuthActionTypes = {
  SET_ISLOGGEDIN,
  AUTH_STATUS,
  AUTH_REQUEST,
  AUTH_REQUESTED,
  AUTH_REFRESH,
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
    case AUTH_STATUS:
      return { ...state, loggedIn: action.payload}
    case AUTH_REQUEST:
      return { ...state }
    case AUTH_REFRESH:
      return { ...state }
    case AUTH_REQUESTED:
      return { ...state, logginRequested: action.payload }
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
