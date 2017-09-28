import * as types from '../Types';

import { setChatChannel } from './ChannelsListActionCreators'

const messagesMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'channelsList') {
    return next(action);
  }
  let newAction

  switch (action.type) {
    case types.SET_CHANNEL_IDS:
      let channels = action.meta.channelIds.map( id => ({ state: 'loading', id: id, channel: { title: '', src: '' } }) )
      newAction = Object.assign({}, action, {
        payload: channels
      });
      delete newAction.meta;
      store.dispatch(newAction);
      break

    case types.SET_CHANNELS:
      newAction = Object.assign({}, action, {
        payload: action.meta.channels
      });
      delete newAction.meta;
      store.dispatch(newAction);
      store.dispatch(setChatChannel(action.meta.channels[0]))
      break
    default:
      break
  }

}

export default messagesMiddleware