import querystring from 'query-string'
import { twitchAuthActionCreators } from './twitch/twitchAuth'
import { googleAuthActionCreators } from './google/googleAuth'

const SET_WIDTH  = 'app/window/SET_WIDTH'
const SET_HEIGHT = 'app/window/SET_HEIGHT'

const initialState = {
  width: 0,
  height: 0,
}


const setWidth = ( width ) => {
  return {
    type: SET_WIDTH,
    payload: width,
  }
}

const setHeight = ( height ) => {
  return {
    type: SET_HEIGHT,
    payload: height,
  }
}

const handleHash = ( hash ) => (dispatch, getState) => {
  if ( hash ) {
    // console.log(hash)
    const response = querystring.parse(hash.substr(1))
    const expiresIn = response.expiry_date ? parseInt(response.expiry_date, 10) : NaN
    const state = ( response.state ) ? response.state.split(',') : []
    const referrer = state[1] || '/'

    console.log(response)
    if ( response.error ) return false

    if (response.twitch_access_token) {
      let twitchResult = {
        token: response.twitch_access_token,
        refresh: response.twitch_refresh_token,
        expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null,
        referrer,
      }
      if ( state.length > 0 && state[0] === 'twitchLoggedIn' ) {
        console.log(twitchResult)
        dispatch(twitchAuthActionCreators.twitchLoginSuccess(twitchResult))
        // this.props.twitchLoginSuccess(twitchResult)
      }
    }

    if ( response.google_access_token ) {
      let googleResult = {
        token: response.google_access_token,
        refresh: response.google_refresh_token,
        expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null,
        referrer,
        google_user_id: response.google_user_id
      }
      if ( state.length > 0 && state[0] === 'googleLoggedIn' ) {
        dispatch(googleAuthActionCreators.googleLoginSuccess(googleResult))
        // this.props.youtubeLoginSuccess(googleResult)
      }
    }
  }
}

const windowActionCreators = {
  setWidth,
  setHeight,
  handleHash,
};

const windowActionTypes = {
  SET_WIDTH,
  SET_HEIGHT,
};

export {
  windowActionCreators,
  windowActionTypes,
};

export default function windowReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_WIDTH:
      return { ...state, width: action.payload }
    case SET_HEIGHT:
      return { ...state, height: action.payload }
    default:
      return state
  }
}