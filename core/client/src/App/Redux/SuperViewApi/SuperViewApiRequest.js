
export const doApiRequest = (store, url) => {

  return new Promise( (resolve,reject) => {
    
    // const headers = {
    //   'Authorization': 'Bearer ' + getToken()
    // }
    const headers = {};

    fetch(url, {headers: headers})
    // fetch(url)
      .then(resp => resp.json() )
      .then(json => {
        console.log(json)
        if ( json.subscriptions.length > 0) {
          console.log(json.subscriptions)
          resolve(json.subscriptions)
        } else {
          // if ( json.error.code === 401 ) {
          //   // console.log(json.error);
          //   // store.dispatch(youtubeLoginFailure({refresh:true}));
          // }
          reject(json.error)
        }
      })
      .catch(err => { 
        console.log('error:',err); 
        reject(err) }  
      )
        
  }) 
}