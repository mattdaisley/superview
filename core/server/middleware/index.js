var bodyParser      = require('body-parser'),
    express         = require('express'),
    path            = require('path'),
    cors            = require('cors'),
    helmet          = require('helmet'),
    cookieParser    = require('cookie-parser'),
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
	
    app.use(helmet())
	app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(cookieParser());
    
    console.log('middleware');
    
    app.use((req, res, next) => { console.log(req.url); next()})

    console.log(config.corePath + '/client/build/');
    console.log(path.join(config.corePath, 'client', 'build', 'index.html'));
    // console.log(path.join(__dirname, 'build', 'index.html'));

    // app.use(express.static(config.corePath))
    // app.use(express.static(config.corePath + '/client/build/');

    // app.use('/', express.static(config.corePath + '/client/build/'));
    app.use(express.static(path.join(config.corePath, 'client', 'build')));
    
    app.use('/oauth2/google/refresh', function( req, res, next ) {
        // console.log('setting cookie');
        // res.cookie('google_access_token', 'ya29.GlvKBNLq2zWrzDXepbHy7Vn9zq3-CyJZ1sjeoXbazUilhSQDe2_VhGMTZ4BDmPUiRELudQrno3bz8xu5BrT2IdvZBzRCTa8G52CTyye-4wlIicfUBZh9A_Sgul03', { maxAge: 9000000, httpOnly: false })
        // res.cookie('google_refresh_token', '1%2FCl2CgPBcEhdDuQzZVf2Z3xzw2Z5psvGKiga2SJ94uwr-ohOp9o5-WwenmH3hNL4a', { maxAge: 9000000, httpOnly: true })
        // res.send('hello');
        console.log( req.cookies.google_refresh_token, req.cookies.google_access_token );
        if ( req.cookies && req.cookies.google_refresh_token ) {
            const token = {
                google_access_token: req.cookies.google_access_token,
                google_refresh_token: req.cookies.google_refresh_token
            }
            const encryptedToken = utils.encrypt(JSON.stringify(token));
            console.log(encryptedToken);
            res.redirect('https://auth.superview.tv/google/oauth2/refresh?token=' + encryptedToken)
            // res.redirect('http://localhost:3000/google/oauth2/refresh?token=' + encryptedToken)
        } else {
            res.status(401).send({ error: { message: 'no refresh token provided' } });
        }
    })

    app.use('/oauth2/google/', function( req, res, next ) {
        if ( req.query.token ) {
            // console.log('setting google token cookies');
            const token = JSON.parse(utils.decrypt(req.query.token));
            // res.cookie('google_access_token', token.access_token, { maxAge: token.expiry_date, httpOnly: false, secure: true });
            res.cookie('google_access_token', token.access_token, { maxAge: token.expiry_date, httpOnly: false });
            if ( token.refresh_token ) {
                res.cookie('google_refresh_token', token.refresh_token, { maxAge: token.expiry_date, httpOnly: true });
            }
            res.redirect('/index.html');
        }
    })
    
    app.use('/oauth2/twitch/', function( req, res, next ) {
        if ( req.query.token ) {
            // console.log('setting twitch token cookies');
            const token = JSON.parse(utils.decrypt(req.query.token));
            console.log(token);
            // res.cookie('google_access_token', token.access_token, { maxAge: token.expiry_date, httpOnly: false, secure: true });
            try {
                res.cookie('twitch_access_token', token.access_token, { maxAge: token.expiry_date, httpOnly: false });
                if ( token.refresh_token ) {
                    res.cookie('twitch_refresh_token', token.refresh_token, { maxAge: token.expiry_date, httpOnly: true });
                }
            }
            catch( err ) {
                console.log(err);
            }

            const redirectUrl = '/' + '#twitch_access_token=' + token.access_token + '&twitch_refresh_token=' + token.refresh_token + '&expiry_date=' + token.expiry_date + '&state=twitchLoggedIn';
            console.log(redirectUrl);
            res.redirect(redirectUrl);
            // next();
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