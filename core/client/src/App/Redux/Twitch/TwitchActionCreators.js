import * as types from '../Types';

import config from './TwitchConfig';

const clientId = config.clientId;
const requestUri = config.requestUri;
const redirectUri = config.redirectUri;


export const getTwitchLoginStatus = () => ({
  type: types.TWITCH_AUTH_STATUS,
  meta: {
    type: 'twitchOauth'
  }
})

export const setTwitchLoggedIn = ( status ) => {
  return ({
    type: types.TWITCH_SET_ISLOGGEDIN,
    payload: status
  })
}

export const twitchLogin = ( referrer ) => {
  
  const requestEnpoint = 'oauth2/authorize'
  const responseType = 'token';
  const scope = 'user_read';
  const state = 'twitchLoggedIn,' + referrer;

  return ({
    type: types.TWITCH_AUTH_REQUEST,
    meta: {
      type: 'twitchOauth',
      payload: {},
      url: requestUri + requestEnpoint + '?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=' + responseType + '&scope=' + scope + '&state=' + state
    }
  })
}

export const twitchLoginRefresh = ( {access_token, refresh_token} ) => {
  return ({
    type: types.TWITCH_AUTH_REFRESH,
    meta: {
      type: 'twitchOauth',
      payload: {},
      access_token,
      refresh_token
    }
  })
}

export const setTwitchLogginRequested = ( logginRequested ) => {
  return ({
    type: types.TWITCH_AUTH_REQUESTED,
    meta: {
      type: 'twitchOauth',
      payload: logginRequested
    }
  })
}

export const twitchLoginSuccess = ({token, refresh, expiresAt, referrer}) => {
  return ({
    
    type: types.TWITCH_AUTH_SUCCESS,
    payload: true,
    meta: {
      type: 'twitchOauth',
      token,
      refresh,
      expiresAt,
      referrer
    }
  })
}

export const twitchLoginFailure = ({refresh}) => {
  // console.log('in TwitchActionCreators twitchLoginFailure');
  return ({
    type: types.TWITCH_AUTH_FAILURE,
    payload: false,
    meta: {
      type: 'twitchOauth',
      refresh: refresh || false
    }
  })
}

export const twitchLogout = () => ({
  type: types.TWITCH_LOGOUT,
  payload: false,
  meta: { type: 'twitchOauth' }
})

export const getTwitchProfile = () => {
  const requestEnpoint = 'user'

  return ({
    type: types.GET_TWITCH_PROFILE,
    meta: {
      type: 'twitchApi',
      clientId: clientId,
      url: requestUri + requestEnpoint
    }
  })
}

export const resetTwitchProfile = () => {
  return ({
    type: types.RESET_TWITCH_PROFILE,
  })
}

export const getTwitchChannel = (users) => {
  
  const requestEnpoint = 'users'

  users = (users.constructor === Array) ? users.join(',') : users;
  
  return ({
    type: types.GET_TWITCH_CHANNEL,
    meta: {
      type: 'twitchApi',
      payload: {},
      clientId: clientId,
      url: requestUri + requestEnpoint + '?login=' + users
    }
  })
}

export const resetTwitchChannel = () => {
  return ({
    type: types.RESET_TWITCH_CHANNEL
  })
}

export const resetTwitchChannelDetails = () => {
  return ({
    type: types.RESET_TWITCH_CHANNEL_DETAILS
  })
}

export const getTwitchChannelDetails = (channels) => {
  
  const requestEnpoint = 'channels'

  return ({
    type: types.GET_TWITCH_CHANNEL_DETAILS,
    meta: {
      type: 'twitchApi',
      clientId: clientId,
      url: requestUri + requestEnpoint + '/',
      channels: channels,
    }
  })
}

export const getTwitchFollowing = () => {
   const requestEnpoint = 'streams/followed'

   return ({
     type: types.GET_TWITCH_FOLLOWING,
     meta: {
       type: 'twitchApi',
       clientId: clientId,
       url: requestUri + requestEnpoint
     }
   })
}

export const getTwitchFeatured = () => {
   const requestEnpoint = 'streams/featured?limit=25'

   return ({
     type: types.GET_TWITCH_FEATURED,
     meta: {
       type: 'twitchApi',
       clientId: clientId,
       url: requestUri + requestEnpoint
     }
   })
}

export const twitchSearch = ( query ) => {
  const requestEnpoint = 'search/streams?query='
  // const limit = 10;

  return ({
    type: types.TWITCH_SEARCH,
    meta: {
      type: 'twitchApi',
      clientId: clientId,
      // url: requestUri + requestEnpoint + encodeURIComponent(query) + '&limit=' + limit
      url: requestUri + requestEnpoint + encodeURIComponent(query)
    }
  })
}

export const resetTwitchSearch = () => {
  return ({
    type: types.RESET_TWITCH_SEARCH
  })
}