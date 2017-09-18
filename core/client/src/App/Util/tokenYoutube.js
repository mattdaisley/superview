import Cookies from 'universal-cookie';

const cookies = new Cookies();
const TOKEN_KEY = 'google_access_token'
const EXPIRES_AT_KEY = 'youtubeExpiresAt'

export const getExpiresAt = () =>
  window.localStorage.getItem(EXPIRES_AT_KEY) || null

export const hasToken = () => {
  const token = getToken();
  return token !== null;
}

export const getToken = () => {
  // cookies.set(TOKEN_KEY, 'ya29.GlvJBDqCk_J686kHt26V9Snpdbu9HjAFTW3EVhZeNbNqp01IiXFnbkQcMzbX58dmZgcydME5puSs0ncLg7l_JcwRempKuPYQivY3p0Io3FEw6ESwGvUsA3wS4WbR', { path: '/' } )
  // return cookies.get(TOKEN_KEY);
  return cookies.get(TOKEN_KEY) || null;

  // const expires_at = getExpiresAt()
  // if (expires_at === null || expires_at > new Date().getTime()) {
  //   return window.localStorage.getItem(TOKEN_KEY) || null
  // }
  // return null
}

// export const setToken = (token, expiresAt) => {
//   window.localStorage.setItem(TOKEN_KEY, token)
//   if ( expiresAt !== null ) window.localStorage.setItem(EXPIRES_AT_KEY, expiresAt)
// }

export const removeToken = () => {
  cookies.remove(TOKEN_KEY);
  // window.localStorage.removeItem(TOKEN_KEY)
  // window.localStorage.removeItem(EXPIRES_AT_KEY)
}
