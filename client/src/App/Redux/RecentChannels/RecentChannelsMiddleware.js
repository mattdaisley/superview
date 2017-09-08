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
      setRecentChannelsItem(action.meta.item)
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

export default recentChannelsMiddleware