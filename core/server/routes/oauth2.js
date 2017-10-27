// # API routes
var express     = require('express'),
    utils       = require('../utils'),
    request     = require('request'),
    oauth2Routes;

oauth2Routes = function oauth2Routes(middleware) {
    var router = express.Router(),
        // Authentication for public endpoints
        authenticatePublic = [
        //     middleware.api.authenticateClient,
        //     middleware.api.authenticateUser,
        //     middleware.api.requiresAuthorizedUserPublicAPI,
            middleware.oauth2.cors
        ],
        // Require user for private endpoints
        authenticatePrivate = [
            // middleware.api.authenticateClient,
            // middleware.api.authenticateUser,
            // middleware.api.requiresAuthorizedUser,
            // middleware.api.cors
        ];

    // alias delete with del
    router.del = router.delete;

    // Check version matches for API requests, depends on res.locals.safeVersion being set
    // Therefore must come after themeHandler.ghostLocals, for now
    // router.use(middleware.api.versionMatch);

    // ## CORS pre-flight check
    router.options('*', middleware.oauth2.cors);
    

    router.get('/google/', authenticatePublic, function( req, res, next ) {
        if ( !!req.query.token && req.query.token !== 'null' ) {
            // console.log('setting google token cookies');
            const token = JSON.parse(utils.decrypt(req.query.token));

            let tokens = {
                'google_user_id': token.google_user_id,
                'access_token': token.access_token,
                'expirey_date': token.expirey_date || 9000000,
                'refresh_token': token.refresh_token
            }
            const redirectUrl = config.appUrl + '#google_access_token=' + tokens.access_token + '&google_refresh_token=' + tokens.refresh_token + '&expiry_date=' + tokens.expiry_date + '&google_user_id=' + tokens.google_user_id + '&state=googleLoggedIn';
            res.redirect(redirectUrl);
        } else {
            const query = req.url.substr(req.url.indexOf('?')+1);
            const redirectUrl = config.appUrl + '#' + query
            res.redirect(redirectUrl);
            // res.status(401).send({ error: { message: 'no token provided' } });
        }
    })
    
    router.get('/google/refresh', authenticatePublic, function( req, res, next ) {
        if ( !!req.query.refresh_token && req.query.refresh_token !== 'null' ) {
            // console.log( req.query.refresh_token, req.query.access_token );
            const token = {
                access_token: req.query.access_token || null,
                refresh_token: req.query.refresh_token
            }
            const encryptedToken = utils.encrypt(JSON.stringify(token));
            const redirectUrl = config.authAppUrl + '/oauth2/google/refresh?token=' + encryptedToken;
            // console.log('redirecting to:', redirectUrl);
            // res.redirect(redirectUrl)

            let options = {
                url: redirectUrl,
                method: 'GET'
            };

            request(options, (err, response, body) => {
                if(err) console.log(err);
                // console.log(err, 'response', body);
                // console.log('setting twitch token cookies');
                try {
                    const token = JSON.parse(utils.decrypt(body));
                    
                    res.send(token)
                } catch( error ) {
                    if ( error ) {
                        res.send(error)
                    }
                }
            });
        } else {
            res.status(401).send({ error: { message: 'no refresh token provided' } });
        }
    })
    
    // router.get('/google/refresh/callback', function( req, res, next ) {
    //   console.log('in /google/refresh/callback');
    //     if ( req.query.token ) {
    //         // console.log('setting twitch token cookies');
    //         const token = JSON.parse(utils.decrypt(req.query.token));
            
    //         res.status(200).send(token)
    //     } else {
    //         res.status(401).send({error: { status: 'no token provided' }})
    //     }
    // })
    
    router.get('/twitch/', authenticatePublic, function( req, res, next ) {
        if ( !!req.query.token && req.query.token !== 'null' ) {
            // console.log('setting twitch token cookies');
            const token = JSON.parse(utils.decrypt(req.query.token));

            const redirectUrl = config.appUrl + '#twitch_access_token=' + token.access_token + '&twitch_refresh_token=' + token.refresh_token + '&expiry_date=' + token.expiry_date + '&state=twitchLoggedIn';
            // console.log('redirecting to', redirectUrl);
            res.redirect(redirectUrl);
            // next();
        } else {
            const query = req.url.substr(req.url.indexOf('?')+1);
            const redirectUrl = config.appUrl + '#' + query
            res.redirect(redirectUrl);
            // res.status(401).send({ error: { message: 'no token provided' } });
        }
    })
    
    router.get('/twitch/refresh', authenticatePublic, function( req, res, next ) {
        if ( !!req.query.refresh_token && req.query.refresh_token !== 'null' ) {
            // console.log( req.query.refresh_token, req.query.access_token );
            const token = {
                access_token: req.query.access_token || null,
                refresh_token: req.query.refresh_token
            }
            const encryptedToken = utils.encrypt(JSON.stringify(token));
            const redirectUrl = config.authAppUrl + '/oauth2/twitch/refresh?token=' + encryptedToken;
            // console.log('redirecting to:', redirectUrl);
            // res.redirect(redirectUrl)

            let options = {
                url: redirectUrl,
                method: 'GET'
            };

            request(options, (err, response, body) => {
                if(err) console.log(err);
                // console.log(err, 'response', body);
                // console.log('setting twitch token cookies');
                const token = JSON.parse(utils.decrypt(body));
                
                res.send(token)
            });
        } else {
            res.status(401).send({ error: { message: 'no refresh token provided' } });
        }
    })
    
    router.get('/twitch/refresh/callback', authenticatePublic, function( req, res, next ) {
        if ( req.query.token ) {
            // console.log('setting twitch token cookies');
            const token = JSON.parse(utils.decrypt(req.query.token));
            
            res.status(200).send(token)
        } else {
            res.status(401).send({error: { status: 'no token provided' }})
        }
    })

    // API Router middleware
    router.use(middleware.api.errorHandler);

    return router;
};

module.exports = oauth2Routes;
