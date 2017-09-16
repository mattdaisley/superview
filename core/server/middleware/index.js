var bodyParser      = require('body-parser'),
    express         = require('express'),
    path            = require('path'),
    cors            = require('cors'),
    config 			= require('../config'),
    routes          = require('../routes'),
    errors 			= require('../errors'),
    auth            = require('./auth'),
    checkSSL        = require('./check-ssl'),
    utils           = require('../utils'),

    middleware,
    setupMiddleware;

setupMiddleware = function setupMiddleware(app) {
    middleware = {
        auth: auth,
        api: {
            // forceApiSubdomain: 
            errorHandler: errors.handleAPIError,
            requiresAdminUser: auth.requiresAdminUser
        }
    };
	
	app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    
    console.log('middleware');
    
    app.use((req, res, next) => { console.log(req.url); next()})

    console.log(config.corePath + '/client/build/');
    console.log(path.join(config.corePath, 'client', 'build', 'index.html'));
    // console.log(path.join(__dirname, 'build', 'index.html'));

    // app.use(express.static(config.corePath))
    // app.use(express.static(config.corePath + '/client/build/');

    // app.use('/', express.static(config.corePath + '/client/build/'));
    app.use(express.static(path.join(config.corePath, 'client', 'build')));

    app.use('/oauth2/google/', function( req, res, next ) {
        if ( req.query.token ) {
            const token = JSON.parse(utils.decrypt(req.query.token));
            res.cookie('google_access_token', token.access_token, { maxAge: token.expiry_date, httpOnly: true });
            if ( token.refresh_token ) {
                res.cookie('google_refresh_token', token.refresh_token, { maxAge: token.expiry_date, httpOnly: true });
            }
            res.redirect('/index.html');
        }
    })

    app.get('/*', function (req, res) {
        res.sendFile(path.join(config.corePath, 'client', 'build', 'index.html'));
    });

    app.use(cors());
    
    // app.enable('trust proxy');
    // app.use(checkSSL);


    // ### Routing
    // Set up API routes
    app.use(routes.apiBaseUri, routes.api(middleware));

    // catch 404 and forward to error handler
	app.use(errors.error404);
};

module.exports = setupMiddleware;