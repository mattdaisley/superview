import * as types from '../Types';

import { doApiRequest } from './SuperViewApiRequest';

const superViewApiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'superViewApi') {
    return next(action);
  }

  const isLoggedIn = store.getState().youtubeOauth.loggedIn;

  const { url } = action.meta;
  // const headers = {
  //   'Authorization': 'Bearer ' + getToken()
  // }

  switch (action.type) {
    case types.SUPERVIEW_YOUTUBE_SUBSCRIPTIONS:
      // console.log('SUPERVIEW_YOUTUBE_SUBSCRIPTIONS', action.meta)
      let actionItem = { payload: [] }
      if ( !!isLoggedIn ) {
        doApiRequest(store, url)
          .then(results => {
            // console.log('SUPERVIEW_YOUTUBE_SUBSCRIPTIONS results', results);
            if ( results.length > 0) {
              actionItem = { payload: results.map( video => video.google_video_id ) }
            }
            // console.log(actionItem);
            
            let newAction = Object.assign({}, action, actionItem);
            delete newAction.meta;
            store.dispatch(newAction);
          })
          // .catch( error => console.log('error:',error) )
          .catch( error => {} )
      }
      break

    default:
      break
  }

}

export default superViewApiMiddleware