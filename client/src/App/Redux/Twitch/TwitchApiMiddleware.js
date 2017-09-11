import * as types from '../Types';

import { getTwitchChannelDetails } from './TwitchActionCreators'

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

  if ( hasToken() ) {
    headers['Authorization'] = 'OAuth ' + getToken()
  }

  switch (action.type) {
    case types.GET_TWITCH_CHANNEL:
      fetch(url, {headers: headers})
        .then(resp => resp.json())
        .then(json => {
          // console.log(url, json);
          let actionItem = { payload: [{status:'error'}] }
          if ( json._total > 0) {
            
            const formattedChannels = formatChannels(json.users);

            actionItem = { payload: formattedChannels }
            store.dispatch(getTwitchChannelDetails(formattedChannels));
          }
          
          let newAction = Object.assign({}, action, actionItem);
          delete newAction.meta;
          store.dispatch(newAction);
        })
      break

    case types.GET_TWITCH_CHANNEL_DETAILS:
      let promises = action.meta.channels.map( channel => {
        // console.log(channel);
        return new Promise( (resolve, reject) => {
          fetch(url + channel.channel_id, {headers: headers})
            .then(resp => resp.json())
            .then(json => {
              const formattedChannelDetails = formatChannelDetails(json);
              // console.log(url + channel.channel_id, json, formattedChannelDetails);

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
          let actionItem = { payload: [{status:'error'}] }
          if ( json._total > 0) {
            
            const formattedStreams = formatStreamDetails(json.streams);

            // console.log(url, json, formattedStreams);
            actionItem = { payload: formattedStreams }
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
      id: channel.name,
      channel_id: channel._id,
      title: channel.display_name,
      description: channel.bio,
      published_at: channel.created_at,
      logo: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_{user}-320x180.jpg'.replace('{user}', channel.name),
      stats: {
        views: channel.viewers || undefined,
        likes: undefined,
        dislikes: undefined,
        comments: undefined,
      }
    }
  })
}


const formatChannelDetails = ( channelDetails ) => {
  return {
    id: channelDetails._id,
    title: channelDetails.status,
    name: channelDetails.display_name,
    logo: channelDetails.logo,
    description: channelDetails.description
  }
}

const formatStreamDetails = ( stream ) => {
  
  return [...stream].map( stream => {
    return {
      id: stream.channel.name,
      name: stream.channel.display_name,
      title: stream.channel.status,
      logo: stream.preview.medium,
      channel_id: stream.channel._id,
      channel_logo: stream.channel.logo,
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