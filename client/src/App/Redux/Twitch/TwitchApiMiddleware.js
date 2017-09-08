import * as types from '../Types';

import { getTwitchChannelDetails } from '../PlayerDetails/PlayerDetailsActionCreators'

const twitchApiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'twitchApi') {
    return next(action);
  }

  const {url, clientId} = action.meta;
  const headers = {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientId
  }

  switch (action.type) {
    case types.GET_TWITCH_CHANNEL:
      fetch(url, {headers: headers})
        .then(resp => resp.json())
        .then(json => {
          let newAction = Object.assign({}, action, {
            payload: json.users
          });
          delete newAction.meta;
          store.dispatch(newAction);
          store.dispatch(getTwitchChannelDetails(json.users));
        })
      break
    case types.GET_TWITCH_CHANNEL_DETAILS:
      fetch(url, {headers: headers})
        .then(resp => resp.json())
        .then(json => {
          // console.log(json);
          let newAction = Object.assign({}, action, {
            payload: json.streams
          });
          delete newAction.meta;
          store.dispatch(newAction);
        })
      break
    default:
      break
  }

}

export default twitchApiMiddleware