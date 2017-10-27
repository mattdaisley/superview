import config from '../config'
import { hasToken, getToken } from './tokens'
import { googleAuthActionCreators } from '../googleAuth'

export const doApiRequest = (dispatch, url, options = {} ) => {
  
  return new Promise( (resolve,reject) => {
    
    if ( hasToken() ) {
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
          resolve(json)
        } else {
          if ( json.error.code === 401 ) {
            // console.log(json.error)
            dispatch(googleAuthActionCreators.googleLoginFailure({refresh:true}))
            reject( {retry: true, error: json.error} )
          } else {
            reject( {retry: false, error: json.error} )
          }
        }
      })
      .catch(error => { 
        console.log('error:',error) 
        reject( {retry: false, error: error} ) }  
      )
        
  }) 
}

export const handleApiError = ( err, dispatch, functionToRetry ) => {
  if ( !!err.retry ) {
    const retryOptions = {
      functionToRetry: () => dispatch(functionToRetry),
      expires: Date.now() + 10000
    }
    dispatch( googleAuthActionCreators.googleAddRetry(retryOptions) )
  }
}