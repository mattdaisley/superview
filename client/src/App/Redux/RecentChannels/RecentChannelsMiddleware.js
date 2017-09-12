import * as types from '../Types';

import { setRecentChannelsItem, getRecentChannelsItems } from '../../Util/localStoreRecentChannels';

const recentChannelsMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'recentChannels') {
    return next(action);
  }
  switch (action.type) {
    case types.GET_RECENT_CHANNELS_ITEMS:
      let newGetAction = Object.assign({}, action, {
        payload: getRecentChannelsItems()
      });
      delete newGetAction.meta;
      store.dispatch(newGetAction);
      break
    case types.SET_RECENT_CHANNELS_ITEM:
      setRecentChannelsItem( formatRecentChannelDetails(action.meta.source, action.meta.channels, action.meta.channelDetails) )
      let newSetAction = Object.assign({}, action, {
        payload: getRecentChannelsItems()
      });
      delete newSetAction.meta;
      store.dispatch(newSetAction);
      break
    default:
      break
  }

}

const formatRecentChannelDetails = ( source, channels, channelDetails ) => {
  switch (source) {
    case 'yt':
      return formatYoutubeVideoDetails(channels, channelDetails);
    case 'tw':
    default:
      return formatTwitchStreamDetails(channels, channelDetails);
  }
}

const formatYoutubeVideoDetails = ( channels, channelDetails ) => {
  console.log(channels);
  return {
    type: 'yt',
    title: (channels.length > 1) ? 'Multi-tube' : channels[0].title,
    route: '/yt/' + channels.map( channel => channel.id ).join('/'),
    thumb: {
      width: 160,
      height: 90,
      url: channels[0].thumbnail,
    },
    channels: channelDetails,
  }
}

const formatTwitchStreamDetails = ( channels, channelDetails ) => {
  console.log(channels, channelDetails)
  return {
    type: 'tw',
    title: (channels.length > 1) ? 'Multi-stream' : channelDetails[0].title,
    route: '/tw/' + channels.map( channel => channel.id ).join('/'),
    thumb: {
      width: 160,
      height: 90,
      url: channels[0].thumbnail,
    },
    channels: channelDetails,
  }
}

export default recentChannelsMiddleware