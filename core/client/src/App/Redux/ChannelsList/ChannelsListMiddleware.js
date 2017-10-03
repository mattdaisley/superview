import * as types from '../Types';

import { setChannelIds, setChatChannel } from './ChannelsListActionCreators'

import { getTwitchChannel } from '../Twitch/TwitchActionCreators'
import { getYoutubeChannel } from '../Youtube/YoutubeActionCreators'

const channelsListMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'channelsList') {
    return next(action);
  }
  let newAction

  switch (action.type) {
    case types.SET_CHANNEL_IDS:
      const channelIds = action.meta.channelIds;
      const channels = channelIds.map( id => ({ state: 'loading', id: id, channel: { title: '', src: '' } }) )
      newAction = Object.assign({}, action, {
        payload: channels
      });
      delete newAction.meta;
      store.dispatch(newAction);
      if ( action.meta.sourceType === 'tw' ) store.dispatch(getTwitchChannel(channelIds));
      if ( action.meta.sourceType === 'yt' ) store.dispatch(getYoutubeChannel(channelIds));
      break

    case types.SET_CHANNELS:
      newAction = Object.assign({}, action, {
        payload: action.meta.channels
      });
      delete newAction.meta;
      store.dispatch(newAction);
      store.dispatch(setChatChannel(action.meta.channels[0]))
      break
    case types.ADD_CHANNEL:
      const channelId = action.meta.channelId
      const oldChannelIds = store.getState().channelsList.channels.map( channel => channel.id ) || [];
      if ( oldChannelIds.indexOf(channelId) < 0 ) {
        const newChannelIds = [ ...oldChannelIds, channelId ]
        store.dispatch(setChannelIds(action.meta.sourceType, newChannelIds))
      }
      break;
    default:
      break
  }

}

export default channelsListMiddleware