import Cookies from 'universal-cookie';

const cookies = new Cookies();
const TOKEN_KEY = 'twitch_access_token'
const REFRESH_KEY = 'twitch_refresh_token'
const EXPIRES_AT_KEY = 'twitch_expires_at'

export const getExpiresAt = () =>
  window.localStorage.getItem(EXPIRES_AT_KEY) || null

export const hasToken = () => {
  const token = getToken();
  return token !== null;
}

export const getToken = () => {
  // cookies.set(TOKEN_KEY, 'knpv3nfzmp3uwkdc8c4berkcum1x7p', { path: '/' } )
  // return cookies.get(TOKEN_KEY);
  
  // return cookies.get(TOKEN_KEY) || null;

  const expires_at = getExpiresAt()
  if (expires_at === null || expires_at > new Date().getTime()) {
    return window.localStorage.getItem(TOKEN_KEY) || null
  }
  return null
}

export const setToken = (token, expiresAt) => {
  window.localStorage.setItem(TOKEN_KEY, token)
  if ( expiresAt !== null ) window.localStorage.setItem(EXPIRES_AT_KEY, expiresAt)
}

export const setRefresh = (refresh) => {
  window.localStorage.setItem(REFRESH_KEY, refresh)
}

export const removeToken = () => {
  console.log('in remove token');
  cookies.remove(TOKEN_KEY);
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_KEY)
  window.localStorage.removeItem(EXPIRES_AT_KEY)
}
