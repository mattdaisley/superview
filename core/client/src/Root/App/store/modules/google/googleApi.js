import config from './config'

import { googleAuthActionCreators } from './googleAuth'
import { doApiRequest, handleApiError } from './utils/utils'
import { hasToken, getToken } from './utils/tokens'

const SET_PROFILE = 'app/google/googleApi/SET_PROFILE'

const initialState = {
  profile: undefined,
  youtubeSearchResults: {
    videos: [],
    channels: []
  }
  // youtubeSearchResults: [],
  // youtubeChannelSearchResults: []
}


const setGoogleProfile = ( profile = {} ) => {
  return ({
    type: SET_PROFILE,
    payload: profile
  })
}



const getGoogleProfile = () => (dispatch, getState) => {
  const requestEnpoint = 'people/me'
  const url = config.plusRequestUri + requestEnpoint
  let googleProfile
  doApiRequest(dispatch, url)
    .then(json => {
      if ( !json.error ) {
        if ( json.id ) {
          googleProfile = json
          dispatch(googleAuthActionCreators.setGoogleLoggedIn(true))
        }
      }
      dispatch(setGoogleProfile(googleProfile))
    })
    .catch( err => {
      handleApiError(err, dispatch, getGoogleProfile) 
      dispatch(setGoogleProfile())
    })

}





const googleApiActionCreators = {
  setGoogleProfile,
  getGoogleProfile,
}

const googleApiActionTypes = {
  SET_PROFILE
}

export {
  googleApiActionCreators,
  googleApiActionTypes,
}


export default function googleApiReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SET_PROFILE:
      return { ...state, profile: action.payload}
    default:
      return state
  }
}
