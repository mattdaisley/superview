// # Users API
// RESTful API for the User resource
var 
    docName         = 'auth_google',
    DB              = require('../db'),
    config          = require('../config'),
    errors          = require('../errors'),
    utils           = require('../utils'),
    knex            = require('knex')({client: 'mysql'}),
    auth_google;
    
/**
 * ### Users API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
auth_google = {

    findOneByAuthToken: function findOneByAuthToken(auth_token) {
        return new Promise( (resolve, reject) => {
            DB.connect( connection => {
                var query = knex(config.db.tablePrefix + 'auth_google')
                    .select()
                    .where('auth_token', auth_token)
                    .limit(1);

                connection.query( query.toString(), (err, tokens) => {
                    connection.release();
                    if ( err ) { reject(err); return; }

                    resolve(tokens[0]);
                });

            });
        });
        
    },

    addOne: function addOne(object) {
        var self = this;

        return new Promise( (resolve, reject) => {
            DB.connect( connection => {
                console.log('object:', object, object.access_token, object.expirey_date, object.refresh_token);

                connection.query( 'INSERT INTO ' + config.db.tablePrefix + 'auth_google (access_token, refresh_token, expirey_date) VALUES (?,?,?)', [object.access_token, object.refresh_token, object.expirey_date], (err, tokens) => {
                    connection.release();
                    console.log(err);
                    if ( err ) { reject(err); return; }

                    resolve(tokens[0]);
                });
            });
        });
        
    },

};

// make sure all methods can be called by eachother
[
    'findOneByAuthToken',
    'addOne',
].forEach( funcName => {
    auth_google[funcName] = auth_google[funcName].bind(auth_google);
});

module.exports = auth_google;
