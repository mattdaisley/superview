import * as types from '../Types'

import { getYoutubeChannelDetailsFromVideos, youtubeAddRetry, setYoutubeLoggedIn, setChannelSubscriptions } from './YoutubeActionCreators'

import { setChannels } from '../Player/ChannelsList/ChannelsListActionCreators'

import { getToken } from '../../Util/tokenYoutube'

import { doYoutubeRequest } from './YoutubeApi'

import { doYoutubePassThrough } from '../SuperViewApi/SuperViewApiRequest'

const youtubeApiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'youtubeApi') {
    return next(action);
  }

  const isLoggedIn = store.getState().youtubeOauth.loggedIn

  const { url } = action.meta

  switch (action.type) {
    case types.GET_GOOGLE_PROFILE:
      doYoutubeRequest(store, url)
        .then(json => {
          let actionItem = { payload: {} }
          // console.log(json);
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
      fetchChannelDetails(store, isLoggedIn, url)
        .then(json => {
          let actionItem = { payload: [{status:'error'}] }
          if ( !json.error && json.pageInfo.totalResults > 0) {
            const formattedChannelDetails = formatChannelDetails(json.items[0]);
            actionItem = { payload: formattedChannelDetails.channel }
          }
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
        .catch( err => handleApiError(err, store, action) )
      break;
    case types.GET_YOUTUBE_PLAYLIST_ITEMS:
      
      break
    case types.GET_YOUTUBE_VIDEOS:
      fetchVideos( store, isLoggedIn, url )
        .then(json => {
          let actionItem = { payload: [{status:'error'}] }
          if ( !json.error && json.pageInfo.totalResults > 0) {
            const formattedVideos = formatVideos(json.items);
            actionItem = { payload: formattedVideos }
            store.dispatch(getYoutubeChannelDetailsFromVideos(formattedVideos));
          }
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
        .catch( err => handleApiError(err, store, action) )
      break
    case types.GET_YOUTUBE_CHANNEL_DETAILS_FROM_VIDEOS:
      const { videos } = action.meta

      let promises = videos.map( video => {
        return new Promise( (resolve, reject) => {
          fetchChannelDetails(store, isLoggedIn, url + video.channel.channel_id)
            .then(json => {
              const formattedChannelDetails = formatChannelDetails(json.items[0], video);
              resolve(formattedChannelDetails)
            })
            .catch( err => handleApiError(err, store, action) )
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
      fetchResults(store, isLoggedIn, url)
        .then(json => {
          let actionItem = { payload: [] }
          if ( json.pageInfo.totalResults > 0 ) {
            const results = formatSearchResult(json.items);
            if ( results.length > 0) actionItem = { payload: results }
          }
          
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
        .catch( err => handleApiError(err, store, action) )
      break
    case types.YOUTUBE_CHANNEL_SEARCH:
      fetchResults(store, isLoggedIn, url)
        .then(json => {
          let actionItem = { payload: [] }
          if ( json.pageInfo.totalResults > 0 ) {
            const results = formatChannelSearchResult(json.items);
            if ( results.length > 0) actionItem = { payload: results }
          }
          
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
        .catch( err => handleApiError(err, store, action) )
        break

    case types.GET_CHANNEL_SUBSCRIPTIONS:
      fetchResults(store, isLoggedIn, url)
        .then(json => {
          if ( json.pageInfo.totalResults > 0 ) {
            const results = formatSubscriptionResults(json.items);
            store.dispatch(setChannelSubscriptions(results));
          }
          
        })
        .catch( err => handleApiError(err, store, action) )
      break
    case types.YOUTUBE_SUBSCRIBE:
      const postChannelSubscription = ( url ) => {
        if ( !!getToken() ) {
          if ( !!isLoggedIn ) {
            return doYoutubeRequest(store, url, {method: 'POST', headers: { 'content-type': 'application/json; charset=UTF-8' }, body: action.meta.body})
          } else if ( getToken() !== null ) {
            return Promise.reject({retry:true})
          }
        } else {
          return Promise.reject({retry:false})
        }
      }
      
      postChannelSubscription(url)
        .then(json => {
          const results = formatSubscriptionResults([json]);
          const oldSubscriptions = store.getState().youtubeBrowse.youtubeChannelSubscriptions;
          store.dispatch(setChannelSubscriptions([ ...oldSubscriptions, ...results ]));
        })
        .catch( err => handleApiError(err, store, action) )
      break
    case types.YOUTUBE_UNSUBSCRIBE:
      const deleteChannelSubscription = ( url ) => {
        if ( !!getToken() ) {
          if ( !!isLoggedIn ) {
            return doYoutubeRequest(store, url, {method: 'DELETE'})
          } else if ( getToken() !== null ) {
            return Promise.reject({retry:true})
          }
        } else {
          return Promise.reject({retry:false})
        }
      }
      
      deleteChannelSubscription(url)
        .then(json => {
          // console.log(json)
        })
        .catch( err => handleApiError(err, store, action) )
      break

    case types.SET_VIDEO_RATINGS:
    
      fetchResults(store, isLoggedIn, url)
        .then(json => {
          let actionItem = { payload: [] }
          if ( json.items.length > 0 ) actionItem.payload = json.items

          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
        .catch( err => handleApiError(err, store, action) )
      break
    case types.YOUTUBE_VIDEO_RATE:
      const postVideoRating = ( url ) => {
        if ( !!getToken() ) {
          if ( !!isLoggedIn ) {
            return doYoutubeRequest(store, url, {method: 'POST'})
          } else if ( getToken() !== null ) {
            return Promise.reject({retry:true})
          }
        } else {
          return Promise.reject({retry:false})
        }
      }
      
      postVideoRating(url)
        .then(json => {
          // if ( json.pageInfo.totalResults > 0 ) {
          //   const results = formatSearchResult(json.items);
            
          //   if ( results.length > 0) {
          //     actionItem = { payload: results }
          //   }
          // }
          
          // let newAction = Object.assign({}, action, actionItem);
          // delete newAction.meta;
          // store.dispatch(newAction);
        })
        .catch( err => handleApiError(err, store, action) )
      break
    default:
      break
  }

}


const fetchResults = ( store, isLoggedIn, url ) => {
  if ( !!getToken() ) {
    if ( !!isLoggedIn ) {
      return doYoutubeRequest(store, url)
    } else if ( getToken() !== null ) {
      return Promise.reject({retry:true})
    }
  } else {
    return doYoutubePassThrough(url)
  }
}

const fetchVideos = ( store, isLoggedIn, url ) => {
  if ( !!getToken() ) {
    if ( !!isLoggedIn ) {
      return doYoutubeRequest(store, url)
    } else if ( getToken() !== null ) {
      return Promise.reject({retry:true})
    }
  } else {
    return doYoutubePassThrough(url)
  }
}

const fetchChannelDetails = ( store, isLoggedIn, url ) => {
  if ( !!getToken() ) {
    if ( !!isLoggedIn ) {
      return doYoutubeRequest(store, url)
    } else if ( getToken() !== null ) {
      return Promise.reject({retry:true})
    }
  } else {
    return doYoutubePassThrough(url)
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

const formatSubscriptionResults = ( subscriptions ) => {
  
  return [...subscriptions].map( subscription => {
    return {
      source_type: 'yt',
      id: subscription.id,
      channel_id: subscription.snippet.resourceId.channelId,
    }
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

const formatChannelSearchResult = ( channels ) => {
  return [...channels].map( channel => {
    return {
      source_type: 'yt',
      channel_id: channel.id.channelId || channel.id,
      title: channel.snippet.channelTitle,
      name: channel.snippet.channelTitle,
      logo: channel.snippet.thumbnails.high.url,
      description: channel.snippet.description
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

const formatChannelDetails = ( channelDetails, resource = {} ) => {
  
  let formattedResource = Object.assign( {}, resource );

  formattedResource.channel = {
    source_type: 'yt',
    channel_id: channelDetails.id,
    title: channelDetails.snippet.title,
    name: channelDetails.snippet.title,
    logo: channelDetails.snippet.thumbnails.high.url,
    description: channelDetails.snippet.description,
    uploadsPlaylist: channelDetails.contentDetails.relatedPlaylists.uploads,
    viewCount: channelDetails.statistics.viewCount,
    subscriberCount: channelDetails.statistics.subscriberCount,
    videoCount: channelDetails.statistics.videoCount
  }

  return formattedResource;
}

export default youtubeApiMiddleware