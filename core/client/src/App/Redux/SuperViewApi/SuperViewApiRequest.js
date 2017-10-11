import config from './SuperViewConfig';

export const doApiRequest = (store, url) => {

  return new Promise( (resolve,reject) => {

    const options = {};
    fetch(url, options)
      .then(resp => resp.json() )
      .then(json => {
        if ( json ) {
          resolve(json)
        } else {
          reject(json.error)
        }
      })
      .catch(err => { 
        console.log('error:',err); 
        reject(err) }  
      )
        
  }) 
}

export const doYoutubePassThrough = (url) => {
  return new Promise( (resolve,reject) => {
    fetch(config.apiRequestUri + 'youtube/passthrough?url=' + encodeURIComponent(url), {})
      .then( resp => resolve(resp) )
      .catch( err => reject(err) )
  })
}