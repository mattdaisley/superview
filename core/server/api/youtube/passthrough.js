// # Users API
// RESTful API for the User resource
const 
  docName         = 'passthrough',
  config          = require('../../config'),
  models          = require('../../models'),
  errors          = require('../../errors'),
  utils           = require('../../utils'),
  request         = require('request-promise-native')

let 
  passthrough;

/**
* ### Users API Methods
*
* **See:** [API Methods](index.js.html#api%20methods)
*/

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  '218826255982-a228pql1h0cjcdve6mal0on2ipveu99u.apps.googleusercontent.com',
  'pPSHDRlWMsciRzJGpQu4VZ-h',
  config.appUrl + '/oauth2/google/oauth2callback'
);

passthrough = function passthrough(options) {
  
  return new Promise( (resolve, reject) => {
    const validEndpoints = ['videos', 'channels', 'search']
    const baseUri = 'https://www.googleapis.com/youtube/v3/'

    const url = options.query.url;
    if ( !url ) { reject(new errors.BadRequestError('No passthrough url provided')); return }
    if ( url.indexOf(baseUri) !== 0 ) { reject(new errors.BadRequestError('Invalid YouTube request url')); return }

    const endpoint = url.slice(baseUri.length, url.indexOf('?'))
    if ( validEndpoints.indexOf(endpoint) < 0 ) { reject(new errors.BadRequestError('Invalid YouTube endpoint')); return }
    
    const getGlobalAccessToken = () => {
      return models.auth_google.findOneByUserId('115816396981976284647')
    }

    const refreshToken = (encrypted_token) => {
      return new Promise( (resolve, reject) => {
        request(config.authAppUrl + '/oauth2/google/refresh?token=' + encrypted_token)
          .then(response => resolve(response) )
          .catch(err => reject(err))
      })

    }

    const doPassthroughRequest = ( url, encrypted_token ) => {
      return new Promise( (resolve, reject) => {

        const token = JSON.parse(utils.decrypt(encrypted_token))

        let options = {
          url,
          headers: { 'Authorization': 'Bearer ' + token.access_token }
        };

        request(options)
          .then(response => resolve(response))
          .catch( err => {
            if ( err.statusCode !== 401 ) {
              reject(err)
              return
            }
            
            refreshToken(encrypted_token)
              .then(new_encrypted_token => {
                const new_token = JSON.parse(utils.decrypt(new_encrypted_token))
                options.headers = { 'Authorization': 'Bearer ' + new_token.access_token }
                return request(options)
              })
              .then(response => resolve(response))
              .catch( err => reject(err) )
          })
      })
    }

    getGlobalAccessToken()
      .then( auth_token => {
        return doPassthroughRequest( url, auth_token.token )
      })
      .then( response => resolve( JSON.parse(response) ) )
      .catch( err => reject(err) )
  });
};

module.exports = passthrough;
