import * as types from '../Types';

import { resetChannels } from '../ChannelsList/ChannelsListActionCreators';
import { play } from './PlayerActionCreators';

const playerMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'player') {
    return next(action);
  }

  switch (action.type) {
    case types.PLAYER_OPEN:
      let openPlayerAction = Object.assign({}, action, {
        payload: { openState: 'open' }
      });
      delete openPlayerAction.meta;
      store.dispatch(openPlayerAction);
      break
    case types.PLAYER_CLOSE:
      let closePlayerAction = Object.assign({}, action, {
        payload: { openState: 'closed' }
      });
      delete closePlayerAction.meta;
      store.dispatch(closePlayerAction);
      store.dispatch(resetChannels())
      break
    case types.PLAYER_MINIMIZE:
      let minimizePlayerAction = Object.assign({}, action, {
        payload: { openState: 'minimized' }
      });
      delete minimizePlayerAction.meta;
      store.dispatch(minimizePlayerAction);
      break

    case types.PLAYER_REGISTER:
      const { sourceType, sourceId, playerObject } = action.meta;
      const prevPlayers = Object.assign( {}, store.getState().player.players );
      let newPlayers = { ...prevPlayers };
      const matchingSource = getMatchingSource( prevPlayers, sourceType, sourceId )
      if ( matchingSource ){
        newPlayers[sourceType + ':' + sourceId] = { ...matchingSource, playerObject } 
      } else {
        newPlayers[sourceType + ':' + sourceId] = { id: sourceId, sourceType, playerObject } 
      }
      dispatchNewAction( store, action, { players: newPlayers });
      playPlayersIfReady( store, sourceType, newPlayers )
      break;
    case types.PLAYER_DEREGISTER:
      dispatchNewAction(store, action, { players: deRegisterPlayer(store, action.meta) })
      break;

    case types.PLAYER_PLAY:
      callPlayerFunction(store.getState().player.players, action.type);
      dispatchNewAction(store, action, { playing: true })
      break;
    case types.PLAYER_PAUSE:
      callPlayerFunction(store.getState().player.players, action.type);
      dispatchNewAction(store, action, { playing: false })
      break;

    case types.PLAYER_SOURCES:
      dispatchNewAction(store, action, { sourceType: action.meta.sourceType, sources: action.meta.sources })
      break;

    case types.PLAYER_LOADED:
      dispatchNewAction(store, action, { loaded: action.meta.loaded } )
      break;
    default:
      break
  }

}

const deRegisterPlayer = ( store, actionMeta ) => {
  const { sourceType, sourceId } = actionMeta;
  const players = Object.assign( {}, store.getState().player.players );
  if ( players.constructor === Object && Object.keys(players).length !== 0 ) {
    Object.keys(players).some( (key, index) => {
      if ( key === sourceType+':'+sourceId ) {
        delete players[key];
        return true;
      }
      return false;
    });
  } 
  return players;
}

const playPlayersIfReady = ( store, sourceType, newPlayers ) => {
  if ( store.getState().channelsList.channels.length === Object.keys(newPlayers).length ) {
    let allReady = true;
    Object.keys(newPlayers).forEach( (key, index) => {
      const playerObject = newPlayers[key].playerObject
      if ( !playerObject || (playerObject && Object.keys(playerObject).length === 0) ) allReady = false
      if ( index === Object.keys(newPlayers).length - 1 && allReady ) store.dispatch(play())
    })
  }
}

const callPlayerFunction = ( players, action ) => {
  if ( players.constructor === Object && Object.keys(players).length !== 0 ) {
    Object.keys(players).forEach( key => {
      const sourceType = players[key].sourceType;
      switch( action ) {
        case types.PLAYER_PLAY:
          if ( sourceType === 'tw' ) { players[key].playerObject.play(); return; }
          if ( sourceType === 'yt' ) { players[key].playerObject.playVideo(); return; }
          break;
        case types.PLAYER_PAUSE:
        default:
          if ( sourceType === 'tw' ) { players[key].playerObject.pause(); return; }
          if ( sourceType === 'yt' ) { players[key].playerObject.pauseVideo(); return; }
          break;
      }
    })
  }
}


const getMatchingSource = ( prevSources, newSourceType, newSourceId ) => {
  if ( prevSources.constructor === Object && Object.keys(prevSources).length !== 0 ) {
    Object.keys(prevSources).forEach( key => {
      if ( key === newSourceType+':'+newSourceId ) {
        return prevSources[key]
      }
    });
  } 
  return undefined
}

const dispatchNewAction = ( store, action, payload ) => {
  let newAction = Object.assign({}, action, { payload });
  delete newAction.meta;
  store.dispatch(newAction);
}

export default playerMiddleware