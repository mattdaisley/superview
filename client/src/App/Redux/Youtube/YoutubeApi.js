
import { hasToken, getToken } from '../../Util/tokenYoutube';

export const doYoutubeSearch = (url) => {

  return new Promise( (resolve,reject) => {
    
    const headers = {
      'Authorization': 'Bearer ' + getToken()
    }

    fetch(url, {headers: headers})
      .then(resp => resp.json())
      .then(json => {
        console.log(url, json);
        if ( !json.error && json.pageInfo.totalResults > 0) {

          const formattedVideos = formatSearchResult(json.items);
          console.log(url, json, formattedVideos);
          
          resolve(formattedVideos)
        } else {
          resolve([])
        }
      })
      .catch(err => reject(err))
  }) 
}


const formatSearchResult = ( videos ) => {

  return [...videos].map( video => {
    return {
      id: video.id.videoId,
      channel_id: video.snippet.channelId,
      title: video.snippet.title,
      description: video.snippet.description,
      published_at: video.snippet.publishedAt,
      thumbnail: video.snippet.thumbnails.high.url,
    }
  })

}