const TOKEN_KEY = 'tokenTwitch'
const EXPIRES_AT_KEY = 'twitchExpiresAt'

export const getExpiresAt = () =>
  window.localStorage.getItem(EXPIRES_AT_KEY) || null

export const hasToken = () => {
  const token = getToken();
  return token !== null;
}

export const getToken = () => {
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

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(EXPIRES_AT_KEY)
}
