
import { config } from './YoutubeConfig'
import { getToken } from '../../Util/tokenYoutube'
import { youtubeLoginFailure } from './YoutubeActionCreators'

export const doYoutubeRequest = (store, url, options = {} ) => {

  return new Promise( (resolve,reject) => {
    
    if ( getToken() !== null ) {
      options.headers = {
        'Authorization': 'Bearer ' + getToken()
      }
    } else {
      url += '&key=' + config.clientId
    }

    fetch(url, options)
    // fetch(url)
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
            store.dispatch(youtubeLoginFailure({refresh:true}));
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