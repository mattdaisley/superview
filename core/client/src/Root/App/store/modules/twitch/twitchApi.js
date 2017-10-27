import config from './config';
import { hasToken, getToken } from './tokens';

import { twitchAuthActionCreators } from './twitchAuth'

const SET_PROFILE = 'app/twitch/twitchApi/SET_PROFILE'

const initialState = {
  profile: undefined,
}


const setTwitchProfile = ( profile = {} ) => {
  return ({
    type: SET_PROFILE,
    payload: profile
  })
}



const headers = {
  'Accept': 'application/vnd.twitchtv.v5+json',
  'Client-ID': config.clientId
}

if ( hasToken() ) {
  headers['Authorization'] = 'OAuth ' + getToken()
}



const getTwitchProfile = () => (dispatch, getState) => {

  const requestEnpoint = 'user'
  const url = config.requestUri + requestEnpoint
  fetch(url, {headers: headers})
    .then(resp => resp.json())
    .then(json => {
      let twitchProfile
      if ( !json.error ) {
        if ( json._id ) {
          twitchProfile = json
          dispatch(twitchAuthActionCreators.setTwitchLoggedIn(true));
        }
      } else {
        // console.log('GET_TWITCH_FOLLOWING error', json, json.error, json.status === 401);
        if ( json.status === 401 ) {
          dispatch(twitchAuthActionCreators.twitchLoginFailure({refresh:true}));
        }
      }
      dispatch(setTwitchProfile(twitchProfile))

    })
    .catch(err => console.log(err))

}


const twitchApiActionCreators = {
  setTwitchProfile,
  getTwitchProfile,
};

const twitchApiActionTypes = {
  SET_PROFILE
};

export {
  twitchApiActionCreators,
  twitchApiActionTypes,
};


export default function twitchApiReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SET_PROFILE:
      return { ...state, profile: action.payload}
    default:
      return state
  }
}
