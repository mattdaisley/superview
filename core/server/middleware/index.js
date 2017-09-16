var bodyParser      = require('body-parser'),
    express         = require('express'),
    path            = require('path'),
    config 			= require('../config'),
    routes          = require('../routes'),
    errors 			= require('../errors'),
    auth            = require('./auth'),
    checkSSL        = require('./check-ssl'),
    cors            = require('cors'),

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