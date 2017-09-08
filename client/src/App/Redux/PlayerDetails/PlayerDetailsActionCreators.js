import * as types from '../Types';

const clientId = '0ajwj4yx39smt1qtzfhrgjihvuo1wr';
const requestUri = 'https://api.twitch.tv/kraken/';

export const getTwitchChannel = (users) => {
  
  const requestEnpoint = 'users'

  users = (users.constructor === Array) ? users.join(',') : users;
  
  return ({
    type: types.GET_TWITCH_CHANNEL,
    meta: {
      type: 'twitchApi',
      payload: {},
      clientId: clientId,
      url: requestUri + requestEnpoint + '?login=' + users
    }
  })
}

export const getTwitchChannelDetails = (channels) => {
  
  const requestEnpoint = 'streams'

  channels = (channels.constructor === Array) ? channels.map( channel => channel._id ).join(',') : channels;
  
  return ({
    type: types.GET_TWITCH_CHANNEL_DETAILS,
    meta: {
      type: 'twitchApi',
      payload: {},
      clientId: clientId,
      url: requestUri + requestEnpoint + '?channel=' + channels
    }
  })
}

//https://api.twitch.tv/kraken/users?login=dallas,dallasnchains