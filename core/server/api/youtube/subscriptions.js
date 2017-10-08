// # Users API
// RESTful API for the User resource
var 
docName         = 'subscriptions',
config          = require('../../config'),
models          = require('../../models'),
errors          = require('../../errors'),
utils           = require('../../utils'),
subscriptions;

/**
* ### Users API Methods
*
* **See:** [API Methods](index.js.html#api%20methods)
*/

subscriptions = {
  /**
   * ## Browse
   * Fetch all users
   * @param {{context}} options (optional)
   * @returns {Promise<Users>} Users Collection
   */

  list: function list(options) {
      function doQuery(options) {
          return models.youtube.subscriptions.list(options.query);
      }

      return new Promise( (resolve, reject) => {

            if ( !options.query.google_user_id ) { reject(new errors.BadRequestError('No google_user_id provided')); return }
            if ( !options.query.maxResults ) { options.query.maxResults = 20 }

          doQuery(options)
              .then( result => {
                  if ( result ) {
                      // success, a user was found
                      resolve( {subscriptions: result} );
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

module.exports = subscriptions;
