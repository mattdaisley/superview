import * as types from '../Types';

import { getYoutubeChannelDetails, youtubeAddRetry, setYoutubeLoggedIn } from './YoutubeActionCreators'

import { setChannels } from '../ChannelsList/ChannelsListActionCreators'

import { getToken } from '../../Util/tokenYoutube';

import { doYoutubeRequest } from './YoutubeApi';

const youtubeApiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'youtubeApi') {
    return next(action);
  }

  const isLoggedIn = store.getState().youtubeOauth.loggedIn;

  const { url } = action.meta;
  const headers = {
    'Authorization': 'Bearer ' + getToken()
  }

  switch (action.type) {
    case types.GET_GOOGLE_PROFILE:
      doYoutubeRequest(store, url)
        .then(json => {
          let actionItem = { payload: {} }
          console.log(json);
          if ( !json.error ) {
            if ( json.id ) {
              
              const googleProfile = json
              actionItem = { payload: googleProfile }
            }
            store.dispatch(setYoutubeLoggedIn(true));
          }
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
        .catch( err => {
          handleApiError(err, store, action) 
          let actionItem = { payload: {} }
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
      break;
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
        .catch( err => console.log('error:',err))
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
          store.dispatch(setChannels(channels))
        })
      break
    case types.YOUTUBE_SEARCH:
    case types.YOUTUBE_POPULAR:
    case types.YOUTUBE_RECENT:
      let actionItem = { payload: [] }
      if ( !!isLoggedIn ) {
        doYoutubeRequest(store, url)
          .then(json => {
            if ( json.pageInfo.totalResults > 0 ) {
              const results = formatSearchResult(json.items.slice(0, 7));
              
              if ( results.length > 0) {
                actionItem = { payload: results }
              }
            }
            
            let newAction = Object.assign({}, action, actionItem);
            delete newAction.meta;
            store.dispatch(newAction);
          })
          .catch( err => handleApiError(err, store, action) )
      } else {
        handleApiError({retry:true}, store, action)
      }
      break

    default:
      break
  }

}

const handleApiError = ( err, store, action ) => {
  if ( !!err.retry ) {
    const retryOptions = {
      functionToRetry: () => store.dispatch(action),
      expires: Date.now() + 10000
    }
    store.dispatch( youtubeAddRetry(retryOptions) )
  }
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

const formatVideos = ( videos ) => {
  return [...videos].map( video => {
    return {
      source_type: 'yt',
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      published_at: video.snippet.publishedAt,
      thumbnail: ( video.snippet.thumbnails.medium ) ? video.snippet.thumbnails.medium.url : video.snippet.thumbnails.default.url,
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