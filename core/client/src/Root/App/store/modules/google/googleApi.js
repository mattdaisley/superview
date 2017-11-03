import config from './config'

import { googleAuthActionCreators } from './googleAuth'
import utils from './utils/utils'
import { hasToken, getToken } from './utils/tokens'

const SET_PROFILE         = 'app/google/googleApi/SET_PROFILE'
const SET_SEARCH_VIDEOS   = 'app/google/googleApi/SET_SEARCH_VIDEOS'
const SET_SEARCH_CHANNELS = 'app/google/googleApi/SET_SEARCH_CHANNELS'

const initialState = {
  profile: undefined,
  search: {
    videos: [],
    channels: []
  }
  // youtubeSearchResults: [],
  // youtubeChannelSearchResults: []
}


const setGoogleProfile = ( profile = {} ) => {
  return ({
    type: SET_PROFILE,
    payload: profile
  })
}

const getGoogleProfile = () => ( dispatch, getState ) => {
  const requestEnpoint = 'people/me'
  const url = config.plusRequestUri + requestEnpoint
  let googleProfile
  utils.doApiRequest(dispatch, url)
    .then(json => {
      if ( !json.error ) {
        if ( json.id ) {
          googleProfile = json
          dispatch(googleAuthActionCreators.setGoogleLoggedIn(true))
        }
      }
      dispatch(setGoogleProfile(googleProfile))
    })
    .catch( err => {
      utils.handleApiError(err, dispatch, getGoogleProfile) 
      dispatch(setGoogleProfile())
    })

}

const setSearchVideos = ( videos = [] ) => {
  return ({
    type: SET_SEARCH_VIDEOS,
    payload: videos
  })
}

const getSearchVideos = ( query ) => ( dispatch, getState ) => {
  const requestEnpoint = 'search'
  const part = 'snippet'
  const type = 'video'
  const maxResults = 10
  const url = config.youtubeRequestUri + requestEnpoint + '?q=' + encodeURIComponent(query) + '&maxResults=' + maxResults + '&part=' + part + '&type=' + type
  let videoResults
  utils.doApiRequest(dispatch, url)
    .then(json => {
      if ( !json.error ) {
        if ( json.pageInfo.totalResults > 0 ) {
          videoResults = utils.formatVideoSearchResult(json.items)
          dispatch(setSearchVideos(videoResults))
        }
      }
    })
    .catch( err => {
      utils.handleApiError(err, dispatch, getSearchVideos) 
    })
}

const setSearchChannels = ( channels = [] ) => {
  return ({
    type: SET_SEARCH_CHANNELS,
    payload: channels
  })
}

const getSearchChannels = ( query ) => ( dispatch, getState ) => {
  const requestEnpoint = 'search'
  const part = 'snippet'
  const type = 'channel'
  const maxResults = 1
  const url = config.youtubeRequestUri + requestEnpoint + '?q=' + encodeURIComponent(query) + '&maxResults=' + maxResults + '&part=' + part + '&type=' + type
  let channelResults
  utils.doApiRequest(dispatch, url)
    .then(json => {
      if ( !json.error ) {
        if ( json.pageInfo.totalResults > 0 ) {
          channelResults = utils.formatChannelSearchResult(json.items)
          dispatch(setSearchChannels(channelResults))
        }
      }
    })
    .catch( err => {
      utils.handleApiError(err, dispatch, getSearchChannels) 
    })
  
}


const googleApiActionCreators = {
  setGoogleProfile,
  getGoogleProfile,
  setSearchVideos,
  getSearchVideos,
  setSearchChannels,
  getSearchChannels,
}

const googleApiActionTypes = {
  SET_PROFILE,
  SET_SEARCH_VIDEOS,
  SET_SEARCH_CHANNELS,
}

export {
  googleApiActionCreators,
  googleApiActionTypes,
}


export default function googleApiReducer(state = initialState, action = {}) {
  switch (action.type) {
    
  case SET_PROFILE:
    return { ...state, profile: action.payload}
    
  case SET_SEARCH_VIDEOS:
    return { ...state, search: { ...state.search, videos: action.payload } }
  case SET_SEARCH_CHANNELS:
    return { ...state, search: { ...state.search, channels: action.payload } }
  default:
    return state
  }
}
