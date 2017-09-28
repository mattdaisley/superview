import * as types from '../Types';

export const setChannelIds = ( channelIds ) => ({
  type: types.SET_CHANNEL_IDS,
  meta: {
    type: 'channelsList',
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

export const resetChannels = ( ) => ({
  type: types.RESET_CHANNELS
})

export const setChatChannel = ( chatChannel ) => ({
  type: types.SET_CHAT_CHANNEL,
  chatChannel: chatChannel
})