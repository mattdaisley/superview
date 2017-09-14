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
      setRecentChannelsItem( formatRecentChannelDetails(action.meta.source, action.meta.channelDetails) )
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

const formatRecentChannelDetails = ( source, channelDetails ) => {
  switch (source) {
    case 'yt':
      return formatYoutubeVideoDetails(channelDetails);
    case 'tw':
    default:
      return formatTwitchStreamDetails(channelDetails);
  }
}

const formatYoutubeVideoDetails = ( channelDetails ) => {
  // console.log(channelDetails);
  return {
    type: 'yt',
    title: (channelDetails.length > 1) ? 'Multi-tube' : channelDetails[0].title,
    route: '/yt/' + channelDetails.map( channel => channel.id ).join('/'),
    thumb: {
      width: 160,
      height: 90,
      url: channelDetails[0].thumbnail,
    },
    channels: channelDetails,
  }
}

const formatTwitchStreamDetails = ( channelDetails ) => {
  // console.log(channelDetails)
  return {
    type: 'tw',
    title: (channelDetails.length > 1) ? 'Multi-stream' : channelDetails[0].channel.title,
    route: '/tw/' + channelDetails.map( channel => channel.id ).join('/'),
    thumb: {
      width: 160,
      height: 90,
      url: channelDetails[0].thumbnail,
    },
    channels: channelDetails,
  }
}

export default recentChannelsMiddleware