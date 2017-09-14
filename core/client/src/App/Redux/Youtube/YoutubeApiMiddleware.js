import * as types from '../Types';

import { getYoutubeChannelDetails } from './YoutubeActionCreators'

import { hasToken, getToken } from '../../Util/tokenYoutube';

import { doYoutubeSearch } from './YoutubeApi';

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
          let actionItem = { payload: [{status:'error'}] }
          if ( !json.error && json.pageInfo.totalResults > 0) {

            const formattedVideos = formatVideos(json.items);
            // console.log(url, formattedVideos);

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
          fetch(url + video.channel.channel_id, {headers: headers})
            .then(resp => resp.json())
            .then(json => {
              const formattedChannelDetails = formatChannelDetails(json.items[0], video);
              // console.log(url + video.channel.channel_id, json, formattedChannelDetails);

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
    case types.YOUTUBE_SEARCH:
      doYoutubeSearch(url)
        .then(results => {
          // console.log(url, results);
          let actionItem = { payload: [] }
          if ( results.length > 0) {

            actionItem = { payload: results }
          }
          
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
        .catch( error => console.log(error) )
      break
        
    default:
      break
  }

}

const formatVideos = ( videos ) => {

  return [...videos].map( video => {
    return {
      source_type: 'yt',
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      published_at: video.snippet.publishedAt,
      thumbnail: video.snippet.thumbnails.maxres.url,
      stats: {
        views: video.statistics.viewCount,
        likes: video.statistics.likeCount,
        dislikes: video.statistics.dislikeCount,
        comments: video.statistics.commentCount,
      },
      channel: {
        channel_id: video.snippet.channelId,
      }
    }
  })
}

const formatChannelDetails = ( channelDetails, resource ) => {
  
  let formattedResource = Object.assign( {}, resource );

  formattedResource.channel = {
    source_type: 'yt',
    channel_id: channelDetails.id,
    title: channelDetails.snippet.title,
    name: channelDetails.snippet.title,
    logo: channelDetails.snippet.thumbnails.high.url,
    description: channelDetails.snippet.description
  }

  return formattedResource;
}

export default youtubeApiMiddleware