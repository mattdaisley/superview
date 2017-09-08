import * as types from '../Types';

export const getRecentChannelsItems = () => ({
  type: types.GET_RECENT_CHANNELS_ITEMS,
  meta: {
    type: 'recentChannels'
  }
})

export const setRecentChannelsItem = (item) => ({
  type: types.SET_RECENT_CHANNELS_ITEM,
  meta: {
    type: 'recentChannels',
    item: item,
  }
})