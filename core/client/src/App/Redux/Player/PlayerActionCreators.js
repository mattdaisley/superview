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

export const playerMinimize = () => ({
  type: types.PLAYER_MINIMIZE,
  meta: {
    type: 'player'
  }
})

export const playerSources = ( sourceType, sources ) => {
  return ({
    type: types.PLAYER_SOURCES,
    meta: {
      type: 'player',
      sources: sources,
      sourceType: sourceType
    }
  })
}

export const setPlayerLoaded = ( loaded ) => ({
  type: types.PLAYER_LOADED,
  meta: {
    type: 'player',
    loaded: loaded,
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