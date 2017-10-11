
import { config } from './YoutubeConfig'
import { getToken } from '../../Util/tokenYoutube'
import { youtubeLoginFailure } from './YoutubeActionCreators'

export const doYoutubeRequest = (store, url) => {

  return new Promise( (resolve,reject) => {
    
    let options = {};
    if ( getToken() !== null ) {
      options.headers = {
        'Authorization': 'Bearer ' + getToken()
      }
    } else {
      url += '&key=' + config.clientId
    }

    fetch(url, options)
    // fetch(url)
      .then(resp => resp.json())
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