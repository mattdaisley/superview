import * as types from '../../Types';

export const setChannelIds = ( sourceType, channelIds ) => ({
  type: types.SET_CHANNEL_IDS,
  meta: {
    type: 'channelsList',
    sourceType: sourceType,
    channelIds: channelIds
  }
})

export const setChannels = ( channels ) => ({
  type: types.SET_CHANNELS,
  meta: {
    type: 'channelsList',
    channels: channels
  }
})

export const addChannelId = ( sourceType, channelId ) => ({
  type: types.ADD_CHANNEL,
  meta: {
    type: 'channelsList',
    sourceType: sourceType,
    channelId: channelId
  }
})

export const resetChannels = ( ) => ({
  type: types.RESET_CHANNELS
})

export const setChatChannel = ( chatChannel ) => ({
  type: types.SET_CHAT_CHANNEL,
  chatChannel: chatChannel
})