import * as types from '../Types';

export const playerOpen = ( sourceType, ids ) => ({
  type: types.PLAYER_OPEN,
  meta: {
    type: 'player',
    sourceType,
    ids,
  }
})

export const playerClose = () => ({
  type: types.PLAYER_CLOSE,
  meta: {
    type: 'player'
  }
})

export const registerPlayer = ( sourceType, sourceId, playerObject ) => ({
  type: types.PLAYER_REGISTER,
  meta: {
    type: 'player',
    sourceType,
    sourceId,
    playerObject
  }
})

export const deRegisterPlayer = ( sourceType, sourceId ) => ({
  type: types.PLAYER_DEREGISTER,
  meta: {
    type: 'player',
    sourceType,
    sourceId,
  }
})

export const play = () => ({
  type: types.PLAYER_PLAY,
  meta: {
    type: 'player',
  }
})

export const pause = () => ({
  type: types.PLAYER_PAUSE,
  meta: {
    type: 'player',
  }
})