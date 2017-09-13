
import { hasToken, getToken } from '../../Util/tokenYoutube';

export const doYoutubeSearch = (url) => {

  return new Promise( (resolve,reject) => {
    
    if ( hasToken() ) {
      const headers = {
        'Authorization': 'Bearer ' + getToken()
      }
  
      fetch(url, {headers: headers})
        .then(resp => resp.json())
        .then(json => {
          if ( !json.error && json.pageInfo.totalResults > 0) {
  
            const formattedVideos = formatSearchResult(json.items);
            console.log(url, json, formattedVideos);
            
            resolve(formattedVideos)
          } else {
            resolve([])
          }
        })
        .catch(err => reject(err))
    } else {
      reject( { status: 'not authenticated' } )
    }
  }) 
}


const formatSearchResult = ( videos ) => {

  return [...videos].map( video => {
    return {
      source_type: 'yt',
      id: video.id.videoId,
      channel_id: video.snippet.channelId,
      title: video.snippet.title,
      description: video.snippet.description,
      published_at: video.snippet.publishedAt,
      thumbnail: video.snippet.thumbnails.high.url,
    }
  })

}