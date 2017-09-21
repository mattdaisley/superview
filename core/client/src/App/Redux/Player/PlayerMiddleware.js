import * as types from '../Types';

const playerMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'player') {
    return next(action);
  }

  switch (action.type) {
    case types.PLAYER_OPEN:
      let openPlayerAction = Object.assign({}, action, {
        payload: { open: true }
      });
      delete openPlayerAction.meta;
      store.dispatch(openPlayerAction);
      break
    case types.PLAYER_CLOSE:
      let closePlayerAction = Object.assign({}, action, {
        payload: { open: false }
      });
      delete closePlayerAction.meta;
      store.dispatch(closePlayerAction);
      break
    case types.PLAYER_REGISTER:
      const { sourceType, sourceId, playerObject } = action.meta;
      const prevSources = Object.assign( {}, store.getState().player.sources );
      // const prevSources = { 'tw:123': { id: '123', sourceType: 'tw', playerObject: {} }, 'tw:anthony_kongphan': { id: 'anthony_kongphan', source: 'tw', playerObject: {} } }
      let newSources = { ...prevSources };

      const matchingSource = getMatchingSource( prevSources, sourceType, sourceId )
      if ( matchingSource ){
        newSources[sourceType + ':' + sourceId] = { ...matchingSource, playerObject } 
      } else {
        newSources[sourceType + ':' + sourceId] = { id: sourceId, sourceType, playerObject } 
      }
      dispatchNewAction( store, action, { sources: newSources });
      break;
    case types.PLAYER_DEREGISTER:
      dispatchNewAction(store, action, { sources: deRegisterPlayer(store, action.meta) })
      break;
    case types.PLAYER_PLAY:
      playersCall(store.getState().player.sources, action.type);
      dispatchNewAction(store, action, { playing: true })
      break;
    case types.PLAYER_PAUSE:
      playersCall(store.getState().player.sources, action.type);
      dispatchNewAction(store, action, { playing: false })
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

const playersCall = ( sources, action ) => {
  if ( sources.constructor === Object && Object.keys(sources).length !== 0 ) {
    Object.keys(sources).forEach( key => {
      const sourceType = sources[key].sourceType;
      switch( action ) {
        case types.PLAYER_PLAY:
          if ( sourceType === 'tw' ) { sources[key].playerObject.play(); return; }
          if ( sourceType === 'yt' ) { sources[key].playerObject.playVideo(); return; }
          break;
        case types.PLAYER_PAUSE:
        default:
          if ( sourceType === 'tw' ) { sources[key].playerObject.pause(); return; }
          if ( sourceType === 'yt' ) { sources[key].playerObject.pauseVideo(); return; }
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