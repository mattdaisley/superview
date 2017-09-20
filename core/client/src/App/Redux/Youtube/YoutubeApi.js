
import { getToken } from '../../Util/tokenYoutube';
import { youtubeLoginFailure } from './YoutubeActionCreators'

export const doYoutubeRequest = (store, url) => {

  return new Promise( (resolve,reject) => {
    
    const headers = {
      'Authorization': 'Bearer ' + getToken()
    }

    fetch(url, {headers: headers})
    // fetch(url)
      .then(resp => resp.json())
      .then(json => {
        if ( !json.error && json.pageInfo.totalResults > 0) {

          const formattedVideos = formatSearchResult(json.items);
          // console.log(url, json, formattedVideos);
          
          resolve(formattedVideos)
        } else {
          if ( json.error.code === 401 ) {
            console.log(json.error);
            store.dispatch(youtubeLoginFailure({refresh:true}));
            resolve([])
          } else {
            reject(json.error)
          }
        }
      })
      .catch(err => { 
        console.log('error:',err); 
        reject(err) }  
      )
        
  }) 
}


const formatSearchResult = ( videos ) => {

  return [...videos].map( video => {
    return {
      source_type: 'yt',
      id: video.id.videoId || video.id,
      channel_id: video.snippet.channelId,
      title: video.snippet.title,
      description: video.snippet.description,
      published_at: video.snippet.publishedAt,
      thumbnail: ( video.snippet.thumbnails.medium ) ? video.snippet.thumbnails.medium.url : video.snippet.thumbnails.default.url,
      channel: {
        name: ( video.snippet.channelTitle ) ? video.snippet.channelTitle : null
      }
    }
  })

}