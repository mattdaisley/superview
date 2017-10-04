import * as types from '../Types';

import { superViewAddRetry } from './SuperViewApiActionCreators';

import { doApiRequest } from './SuperViewApiRequest';

const superViewApiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'superViewApi') {
    return next(action);
  }

  const isYoutubeLoggedIn = store.getState().youtubeOauth.loggedIn;

  const { url } = action.meta;
  // const headers = {
  //   'Authorization': 'Bearer ' + getToken()
  // }

  switch (action.type) {
    case types.SUPERVIEW_YOUTUBE_SUBSCRIPTIONS:
      // console.log('SUPERVIEW_YOUTUBE_SUBSCRIPTIONS', action.meta)
      let actionItem = { payload: [] }
      if ( !!isYoutubeLoggedIn ) {
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
      } else {
        const retryOptions = {
          functionToRetry: () => store.dispatch(action),
          expires: Date.now() + 10000
        }
        store.dispatch( superViewAddRetry(retryOptions) )
      }
      break
      
    case types.SUPERVIEW_ADD_RETRY:
      let newRetryAction = Object.assign({}, action, {
        payload: action.meta.retryOptions
      })
      delete newRetryAction.meta;
      store.dispatch(newRetryAction);
      break;

    case types.SUPERVIEW_DO_RETRY:
      let retryStack = store.getState().superViewApi.retryStack;
      if ( retryStack.length > 0 ) {
        retryStack.forEach( stackItem => {
          // console.log('RetryOptions expires > Date.now():', stackItem.retryOptions.expires, Date.now(), stackItem.retryOptions.expires > Date.now())
          if ( stackItem.retryOptions.expires > Date.now() ) {
            stackItem.retryOptions.functionToRetry();
          }
        })
      }
      let newDoRetryAction = Object.assign({}, action, {
        payload: []
      })
      delete newDoRetryAction.meta;
      store.dispatch(newDoRetryAction);
      break;

    default:
      break
  }

}

export default superViewApiMiddleware