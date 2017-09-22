import React     from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setRecentChannelsItem } from '../../Redux/RecentChannels/RecentChannelsActionCreators';
import { getTwitchChannel, resetTwitchChannel, resetTwitchChannelDetails } from '../../Redux/Twitch/TwitchActionCreators';
import { getYoutubeChannel, resetYoutubeChannel, resetYoutubeChannelDetails, getYoutubeLoginStatus } from '../../Redux/Youtube/YoutubeActionCreators';
import { setMessage } from '../../Redux/Messages/MessagesActionCreators';

import { playerOpen, playerClose, playerMinimize, playerSources, setPlayerLoaded }  from '../../Redux/Player/PlayerActionCreators';

import PlayerUtils from './PlayerUtils';

class PlayerOpener extends React.Component {
  
  static contextTypes = {
    router: PropTypes.object
  }
  
  componentDidMount() {
    this.props.playerOpen();
    // this.props.playerMinimize();
    this.registerPlayerSources(this.props);
  }
  
  componentWillUnmount() {
    console.log('calling playerMinimize');
    this.props.playerMinimize();
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.sourceType, this.props.sources, nextProps.sources);
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
    const sourceType = props.match.params.source;

    let videoIds       = PlayerUtils.getVideoIds(props.match.params);
    let uniqueVideoIds = PlayerUtils.getUniqueVideoIds(props.match.params);

    if ( this.reRouteIfDuplicateSources(sourceType, videoIds, uniqueVideoIds, this.context.router) ) return;
    console.log(uniqueVideoIds);

    // this.setState( {playerSources: uniqueVideoIds} );
    this.props.playerSources( sourceType, uniqueVideoIds )
    if ( sourceType === 'tw' ) props.getTwitchChannel(uniqueVideoIds);
    if ( sourceType === 'yt' && props.youtubeLoggedIn ) props.getYoutubeChannel(uniqueVideoIds);
    // if ( !props.youtubeLoggedIn ) 
  }

  /*
    * compares a list of video ids with that last filtered to only unique items
    * if the video ids contain duplicates, re route to a path with only the unique video ids
    */
  reRouteIfDuplicateSources(source, videoIds, uniqueVideoIds, history) {
    if ( !PlayerUtils.compareArrays(videoIds, uniqueVideoIds) ) {
      let pathname = '/'+source + '/' + uniqueVideoIds.join('/');
      history.push(pathname);
      return true; 
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
      return true;
    }
  }

  /*
    * validates the player sources against the source details from youtube or twitch
    * if there is an invalid source, re-route to a path with only valid sources
    */
  resetIfInvalidPlayerSource(nextProps) {
    const sourceType = nextProps.sourceType;

    if ( nextProps.channels.length > 0 ) {
      
      // check for channels change
      const oldChannelIds = this.props.channels.map( channel => channel.id );
      const newChannelIds = nextProps.channels.map( channel => channel.id );

      if ( !PlayerUtils.compareArrays(oldChannelIds, newChannelIds) ) {
        // console.log('props.channels updated', oldChannelIds, newChannelIds)

        if ( !PlayerUtils.compareArrays(newChannelIds, this.props.sources) ) {
          let pathname = '/'+ sourceType + '/' + newChannelIds.join('/');
          console.log('new pathname', pathname);
          this.context.router.history.push(pathname);
          return;
        }
        // console.log(this.state.playerSources);
      }

    }
    
    if ( nextProps.youtubeChannels.length > 0 ) {
        
      // check for channels change
      const oldChannelIds = this.props.youtubeChannels.map( channel => channel.id );
      const newChannelIds = nextProps.youtubeChannels.map( channel => channel.id );

      if ( !PlayerUtils.compareArrays(oldChannelIds, newChannelIds) ) {

        if ( !PlayerUtils.compareArrays(newChannelIds, this.props.sources) ) {
          let pathname = '/'+ sourceType + '/' + newChannelIds.join('/');
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
    
    if ( nextProps.channelDetails.length > 0 ) {

      // check for channel details change
      const oldChannelDetails = this.props.channelDetails.map( channelDetails => channelDetails.id );
      const newChannelDetails = nextProps.channelDetails.map( channelDetails => channelDetails.id );

      if ( !PlayerUtils.compareArrays(oldChannelDetails, newChannelDetails) ) {

        if ( newChannelDetails.length > 0 ) {
          this.props.setPlayerLoaded(true)
          this.props.setRecentChannelsItem(sourceType, nextProps.channelDetails);
        }
      }

    }
    
    if ( nextProps.youtubeChannelDetails.length > 0 ) {

      // check for channel details change
      const oldChannelDetails = this.props.youtubeChannelDetails.map( channelDetails => channelDetails.id );
      const newChannelDetails = nextProps.youtubeChannelDetails.map( channelDetails => channelDetails.id );

      if ( !PlayerUtils.compareArrays(oldChannelDetails, newChannelDetails) ) {

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
    if ( this.props.match.params.source === 'tw' ) {
      this.props.resetTwitchChannel();
      this.props.resetTwitchChannelDetails();
    }
    if ( this.props.match.params.source === 'yt' ) {
      this.props.resetYoutubeChannel();
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

    channels: state.twitchDetails.channels,
    channelDetails: state.twitchDetails.channelDetails,

    youtubeLoggedIn: state.youtubeOauth.loggedIn,
    youtubeChannels: state.youtubeDetails.channels,
    youtubeChannelDetails: state.youtubeDetails.channelDetails,
    
    sourceType: state.player.sourceType,
    sources: state.player.sources,
    loaded: state.player.loaded,
  }
}

const mapDispatchToProps = dispatch => ({
  setRecentChannelsItem: (source, channelDetails) => dispatch(setRecentChannelsItem(source, channelDetails)),

  getTwitchChannel: (channels) => dispatch(getTwitchChannel(channels)),
  resetTwitchChannel: () => dispatch(resetTwitchChannel()),
  resetTwitchChannelDetails: () => dispatch(resetTwitchChannelDetails()),

  getYoutubeChannel: (channels) => dispatch(getYoutubeChannel(channels)),
  resetYoutubeChannel: () => dispatch(resetYoutubeChannel()),
  resetYoutubeChannelDetails: () => dispatch(resetYoutubeChannelDetails()),
  getYoutubeLoginStatus: () => dispatch(getYoutubeLoginStatus()),

  setMessage: (message) => dispatch(setMessage(message)),

  playerOpen: () => dispatch(playerOpen()),
  playerClose: () => dispatch(playerClose()),
  playerMinimize: () => dispatch(playerMinimize()),
  playerSources: (sourceType, sources) => dispatch(playerSources(sourceType, sources)),
  setPlayerLoaded: (loaded) => dispatch(setPlayerLoaded(loaded)),
})

PlayerOpener.propTypes = {
  history: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerOpener);