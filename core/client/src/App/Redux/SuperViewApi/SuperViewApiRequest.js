import config from './SuperViewConfig';

export const doApiRequest = (store, url) => {

  return new Promise( (resolve,reject) => {

    const options = {};
    // console.log(url)
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
        // console.log('error:',err); 
        reject(err) }  
      )
        
  }) 
}

export const doYoutubePassThrough = (url) => {
  return new Promise( (resolve,reject) => {
    fetch(config.apiRequestUri + 'youtube/passthrough?url=' + encodeURIComponent(url), {})
      .then( resp => resp.json() )
      .then( json => resolve(json) )
      .catch( err => reject(err) )
    // resolve(
    //   {
    //     "kind":"youtube#videoListResponse",
    //     "etag":"\"cbz3lIQ2N25AfwNr-BdxUVxJ_QY/g2r_LAsqB1Jb2xDhgUI6dqm9T5I\"",
    //     "nextPageToken":"CBQQAA",
    //     "pageInfo":{
    //       "totalResults":200,
    //       "resultsPerPage":20
    //     },
    //     "items":[
    //       {
    //         "kind":"youtube#video",
    //         "etag":"\"cbz3lIQ2N25AfwNr-BdxUVxJ_QY/xZM903FJAi8Kx6QI3Kcgtf8Rl5U\"",
    //         "id":"LunHybOKIjU",
    //         "snippet":{
    //           "publishedAt":"2017-10-11T01:01:20.000Z",
    //           "channelId":"UCcVqCJ_9owb1zM43vqswMNQ",
    //           "title":"Eminem Rips Donald Trump In BET Hip Hop Awards Freestyle Cypher",
    //           "description":"Eminem is back! And he's in classic bar-for-bar form blasting at Donald Trump from his Detroit home. The cyphers went crazy too. Peep.\n\nStill haven’t subscribed to BET on Youtube? ►► http://bit.ly/1U0v9xG\n\nDownload the BET NOW app for full episodes of your favorite BET shows and exclusive content!\n\nConnect with BET \nWeb: http://www.BET.com\nFacebook: http://www.facebook.com/BET\nTwitter: http://www.twitter.com/BET\nInstagram: http://www.instagram.com/BET\nGoogle+: http://www.bet.us/gplusBET",
    //           "thumbnails":{
    //             "default":{"url":"https://i.ytimg.com/vi/LunHybOKIjU/default.jpg","width":120,"height":90},
    //             "medium":{"url":"https://i.ytimg.com/vi/LunHybOKIjU/mqdefault.jpg","width":320,"height":180},
    //             "high":{"url":"https://i.ytimg.com/vi/LunHybOKIjU/hqdefault.jpg","width":480,"height":360},
    //             "standard":{"url":"https://i.ytimg.com/vi/LunHybOKIjU/sddefault.jpg","width":640,"height":480},
    //             "maxres":{"url":"https://i.ytimg.com/vi/LunHybOKIjU/maxresdefault.jpg","width":1280,"height":720}
    //           },
    //           "channelTitle":"BETNetworks",
    //           "tags":["BET","BET Networks","BET Music","Black Entertainment Television","eminem","freestyle","full","hip hop awards","hip hop awards 2017","bet hip hop awards","donald trump","potus","full freestyle","EMINEM TRUMP","TRUMP TWITTER","trump tweet","trump nfl","eminem bet cypher","bet cypher","eminem freestyle","8 mile","eminem new album","trump diss","eminem trump diss"],
    //           "categoryId":"24",
    //           "liveBroadcastContent":"none",
    //           "localized":{
    //             "title":"Eminem Rips Donald Trump In BET Hip Hop Awards Freestyle Cypher",
    //             "description":"Eminem is back! And he's in classic bar-for-bar form blasting at Donald Trump from his Detroit home. The cyphers went crazy too. Peep.\n\nStill haven’t subscribed to BET on Youtube? ►► http://bit.ly/1U0v9xG\n\nDownload the BET NOW app for full episodes of your favorite BET shows and exclusive content!\n\nConnect with BET \nWeb: http://www.BET.com\nFacebook: http://www.facebook.com/BET\nTwitter: http://www.twitter.com/BET\nInstagram: http://www.instagram.com/BET\nGoogle+: http://www.bet.us/gplusBET"
    //           },
    //           "defaultAudioLanguage":"en"
    //         }
    //       }
    //     ]
    //   }
    // )             
  })
}