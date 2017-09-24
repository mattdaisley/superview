// # Users API
// RESTful API for the User resource
var 
    docName         = 'subscriptions',
    DB              = require('../../db'),
    config          = require('../../config'),
    errors          = require('../../errors'),
    utils           = require('../../utils'),
    knex            = require('knex')({client: 'mysql'}),
    subscriptions;
    
/**
 * ### Users API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
subscriptions = {

    list: function list(google_user_id) {
        return new Promise( (resolve, reject) => {
            DB.connect( connection => {

                var query = knex(config.db.tablePrefix + 'google_subscriptions_uploads')
                    .join(config.db.tablePrefix + 'google_users_subscriptions', config.db.tablePrefix + 'google_subscriptions_uploads.google_channel_id', config.db.tablePrefix + 'google_users_subscriptions.google_channel_id')
                    .select(config.db.tablePrefix + 'google_subscriptions_uploads.google_video_id')
                    .where(config.db.tablePrefix + 'google_users_subscriptions.google_user_id', google_user_id)
                    .orderBy(config.db.tablePrefix + 'google_subscriptions_uploads.published_at', 'desc')
                    .limit(20)

                connection.query( query.toString(), (err, subscriptions) => {
                    connection.release();
                    if ( err ) { reject(err); return; }

                    resolve(subscriptions);
                });

            });
        });
        
    },

};

// make sure all methods can be called by eachother
[
    'list',
].forEach( funcName => {
    subscriptions[funcName] = subscriptions[funcName].bind(subscriptions);
});

module.exports = subscriptions;
