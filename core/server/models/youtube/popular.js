// # Users API
// RESTful API for the User resource
var 
    docName         = 'popular',
    DB              = require('../../db'),
    config          = require('../../config'),
    errors          = require('../../errors'),
    utils           = require('../../utils'),
    knex            = require('knex')({client: 'mysql'}),
    popular;
    
/**
 * ### Users API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
popular = {

    list: function list(options) {
        return new Promise( (resolve, reject) => {
            DB.connect( connection => {

                var query = knex(config.db.tablePrefix + 'google_popular_videos')
                    .select('*')
                    .limit(options.maxResults)

                connection.query( query.toString(), (err, popularVideos) => {
                    connection.release();
                    if ( err ) { reject(err); return; }

                    const formattedPopularVideos = popularVideos.map( popular => {
                      return {
                        source_type: 'yt',
                        id: popular.video_id,
                        title: popular.title,
                        description: popular.description,
                        published_at: popular.published_at,
                        thumbnail: popular.thumbnail,
                        stats: {
                          views: popular.views,
                          likes: popular.likes,
                          dislikes: popular.dislikes,
                          comments: popular.comments,
                        },
                        channel: {
                          channel_id: popular.channel_id,
                        }
                      }
                    })

                    resolve(formattedPopularVideos);
                });

            });
        });
        
    },

};

// make sure all methods can be called by eachother
[
    'list',
].forEach( funcName => {
    popular[funcName] = popular[funcName].bind(popular);
});

module.exports = popular;
