import React     from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setRecentChannelsItem } from '../../Redux/RecentChannels/RecentChannelsActionCreators';
import { setChannelIds }         from '../../Redux/Player/ChannelsList/ChannelsListActionCreators';
import { resetTwitchChannel, resetTwitchChannelDetails } from '../../Redux/Twitch/TwitchActionCreators';
import { resetYoutubeVideos, resetYoutubeChannelDetails, getYoutubeLoginStatus } from '../../Redux/Youtube/YoutubeActionCreators';
import { setMessage } from '../../Redux/Messages/MessagesActionCreators';

import { playerOpen, playerClose, playerMinimize, playerSources, setPlayerLoaded }  from '../../Redux/Player/PlayerActionCreators';

import { compareArrays } from '../../Util/utils' 
import PlayerUtils from './PlayerUtils';

class PlayerPage extends React.Component {
  
  static contextTypes = {
    router: PropTypes.object
  }
  
  componentDidMount() {
    this.props.playerOpen();
    // this.props.playerMinimize();
    this.resetChannels();
    this.registerPlayerSources(this.props);
  }
  
  componentWillUnmount() {
    if ( this.props.sources.length > 0 ) this.props.playerMinimize();
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.sources.length === 0 ) {
      this.props.playerClose();
      this.context.router.history.push('/');
      return;
    }
    const sourceType = nextProps.source;

    if ( this.resetIfNewPathname(nextProps) ) return;
    if ( this.resetIfInvalidPlayerSource(nextProps) ) return;
    
    if ( sourceType === 'yt' && !this.props.youtubeLoggedIn ) {
      this.props.setPlayerLoaded(true);
      return;
    }

    this.setLoadedOnChannelDetailsLoad(sourceType, nextProps)
  }
  
  /*
    * handles re-routing if duplicate sources
    * handles getting source details from youtube or twitch
    */ 
  registerPlayerSources(props) {
    const sourceType = props.match.params.sourceType;

    let videoIds       = PlayerUtils.getVideoIds(props.match.params);
    let uniqueVideoIds = PlayerUtils.getUniqueVideoIds(props.match.params);

    if ( this.reRouteIfDuplicateSources(sourceType, videoIds, uniqueVideoIds, this.context.router.history) ) return;

    // this.setState( {playerSources: uniqueVideoIds} );
    this.props.playerSources( sourceType, uniqueVideoIds )
    this.props.setChannelIds( sourceType, uniqueVideoIds );
    // if ( !props.youtubeLoggedIn ) 
  }

  /*
    * compares a list of video ids with that last filtered to only unique items
    * if the video ids contain duplicates, re route to a path with only the unique video ids
    */
  reRouteIfDuplicateSources(source, videoIds, uniqueVideoIds, history) {
    if ( !compareArrays(videoIds, uniqueVideoIds) ) {
      let pathname = '/'+source + '/' + uniqueVideoIds.join('/');
      console.log(pathname)
      this.context.router.history.push(pathname);
      return; 
    }
  }
  
  /*
    * checks if the current pathname is the same as the new pathname
    * if so, reset channels and register the new sources from the new props
    */
  resetIfNewPathname(nextProps) {
    if ( this.props.location.pathname !== nextProps.location.pathname ) {
      this.resetChannels();
      this.registerPlayerSources(nextProps);
      return
    }
  }

  /*
    * validates the player sources against the source details from youtube or twitch
    * if there is an invalid source, re-route to a path with only valid sources
    */
  resetIfInvalidPlayerSource(nextProps) {
    const sourceType = nextProps.sourceType;

    if ( nextProps.twitchChannels.length > 0 ) {
      
      // check for channels change
      const oldChannelIds = this.props.twitchChannels.map( channel => channel.id );
      const newChannelIds = nextProps.twitchChannels.map( channel => channel.id );

      if ( !compareArrays(oldChannelIds, newChannelIds) ) {
        // console.log('props.twitchChannels updated', oldChannelIds, newChannelIds)

        if ( !compareArrays(newChannelIds, this.props.sources) ) {
          let pathname = '/'+ sourceType + '/' + newChannelIds.join('/');
          this.context.router.history.push(pathname);
          return;
        }
        // console.log(this.state.playerSources);
      }

    }
    
    if ( nextProps.youtubeVideos.length > 0 ) {
        
      // check for channels change
      const oldVideoIds = this.props.youtubeVideos.map( video => video.id );
      const newVideoIds = nextProps.youtubeVideos.map( video => video.id );

      if ( !compareArrays(oldVideoIds, newVideoIds) ) {

        if ( !compareArrays(newVideoIds, this.props.sources) ) {
          let pathname = '/'+ sourceType + '/' + newVideoIds.join('/');
          this.context.router.history.push(pathname);
          return;
        }
        // console.log(this.state.playerSources);
      }

    }
  }

  /*
    * updates state.loaded when the channel details have been loaded from youtube or twitch
    */
  setLoadedOnChannelDetailsLoad(sourceType, nextProps) {
    
    if ( nextProps.twitchChannelDetails.length > 0 ) {

      // check for channel details change
      const oldChannelDetails = this.props.twitchChannelDetails.map( channelDetails => channelDetails.id );
      const newChannelDetails = nextProps.twitchChannelDetails.map( channelDetails => channelDetails.id );

      if ( !compareArrays(oldChannelDetails, newChannelDetails) ) {

        if ( newChannelDetails.length > 0 ) {
          this.props.setPlayerLoaded(true)
          this.props.setRecentChannelsItem(sourceType, nextProps.twitchChannelDetails);
        }
      }

    }
    
    if ( nextProps.youtubeChannelDetails.length > 0 ) {

      // check for channel details change
      const oldChannelDetails = this.props.youtubeChannelDetails.map( channelDetails => channelDetails.id );
      const newChannelDetails = nextProps.youtubeChannelDetails.map( channelDetails => channelDetails.id );

      if ( !compareArrays(oldChannelDetails, newChannelDetails) ) {

        if ( newChannelDetails.length > 0 ) {
          this.props.setPlayerLoaded(true)
          this.props.setRecentChannelsItem(sourceType, nextProps.youtubeChannelDetails);
        }
      }

    }
    
  }

  /*
    * updates Redux store to reset channel and channel details for twitch and youtube
    */
  resetChannels() {
    // console.log('reset channels')
    if ( this.props.match.params.sourceType === 'tw' ) {
      this.props.resetTwitchChannel();
      this.props.resetTwitchChannelDetails();
    }
    if ( this.props.match.params.sourceType === 'yt' ) {
      this.props.resetYoutubeVideos();
      this.props.resetYoutubeChannelDetails();
    }
    this.setState( {channelsRequested: false, playerSources: []})
  }
  
  render() {
    return (
      null
    )
  }
}

const mapStateToProps = state => {
  return {
    recentActivity: state.recentChannels.recentChannels,

    channelDetails: state.channelsList.channelDetails,

    twitchChannels: state.twitchDetails.channels,
    twitchChannelDetails: state.twitchDetails.channelDetails,

    youtubeLoggedIn: state.youtubeOauth.loggedIn,
    youtubeVideos: state.youtubeDetails.videos,
    youtubeChannelDetails: state.youtubeDetails.channelDetails,
    
    sourceType: state.player.sourceType,
    sources: state.player.sources,
    loaded: state.player.loaded,
  }
}

const mapDispatchToProps = dispatch => ({
  setRecentChannelsItem: (source, channelDetails) => dispatch(setRecentChannelsItem(source, channelDetails)),

  setChannelIds: (sourceType, channelIds) => dispatch(setChannelIds(sourceType, channelIds)),

  resetTwitchChannel: () => dispatch(resetTwitchChannel()),
  resetTwitchChannelDetails: () => dispatch(resetTwitchChannelDetails()),

  resetYoutubeVideos: () => dispatch(resetYoutubeVideos()),
  resetYoutubeChannelDetails: () => dispatch(resetYoutubeChannelDetails()),
  getYoutubeLoginStatus: () => dispatch(getYoutubeLoginStatus()),

  setMessage: (message) => dispatch(setMessage(message)),

  playerOpen: () => dispatch(playerOpen()),
  playerClose: () => dispatch(playerClose()),
  playerMinimize: () => dispatch(playerMinimize()),
  playerSources: (sourceType, sources) => dispatch(playerSources(sourceType, sources)),
  setPlayerLoaded: (loaded) => dispatch(setPlayerLoaded(loaded)),
})

PlayerPage.propTypes = {
  history: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerPage);