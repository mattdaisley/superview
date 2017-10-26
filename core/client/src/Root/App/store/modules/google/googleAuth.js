import config from './config';
import { setToken, setRefresh, removeToken, hasToken, getToken, getRefresh, setGoogleUserId } from './tokens';

import { googleApiActionCreators } from './googleApi'

const clientId = config.clientId;
const requestUri = config.requestUri;
const redirectUri = config.redirectUri;


const SET_ISLOGGEDIN     = 'app/google/googleAuth/SET_ISLOGGEDIN'
const SET_AUTH_REQUESTED = 'app/google/googleAuth/SET_AUTH_REQUESTED'

const AUTH_REQUEST   = 'app/google/googleAuth/AUTH_REQUEST'
const AUTH_SUCCESS   = 'app/google/googleAuth/AUTH_SUCCESS'
const AUTH_FAILURE   = 'app/google/googleAuth/AUTH_FAILURE'
const LOGOUT         = 'app/google/googleAuth/LOGOUT'
const ADD_RETRY      = 'app/google/googleAuth/ADD_RETRY'
const DO_RETRY       = 'app/google/googleAuth/DO_RETRY'



const initialState = {
  loggedIn: undefined,
  loginRequested: false,
  retryStack: [],
}


const setGoogleLoggedIn = ( isLoggedIn ) => {
  return ({
    type: SET_ISLOGGEDIN,
    payload: isLoggedIn
  })
}

const setGoogleLogginRequested = ( isLoginRequested ) => {
  return ({
    type: SET_AUTH_REQUESTED,
    payload: isLoginRequested
  })
}


const getGoogleLoginStatus = () => (dispatch, getState) => {
  const prevStatus = getState().googleAuth.loggedIn
  const isLoggedIn = hasToken() && !!prevStatus
  dispatch(setGoogleLoggedIn(isLoggedIn));
}



const googleLoginSuccess = ({token, refresh, google_user_id, expiresAt, referrer}) => (dispatch, getState) => {
  setToken(token, expiresAt)
  setRefresh(refresh) 
  if ( google_user_id ) setGoogleUserId(google_user_id)
  if ( hasToken() ) {
    dispatch(setGoogleLogginRequested(false))
    dispatch(setGoogleLoggedIn(true))

    if ( referrer ) window.location.href = referrer
  }
}

const googleLoginFailure = ( {refresh = false} ) => (dispatch, getState)=> {
  const isLogginRequested = getState().googleAuth.loginRequested
  if ( !isLogginRequested && !!refresh ) {
    const tokens = {
      access_token: getToken(),
      refresh_token: getRefresh(),
    }
    dispatch(setGoogleLogginRequested(true));
    dispatch(doAuthRefresh(tokens))
    dispatch(googleApiActionCreators.setGoogleProfile(undefined));
  }
  dispatch(setGoogleLoggedIn(false));
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

  let refreshUrl = basePath + '/oauth2/google/refresh?access_token=' + tokens.access_token + '&refresh_token=' + tokens.refresh_token;

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
          google_user_id: json.google_user_id,
          expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null,
          referrer,
        }
        dispatch(googleLoginSuccess(result));
      }
    })
    .catch( err => dispatch(googleLoginFailure({})) )
}




// const googleLogin = ( referrer ) => {
  
//   const requestEnpoint = 'oauth2/authorize'
//   const responseType = 'token';
//   const scope = 'user_read';
//   const state = 'googleLoggedIn,' + referrer;

//   return ({
//     type: AUTH_REQUEST,
//     meta: {
//       type: 'googleAuth',
//       payload: {},
//       url: requestUri + requestEnpoint + '?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=' + responseType + '&scope=' + scope + '&state=' + state
//     }
//   })
// }

// const googleLoginRefresh = ( {access_token, refresh_token} ) => {
//   return ({
//     type: AUTH_REFRESH,
//     meta: {
//       type: 'googleAuth',
//       payload: {},
//       access_token,
//       refresh_token
//     }
//   })
// }

// const googleLoginSuccess = ({token, refresh, expiresAt, referrer}) => {
//   return ({
    
//     type: AUTH_SUCCESS,
//     payload: true,
//     meta: {
//       type: 'googleAuth',
//       token,
//       refresh,
//       expiresAt,
//       referrer
//     }
//   })
// }

// const googleLoginFailure = ({refresh}) => {
//   // console.log('in GoogleActionCreators googleLoginFailure');
//   return ({
//     type: AUTH_FAILURE,
//     payload: false,
//     meta: {
//       type: 'googleAuth',
//       refresh: refresh || false
//     }
//   })
// }

const googleLogout = () => ({
  type: LOGOUT,
  payload: false,
  meta: { type: 'googleAuth' }
})


const googleAuthActionCreators = {
  setGoogleLoggedIn,
  getGoogleLoginStatus,
  googleLoginFailure,
  doAuthRefresh,
};

const googleAuthActionTypes = {
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
  googleAuthActionCreators,
  googleAuthActionTypes,
};


export default function googleAuthReducer(state = initialState, action = {}) {
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
