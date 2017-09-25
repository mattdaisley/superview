let apiRequestUri;

switch (process.env.NODE_ENV) {
  case 'development':
    // apiRequestUri = 'http://127.0.0.1:7768/api/v0.1/';
    apiRequestUri = 'https://www.superview.tv/api/v0.1/';
    break;
  case 'production':
    // apiRequestUri = 'http://127.0.0.1:7768/api/v0.1/';
    apiRequestUri = 'https://www.superview.tv/api/v0.1/';
    break;
  default:
    break;
}

export const config = {
  apiRequestUri: apiRequestUri,
}

export default config