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
      setRecentChannelsItem( formatRecentChannelDetails(action.meta.source, action.meta.item) )
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
    case 'tw':
    default:
      return formatTwitchChannelDetails(channelDetails);
  }
}

const formatTwitchChannelDetails = ( channelDetails ) => {

  const title     = (channelDetails.length > 1) ? 'Multi-stream' : channelDetails[0].status;
  const route     = channelDetails.map( channel => channel.name ).join('/');
  const thumbSize = { width: 160, height: 90 };
  const thumbPath = 'https://static-cdn.jtvnw.net/previews-ttv/live_user_{user}-{width}x{height}.jpg';
  const thumbUrls = channelDetails.map( channel => thumbPath.replace('{user}', channel.name).replace('{width}', thumbSize.width).replace('{height}', thumbSize.height));
  const thumb     = { width: thumbSize.width, height: thumbSize.height, urls: thumbUrls }
  const channels  = channelDetails.map( channel => { 
    return { name: channel.display_name, channelThumb: channel.logo } 
  })

  return {
    type: 'tw',
    title: title,
    route: '/tw/' + route,
    thumb: thumb,
    channels: channels
  }
}

export default recentChannelsMiddleware