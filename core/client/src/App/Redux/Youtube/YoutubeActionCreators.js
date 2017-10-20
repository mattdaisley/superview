import * as types from '../Types';

import config from './YoutubeConfig';

const clientId = config.clientId;
const oauthRequestUri = config.oauthRequestUri;
const youtubeRequestUri = config.youtubeRequestUri;
const plusRequestUri = config.plusRequestUri;
const oauthRedirectUri = config.oauthRedirectUri;

export const getYoutubeLoginStatus = () => ({
  type: types.YOUTUBE_LOGIN_STATUS,
  meta: {
    type: 'youtubeOauth'
  }
})

export const setYoutubeLoggedIn = ( status ) =>  {
  return ({
    type: types.YOUTUBE_SET_ISLOGGEDIN,
    meta: {
      type: 'youtubeOauth',
      status: status
    }
  })
}

export const youtubeLogin = ( referrer ) => {
  
  const requestEnpoint = 'o/oauth2/v2/auth'
  const responseType = 'token';
  // const scope = 'https://www.googleapis.com/auth/youtube.readonly';
  const scope = 'https://www.googleapis.com/auth/youtube.force-ssl';
  const state = 'youtubeLoggedIn,' + referrer;
  const includeGrantedScopes = true;
  const prompt = 'consent';

  return ({
    type: types.YOUTUBE_LOGIN_REQUEST,
    meta: {
      type: 'youtubeOauth',
      payload: {},
      url: oauthRequestUri + requestEnpoint + '?client_id=' + clientId + '&redirect_uri=' + oauthRedirectUri + '&response_type=' + responseType + '&scope=' + scope + '&include_granted_scopes=' + includeGrantedScopes + '&state=' + state + '&prompt=' + prompt
    }
  })
}

export const youtubeLoginRefresh = ( {access_token, refresh_token} ) => {
  return ({
    type: types.YOUTUBE_LOGIN_REFRESH,
    meta: {
      type: 'youtubeOauth',
      payload: {},
      access_token,
      refresh_token
    }
  })
}

export const setYoutubeLogginRequested = ( logginRequested ) => {
  return ({
    type: types.YOUTUBE_LOGIN_REQUESTED,
    meta: {
      type: 'youtubeOauth',
      payload: logginRequested
    }
  })
}

export const youtubeLoginSuccess = ({token, refresh, expiresAt, referrer, google_user_id}) => {
  // console.log(token, refresh, expiresAt, referrer, google_user_id);
  return ({
    
    type: types.YOUTUBE_AUTH_SUCCESS,
    payload: true,
    meta: {
      type: 'youtubeOauth',
      token,
      refresh,
      expiresAt,
      referrer,
      google_user_id,
    }
  })
}

export const youtubeLoginFailure = ({refresh}) => {
  // console.log('in YoutubeActionCreators youtubeLoginFailure');
  return ({
    type: types.YOUTUBE_AUTH_FAILURE,
    payload: false,
    meta: {
      type: 'youtubeOauth',
      refresh: refresh || false
    }
  })
}

export const youtubeLogout = () => ({
  type: types.YOUTUBE_LOGOUT,
  payload: false,
  meta: { type: 'youtubeOauth' }
})

export const youtubeAddRetry = (retryOptions) => ({
  type: types.YOUTUBE_ADD_RETRY,
  payload: {
    retryOptions
  }
})

export const youtubeDoRetry = () => ({
  type: types.YOUTUBE_DO_RETRY,
  meta: {
    type: 'youtubeOauth'
  }
})

export const getGoogleProfile = () => {
  const requestEnpoint = 'people/me'

  return ({
    type: types.GET_GOOGLE_PROFILE,
    meta: {
      type: 'youtubeApi',
      clientId: clientId,
      url: plusRequestUri + requestEnpoint
    }
  })
}

export const resetGoogleProfile = () => {
  return ({
    type: types.RESET_GOOGLE_PROFILE,
  })
}




export const getYoutubeChannel = (videos) => {

  const requestEnpoint = 'videos'
  const part = 'snippet,contentDetails,statistics'

  videos = (videos.constructor === Array) ? videos.join(',') : videos;
  
  return ({
    type: types.GET_YOUTUBE_CHANNEL,
    meta: {
      type: 'youtubeApi',
      payload: {},
      clientId: clientId,
      url: youtubeRequestUri + requestEnpoint + '?id=' + videos + '&part=' + part
    }
  })
}

export const resetYoutubeChannel = () => {
  return ({
    type: types.RESET_YOUTUBE_CHANNEL
  })
}

export const getYoutubeChannelDetails = (videos) => {
  
  const requestEnpoint = 'channels'
  const part = 'snippet,contentDetails,statistics'

  return ({
    type: types.GET_YOUTUBE_CHANNEL_DETAILS,
    meta: {
      type: 'youtubeApi',
      clientId: clientId,
      url: youtubeRequestUri + requestEnpoint + '?part=' + part + '&id=',
      videos: videos,
    }
  })
}

export const resetYoutubeChannelDetails = () => {
  return ({
    type: types.RESET_YOUTUBE_CHANNEL_DETAILS
  })
}

export const youtubeSearch = (query) => {
  
  const requestEnpoint = 'search?q='
  const part = 'snippet'
  const type = 'video'
  const maxResults = 10

  return ({
    type: types.YOUTUBE_SEARCH,
    meta: {
      type: 'youtubeApi',
      clientId: clientId,
      url: youtubeRequestUri + requestEnpoint + encodeURIComponent(query) + '&maxResults=' + maxResults + '&part=' + part + '&type=' + type,
    }
  })
}

export const resetYoutubeSearch = () => {
  return ({
    type: types.RESET_YOUTUBE_SEARCH
  })
}

export const youtubeChannelSearch = (query) => {
  
  const requestEnpoint = 'search?q='
  const part = 'snippet'
  const type = 'channel'
  const maxResults = 1

  return ({
    type: types.YOUTUBE_CHANNEL_SEARCH,
    meta: {
      type: 'youtubeApi',
      clientId: clientId,
      url: youtubeRequestUri + requestEnpoint + encodeURIComponent(query) + '&maxResults=' + maxResults + '&part=' + part + '&type=' + type,
    }
  })
}

export const resetYoutubeChannelSearch = () => {
  return ({
    type: types.RESET_YOUTUBE_CHANNEL_SEARCH
  })
}

export const getYoutubePopular = () => {
  
  const requestEnpoint = 'videos'
  const part = 'snippet'
  const chart = 'mostPopular'
  const maxResults = 20

  return ({
    type: types.YOUTUBE_POPULAR,
    meta: {
      type: 'youtubeApi',
      clientId: clientId,
      url: youtubeRequestUri + requestEnpoint + '?part=' + part + '&chart=' + chart + '&maxResults=' + maxResults,
    }
  })

}

export const getYoutubeRecent = ( videoIds ) => {
  // console.log('getYoutubeRecent videoIds:', videoIds);
  const requestEnpoint = 'videos'
  const part = 'snippet'
  const id = videoIds.join(',')
  const maxResults = 50

  return ({
    type: types.YOUTUBE_RECENT,
    meta: {
      type: 'youtubeApi',
      clientId: clientId,
      url: youtubeRequestUri + requestEnpoint + '?part=' + part + '&id=' + id + '&maxResults=' + maxResults,
    }
  })

}

export const getChannelSubscriptions = ( arrChannelIds ) => {
  const requestEnpoint = 'subscriptions'
  const part = 'snippet,contentDetails'
  const channelIds = arrChannelIds.join(',')

  return ({
    type: types.GET_CHANNEL_SUBSCRIPTIONS,
    meta: {
      type: 'youtubeApi',
      url: youtubeRequestUri + requestEnpoint + '?part='+part+'&forChannelId='+channelIds+'&mine=true'
    }
  })
}

export const setChannelSubscriptions = ( subscriptions ) => {
  return ({
    type: types.SET_CHANNEL_SUBSCRIPTIONS,
    payload: subscriptions
  })
}

export const youtubeSubscribe = ( channelId ) => {
  let requestEnpoint = 'subscriptions'
  const part = 'snippet'
  const body = '{ "snippet": { "resourceId": { "kind": "youtube#channel", "channelId": "' + channelId + '" } } }'
  
  return ({
    type: types.YOUTUBE_SUBSCRIBE,
    meta: {
      type: 'youtubeApi',
      url: youtubeRequestUri + requestEnpoint + '?part=' + part,
      body: body
    }
  })
}

export const youtubeUnsubscribe = ( subscriptionId ) => {
  let requestEnpoint = 'subscriptions'
  
  return ({
    type: types.YOUTUBE_UNSUBSCRIBE,
    meta: {
      type: 'youtubeApi',
      url: youtubeRequestUri + requestEnpoint + '?id=' + subscriptionId
    }
  })
}

export const setVideoRatings = ( videoIds ) => {
  const requestEnpoint = 'videos/getRating'

  return ({
    type: types.SET_VIDEO_RATINGS,
    meta: {
      type: 'youtubeApi',
      url: youtubeRequestUri + requestEnpoint + '?id=' + videoIds.join(','),
    }
  })
}

export const resetVideoRatings = () => {
  return ({
    type: types.RESET_VIDEO_RATINGS
  })
}

export const rateYoutubeVideo = ( videoId, rating ) => {
  const requestEnpoint = 'videos/rate'

  return ({
    type: types.YOUTUBE_VIDEO_RATE,
    meta: {
      type: 'youtubeApi',
      url: youtubeRequestUri + requestEnpoint + '?id=' + videoId + '&rating=' + rating,
    }
  })
}