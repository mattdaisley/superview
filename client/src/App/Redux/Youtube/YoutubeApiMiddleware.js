import * as types from '../Types';

import { getYoutubeChannelDetails } from './YoutubeActionCreators'

import { hasToken, getToken } from '../../Util/tokenYoutube';

const youtubeApiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'youtubeApi') {
    return next(action);
  }

  if ( !hasToken ) return next(action);

  const { url } = action.meta;
  const headers = {
    'Authorization': 'Bearer ' + getToken()
  }

  switch (action.type) {
    case types.GET_YOUTUBE_CHANNEL:
      fetch(url, {headers: headers})
        .then(resp => resp.json())
        .then(json => {
          console.log(url, json);
          let actionItem = { payload: [{status:'error'}] }
          if ( !json.error && json.pageInfo.totalResults > 0) {

            const formattedVideos = formatVideos(json.items);

            actionItem = { payload: formattedVideos }
            store.dispatch(getYoutubeChannelDetails(formattedVideos));
          }
          
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
      break
    case types.GET_YOUTUBE_CHANNEL_DETAILS:

      let promises = action.meta.videos.map( video => {
        // console.log(channel);
        return new Promise( (resolve, reject) => {
          fetch(url + video.channel_id, {headers: headers})
            .then(resp => resp.json())
            .then(json => {
              const formattedChannelDetails = formatChannelDetails(json.items[0]);
              console.log(url + video.channel_id, json, formattedChannelDetails);

              resolve(formattedChannelDetails)
            })
            .catch(err => {
              console.log(err);
              reject(err);
            })
        })
      })

      Promise.all( promises )
        .then( channels => {
          let newAction = Object.assign({}, action, {
            payload: channels
          });
          delete newAction.meta;
          store.dispatch(newAction);
        })
      
      break
    default:
      break
  }

}

const formatVideos = ( videos ) => {

  return [...videos].map( video => {
    return {
      id: video.id,
      channel_id: video.snippet.channelId,
      title: video.snippet.title,
      description: video.snippet.description,
      published_at: video.snippet.publishedAt,
      thumbnail: video.snippet.thumbnails.maxres.url,
      stats: {
        views: video.statistics.viewCount,
        likes: video.statistics.likeCount,
        dislikes: video.statistics.dislikeCount,
        comments: video.statistics.commentCount
      }
    }
  })
}

const formatChannelDetails = ( channelDetails ) => {
  return {
    id: channelDetails.id,
    title: channelDetails.snippet.title,
    name: channelDetails.snippet.title,
    logo: channelDetails.snippet.thumbnails.high.url,
    description: channelDetails.snippet.description
  }
}

export default youtubeApiMiddleware