let basePath
switch (process.env.NODE_ENV) {
  case 'development':
    basePath = 'http://127.0.0.1:7768'
    break
  case 'production':
  default:
    basePath = 'https://www.superview.tv'
    break
}

export const config = {
  clientId: '218826255982-p6m6p61p3ipjamllh36aqfbogrug7lqh.apps.googleusercontent.com',
  oauthRequestUri: 'https://accounts.google.com/',
  // oauthRedirectUri: 'http://127.0.0.1:7768',
  oauthRedirectUri: 'https://www.superview.tv',
  youtubeRequestUri: 'https://www.googleapis.com/youtube/v3/',
  plusRequestUri: 'https://www.googleapis.com/plus/v1/',
  apiRequestUri: 'https://www.googleapis.com/youtube/v3/',
  basePath: basePath
}

export default config