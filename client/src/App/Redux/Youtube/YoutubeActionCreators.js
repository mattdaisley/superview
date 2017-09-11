import * as types from '../Types';

import config from './YoutubeConfig';

const clientId = config.clientId;
const oauthRequestUri = config.oauthRequestUri;
const apiRequestUri = config.apiRequestUri;

export const getYoutubeLoginStatus = () => ({
  type: types.YOUTUBE_LOGIN_STATUS,
  meta: {
    type: 'youtubeOauth'
  }
})

export const youtubeLogin = ( referrer ) => {
  
  const requestEnpoint = 'o/oauth2/v2/auth'
  const redirectUri = 'http://localhost:3000';
  const responseType = 'token';
  const scope = 'https://www.googleapis.com/auth/youtube.readonly';
  const state = 'youtubeLoggedIn,' + referrer;
  const includeGrantedScopes = true;
  const prompt = 'none';

  return ({
    type: types.YOUTUBE_LOGIN_REQUEST,
    meta: {
      type: 'youtubeOauth',
      payload: {},
      url: oauthRequestUri + requestEnpoint + '?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=' + responseType + '&scope=' + scope + '&include_granted_scopes=' + includeGrantedScopes + '&state=' + state + '&prompt=' + prompt
    }
  })
}

export const youtubeLoginSuccess = ({token, expiresAt, referrer}) => {
  console.log(token, expiresAt, referrer);
  return ({
    
    type: types.YOUTUBE_LOGIN_SUCCESS,
    payload: true,
    meta: {
      type: 'youtubeOauth',
      token,
      expiresAt,
      referrer
    }
  })
}

export const youtubeLogout = () => ({
  type: types.YOUTUBE_LOGOUT,
  payload: false,
  meta: { type: 'youtubeOauth' }
})




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
      url: apiRequestUri + requestEnpoint + '?id=' + videos + '&part=' + part
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
      url: apiRequestUri + requestEnpoint + '?part=' + part + '&id=',
      videos: videos,
    }
  })
}

export const resetYoutubeChannelDetails = () => {
  return ({
    type: types.RESET_YOUTUBE_CHANNEL_DETAILS
  })
}