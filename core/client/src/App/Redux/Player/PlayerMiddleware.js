import * as types from '../Types';

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
      // const prevPlayers = { 'tw:123': { id: '123', sourceType: 'tw', playerObject: {} }, 'tw:anthony_kongphan': { id: 'anthony_kongphan', source: 'tw', playerObject: {} } }
      let newPlayers = { ...prevPlayers };

      const matchingSource = getMatchingSource( prevPlayers, sourceType, sourceId )
      if ( matchingSource ){
        newPlayers[sourceType + ':' + sourceId] = { ...matchingSource, playerObject } 
      } else {
        newPlayers[sourceType + ':' + sourceId] = { id: sourceId, sourceType, playerObject } 
      }
      dispatchNewAction( store, action, { players: newPlayers });
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
  const sources = Object.assign( {}, store.getState().player.sources );
  if ( sources.constructor === Object && Object.keys(sources).length !== 0 ) {
    Object.keys(sources).some( (key, index) => {
      if ( key === sourceType+':'+sourceId ) {
        delete sources[key];
        return true;
      }
      return false;
    });
  } 
  return sources;
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