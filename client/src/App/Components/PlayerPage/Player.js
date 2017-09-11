import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setRecentChannelsItem } from '../../Redux/RecentChannels/RecentChannelsActionCreators';
import { getTwitchChannel, resetTwitchChannel, resetTwitchChannelDetails } from '../../Redux/Twitch/TwitchActionCreators';
import { getYoutubeChannel, resetYoutubeChannel, resetYoutubeChannelDetails } from '../../Redux/Youtube/YoutubeActionCreators';
import { setMessage } from '../../Redux/Messages/MessagesActionCreators';

import PlayerWrapper        from './PlayerWrapper';
import PlayerLoadingWrapper from './PlayerLoadingWrapper';

import './Player.css';

import PlayerUtils from './PlayerUtils';


class Player extends React.Component {
  
  constructor(props) {
    super(props);

    this.onFullScreenChange = this.onFullScreenChange.bind(this);
    
    this.state = {
      loaded: false,
      playerSources: [],
      channelsRequested: false,

      hideChat: false,
      hideChannelsList: false,
      isFullscreen: false,
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.registerPlayerSources(this.props);
  }
  
  componentWillUnmount() {
    // console.log('unmounting');
    this.resetChannels();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', this.props, nextProps);
    const { source } = nextProps.match.params;

    if ( this.resetIfNewPathname(nextProps) ) return;
    if ( this.resetIfInvalidPlayerSource(nextProps) ) return;
    
    if ( source === 'yt' && !this.props.youtubeLoggedIn ) {
      this.setState( {loaded: true });
      return;
    }

    this.setLoadedOnChannelDetailsLoad(source, nextProps)
  }
  
  /*
   * handles re-routing if duplicate sources
   * handles getting source details from youtube or twitch
   */ 
  registerPlayerSources(props) {
    const { source } = props.match.params;

    let videoIds       = PlayerUtils.getVideoIds(props.match.params);
    let uniqueVideoIds = PlayerUtils.getUniqueVideoIds(props.match.params);

    if ( this.reRouteIfDuplicateSources(source, videoIds, uniqueVideoIds) ) return;

    this.setState( {channelsRequested: true, playerSources: uniqueVideoIds} );
    if ( source === 'tw' ) props.getTwitchChannel(uniqueVideoIds);
    if ( source === 'yt' ) props.getYoutubeChannel(uniqueVideoIds);
  }

  /*
   * compares a list of video ids with that last filtered to only unique items
   * if the video ids contain duplicates, re route to a path with only the unique video ids
   */
  reRouteIfDuplicateSources(source, videoIds, uniqueVideoIds) {
    if ( !PlayerUtils.compareArrays(videoIds, uniqueVideoIds) ) {
      let pathname = '/'+source + '/' + uniqueVideoIds.join('/');
      this.context.router.history.push(pathname);
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
    const { source } = nextProps.match.params;

    if ( nextProps.channels.length > 0 ) {
        
      // check for channels change
      const oldChannelIds = this.props.channels.map( channel => channel.id );
      const newChannelIds = nextProps.channels.map( channel => channel.id );

      if ( !PlayerUtils.compareArrays(oldChannelIds, newChannelIds) ) {
        // console.log('props.channels updated', oldChannelIds, newChannelIds)

        if ( !PlayerUtils.compareArrays(newChannelIds, this.state.playerSources) ) {
          let pathname = '/'+ source + '/' + newChannelIds.join('/');
          // console.log('new pathname', pathname);
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
        // console.log('props.channels updated', oldChannelIds, newChannelIds)

        if ( !PlayerUtils.compareArrays(newChannelIds, this.state.playerSources) ) {
          let pathname = '/'+ source + '/' + newChannelIds.join('/');
          // console.log('new pathname', pathname);
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
  setLoadedOnChannelDetailsLoad(source, nextProps) {
    
    if ( nextProps.channelDetails.length > 0 ) {

      // check for channel details change
      const oldChannelDetails = this.props.channelDetails.map( channelDetails => channelDetails.id );
      const newChannelDetails = nextProps.channelDetails.map( channelDetails => channelDetails.id );

      if ( !PlayerUtils.compareArrays(oldChannelDetails, newChannelDetails) ) {

        if ( newChannelDetails.length > 0 ) {
          this.setState( {loaded: true} )
          this.props.setRecentChannelsItem(source, nextProps.channels, nextProps.channelDetails);
        }
      }

    }
    
    if ( nextProps.youtubeChannelDetails.length > 0 ) {

      // check for channel details change
      const oldChannelDetails = this.props.youtubeChannelDetails.map( channelDetails => channelDetails.id );
      const newChannelDetails = nextProps.youtubeChannelDetails.map( channelDetails => channelDetails.id );

      if ( !PlayerUtils.compareArrays(oldChannelDetails, newChannelDetails) ) {

        if ( newChannelDetails.length > 0 ) {
          this.setState( {loaded: true} )
          this.props.setRecentChannelsItem(source, nextProps.youtubeChannels, nextProps.youtubeChannelDetails);
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

  onFullScreenChange() {
    this.setState((prevState, props) => {
      return {
        isFullscreen: !prevState.isFullscreen,
        hideChat: !prevState.hideChat,
        hideChannelsList: !prevState.hideChannelsList
      };
    });
  }

  render() {
    const { source } = this.props.match.params;
    const { loaded, playerSources, hideChannelsList, isFullscreen } = this.state;

    const playerChannels = ( source === 'tw' ) ? this.props.channels : ( source === 'yt' ? this.props.youtubeChannels : [] );
    const playerChannelDetails = ( source === 'tw' ) ? this.props.channelDetails : ( source === 'yt' ? this.props.youtubeChannelDetails : [] );
    
    if ( !loaded ) {
      return (
        <PlayerLoadingWrapper />
      )
    } else {
      return (
        <PlayerWrapper
          source={source}
          playerSources={playerSources}
          playerChannelDetails={playerChannelDetails}
          hideChannelsList={hideChannelsList}
          isFullscreen={isFullscreen}
          onFullScreenChange={this.onFullScreenChange}
        ></PlayerWrapper>
      )
    }

  }
  
   _onReady(event) {
     // access to player in all event handlers via event.target 
     event.target.pauseVideo();
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
  }
}

const mapDispatchToProps = dispatch => ({
  setRecentChannelsItem: (source, channels, channelDetails) => dispatch(setRecentChannelsItem(source, channels, channelDetails)),

  getTwitchChannel: (channels) => dispatch(getTwitchChannel(channels)),
  resetTwitchChannel: () => dispatch(resetTwitchChannel()),
  resetTwitchChannelDetails: () => dispatch(resetTwitchChannelDetails()),

  getYoutubeChannel: (channels) => dispatch(getYoutubeChannel(channels)),
  resetYoutubeChannel: () => dispatch(resetYoutubeChannel()),
  resetYoutubeChannelDetails: () => dispatch(resetYoutubeChannelDetails()),

  setMessage: (message) => dispatch(setMessage(message)),
})

Player.propTypes = {
  history: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);

