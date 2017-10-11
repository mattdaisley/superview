// # Users API
// RESTful API for the User resource
var 
docName         = 'popular',
config          = require('../../config'),
models          = require('../../models'),
errors          = require('../../errors'),
utils           = require('../../utils'),
popular;

/**
* ### Users API Methods
*
* **See:** [API Methods](index.js.html#api%20methods)
*/

popular = {
  /**
   * ## Browse
   * Fetch all users
   * @param {{context}} options (optional)
   * @returns {Promise<Users>} Users Collection
   */

  list: function list(options) {
      function doQuery(options) {
          return models.youtube.popular.list(options.query);
      }

      return new Promise( (resolve, reject) => {

            if ( !options.query.maxResults ) { options.query.maxResults = 20 }

          doQuery(options)
              .then( result => {
                  if ( result ) {
                      // success, a user was found
                      resolve( {popular: result} );
                  } else {
                      // fail, no user found
                      reject(new errors.NotFoundError('User Not Found'));
                  }

              })
              .catch( err => {
                  // some other error occurred
                  reject(err);
              });
      });
  },

};

module.exports = popular;
