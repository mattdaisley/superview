import * as types from '../Types';

export const getRecentChannelsItems = () => ({
  type: types.GET_RECENT_CHANNELS_ITEMS,
  meta: {
    type: 'recentChannels'
  }
})

export const setRecentChannelsItem = (source, item) => ({
  type: types.SET_RECENT_CHANNELS_ITEM,
  meta: {
    type: 'recentChannels',
    source: source,
    item: item,
  }
})