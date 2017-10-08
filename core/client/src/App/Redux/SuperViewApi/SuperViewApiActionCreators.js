import * as types from '../Types';

import config from './SuperViewConfig';

import { getGoogleUserId } from '../../Util/tokenYoutube';


const apiRequestUri = config.apiRequestUri;

export const getYoutubeRecentVideoIds = () => {
  
  const requestEnpoint = 'youtube/subscriptions'
  const maxResults = 50
  const google_user_id = getGoogleUserId()

  return ({
    type: types.SUPERVIEW_YOUTUBE_SUBSCRIPTIONS,
    meta: {
      type: 'superViewApi',
      url: apiRequestUri + requestEnpoint + '?google_user_id=' + google_user_id + '&maxResults=' + maxResults,
    }
  })

}

export const superViewAddRetry = (retryOptions) => ({
  type: types.SUPERVIEW_ADD_RETRY,
  payload: {
    retryOptions
  }
})

export const superViewDoRetry = () => ({
  type: types.SUPERVIEW_DO_RETRY,
  meta: {
    type: 'superViewApi'
  }
})