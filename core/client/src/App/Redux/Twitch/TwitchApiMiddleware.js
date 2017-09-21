import * as types from '../Types';

import { getTwitchChannelDetails, twitchLoginFailure } from './TwitchActionCreators'

import { hasToken, getToken } from '../../Util/tokenTwitch';

const twitchApiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'twitchApi') {
    return next(action);
  }

  const {url, clientId} = action.meta;
  const headers = {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientId
  }

  // console.log(hasToken(), getToken());
  if ( hasToken() ) {
    headers['Authorization'] = 'OAuth ' + getToken()
  }

  switch (action.type) {
    case types.GET_TWITCH_CHANNEL:
      fetch(url, {headers: headers})
        .then(resp => resp.json())
        .then(json => {
          // console.log(url, json);
          let actionItem = { payload: [] }
          if ( json._total > 0) {
            
            const formattedChannels = formatChannels(json.users);
            // console.log(url, json, formattedChannels);

            actionItem = { payload: formattedChannels }
            store.dispatch(getTwitchChannelDetails(formattedChannels));
          }
          
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
      break

    case types.GET_TWITCH_CHANNEL_DETAILS:
      let promises = action.meta.channels.map( resource => {
        // console.log(channel);
        return new Promise( (resolve, reject) => {
          fetch(url + resource.channel.channel_id, {headers: headers})
            .then(resp => resp.json())
            .then(json => {
              const formattedChannelDetails = formatChannelDetails(json, resource);
              // console.log(url + resource.channel.channel_id, json, formattedChannelDetails);

              resolve(formattedChannelDetails)
            })
            .catch(err => {
              console.log(err);
              reject(err);
            })
        })
      })

      Promise.all( promises )
        .then( users => {
          let newAction = Object.assign({}, action, {
            payload: users
          });
          delete newAction.meta;
          store.dispatch(newAction);
        })
      
      break
    case types.GET_TWITCH_FOLLOWING:
      if ( !hasToken() ) return;
      fetch(url, {headers: headers})
        .then(resp => resp.json())
        .then(json => {
          // console.log(json);
          if ( !json.error ) {
            let formattedStreams = null;
            let actionItem = { payload: [] }
            if ( json._total > 0) {
              
              formattedStreams = formatStreamDetails(json.streams);
  
              // console.log(url, json, formattedStreams);
              actionItem = { payload: formattedStreams }
            }
            
            let newAction = Object.assign({}, action, actionItem);
            delete newAction.meta;
            store.dispatch(newAction);

          } else {
            // console.log('GET_TWITCH_FOLLOWING error', json, json.error, json.status === 401);
            if ( json.status === 401 ) {
              store.dispatch(twitchLoginFailure({refresh:true}));
            }
          }

        })
        .catch(err => console.log(err))
      break;
    case types.TWITCH_SEARCH:
      fetch(url, {headers: headers})
        .then(resp => resp.json())
        .then(json => {
          let actionItem = { payload: [{status:'error'}] }
          if ( json._total > 0) {
            
            const formattedChannel = formatStreamDetails(json.streams);
            // console.log(url, json, formattedChannel);
            actionItem = { payload: formattedChannel }
          }
          
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
        .catch(err => console.log(err))
      break;
    default:
      break
  }

}

const formatChannels = ( channels ) => {

  return [...channels].map( channel => {
    return {
      source_type: 'tw',
      id: channel.name,
      title: channel.display_name,
      description: channel.bio,
      published_at: channel.created_at,
      thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_{user}-320x180.jpg'.replace('{user}', channel.name),
      stats: {
        views: channel.viewers || undefined,
        likes: undefined,
        dislikes: undefined,
        comments: undefined,
      },
      channel: {
        channel_id: channel._id,
      },
    }
  })
}


const formatChannelDetails = ( channelDetails, resource ) => {

  let formattedResource = Object.assign( {}, resource );

  formattedResource.channel = {
    channel_id: channelDetails._id,
    title: channelDetails.status,
    name: channelDetails.display_name,
    logo: (channelDetails.logo !== null) ? channelDetails.logo : 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png',
    description: channelDetails.description
  };
  
  return formattedResource;
}

const formatStreamDetails = ( stream ) => {
  
  return [...stream].map( stream => {
    return {
      source_type: 'tw',
      id: stream.channel.name,
      channel: {
        channel_id: stream.channel._id,
        title: stream.channel.status,
        name: stream.channel.display_name,
        logo: stream.channel.logo,
        description: stream.channel.description,
      },
      title: stream.channel.status,
      thumbnail: stream.preview.medium,
      description: stream.channel.description,
      published_at: stream.created_at,
      stats: {
        views: stream.viewers,
        likes: undefined,
        dislikes: undefined,
        comments: undefined,
      }
    }
  })
}

export default twitchApiMiddleware