import config from './config';
import { hasToken, getToken } from './tokens';

import { googleAuthActionCreators } from './googleAuth'

const SET_PROFILE = 'app/google/googleApi/SET_PROFILE'

const initialState = {
  profile: undefined,
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
  doYoutubeRequest(dispatch, url)
    .then(json => {
      let googleProfile
      if ( !json.error ) {
        if ( json.id ) {
          googleProfile = json
          dispatch(googleAuthActionCreators.setGoogleLoggedIn(true));
        }
      }
      dispatch(setGoogleProfile(googleProfile))
    })
    .catch( err => {
      handleApiError(err, dispatch, getGoogleProfile) 
      dispatch(setGoogleProfile())
    })

}


const doYoutubeRequest = (dispatch, url, options = {} ) => {
  
  return new Promise( (resolve,reject) => {
    
    if ( getToken() !== null ) {
      if ( !options.headers ) options.headers = {}
      options.headers.Authorization = 'Bearer ' + getToken()
    } else {
      url += '&key=' + config.clientId
    }

    fetch(url, options)
      .then(resp => {
        if ( resp.status === 204 ) {
          return Promise.resolve({})
        } else {
          return resp.json()
        }
      })
      .then(json => {
        if ( !json.error ) {
          resolve(json);
        } else {
          if ( json.error.code === 401 ) {
            // console.log(json.error);
            dispatch(googleAuthActionCreators.googleLoginFailure({refresh:true}));
            reject( {retry: true, error: json.error} )
          } else {
            reject( {retry: false, error: json.error} )
          }
        }
      })
      .catch(error => { 
        console.log('error:',error); 
        reject( {retry: false, error: error} ) }  
      )
        
  }) 
}

const handleApiError = ( err, dispatch, functionToRetry ) => {
  if ( !!err.retry ) {
    const retryOptions = {
      functionToRetry: () => dispatch(functionToRetry),
      expires: Date.now() + 10000
    }
    // dispatch( youtubeAddRetry(retryOptions) )
  }
}

const googleApiActionCreators = {
  setGoogleProfile,
  getGoogleProfile,
};

const googleApiActionTypes = {
  SET_PROFILE
};

export {
  googleApiActionCreators,
  googleApiActionTypes,
};


export default function googleApiReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SET_PROFILE:
      return { ...state, profile: action.payload}
    default:
      return state
  }
}
