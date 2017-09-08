import * as types from '../Types';

const clientId = '0ajwj4yx39smt1qtzfhrgjihvuo1wr';
const requestUri = 'https://api.twitch.tv/kraken/';

export const getLoginStatus = () => ({
  type: types.LOGIN_STATUS,
  meta: {
    type: 'twitchOauth'
  }
})

export const twitchLogin = () => {
  
  const requestEnpoint = 'oauth2/authorize'
  const redirectUri = 'http://localhost:3000';
  const responseType = 'token';
  const scope = 'user_read';

  return ({
    type: types.LOGIN_REQUEST,
    meta: {
      type: 'twitchOauth',
      payload: {},
      url: requestUri + requestEnpoint + '?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=' + responseType + '&scope=' + scope
    }
  })
}

export const twitchLoginSuccess = ({token, expiresAt}) => {
  return ({
    
    type: types.LOGIN_SUCCESS,
    payload: true,
    meta: {
      type: 'twitchOauth',
      token,
      expiresAt
    }
  })
}

export const twitchLogout = () => ({
  type: types.LOGOUT,
  payload: false,
  meta: { type: 'twitchOauth' }
})