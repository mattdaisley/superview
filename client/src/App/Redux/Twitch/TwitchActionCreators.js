import * as types from '../Types';

import config from './TwitchConfig';

const clientId = config.clientId;
const requestUri = config.requestUri;

export const getTwitchLoginStatus = () => ({
  type: types.TWITCH_LOGIN_STATUS,
  meta: {
    type: 'twitchOauth'
  }
})

export const twitchLogin = ( referrer ) => {
  
  const requestEnpoint = 'oauth2/authorize'
  const redirectUri = 'http://localhost:3000';
  const responseType = 'token';
  const scope = 'user_read';
  const state = 'twitchLoggedIn,' + referrer;

  return ({
    type: types.TWITCH_LOGIN_REQUEST,
    meta: {
      type: 'twitchOauth',
      payload: {},
      url: requestUri + requestEnpoint + '?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=' + responseType + '&scope=' + scope + '&state=' + state
    }
  })
}

export const twitchLoginSuccess = ({token, expiresAt, referrer}) => {
  return ({
    
    type: types.TWITCH_LOGIN_SUCCESS,
    payload: true,
    meta: {
      type: 'twitchOauth',
      token,
      expiresAt,
      referrer
    }
  })
}

export const twitchLogout = () => ({
  type: types.TWITCH_LOGOUT,
  payload: false,
  meta: { type: 'twitchOauth' }
})

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

export const twitchSearch = ( query ) => {
   const requestEnpoint = 'search/streams?query='
   const limit = 3;

   return ({
     type: types.TWITCH_SEARCH,
     meta: {
       type: 'twitchApi',
       clientId: clientId,
       url: requestUri + requestEnpoint + encodeURIComponent(query) + '&limit=' + limit
     }
   })
}

export const resetTwitchSearch = () => {
  return ({
    type: types.RESET_WITCH_SEARCH
  })
}