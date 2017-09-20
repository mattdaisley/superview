var api         = require('./api');
var oauth2      = require('./oauth2');
var config		= require('../config');

module.exports = {
    api: api,
    oauth2: oauth2,
    apiBaseUri: config.apiBaseUri
};
