import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { setRecentChannelsItem } from '../../Redux/RecentChannels/RecentChannelsActionCreators';
// import { getTwitchChannel, resetTwitchChannel, resetTwitchChannelDetails } from '../../Redux/Twitch/TwitchActionCreators';
// import { getYoutubeChannel, resetYoutubeChannel, resetYoutubeChannelDetails, getYoutubeLoginStatus } from '../../Redux/Youtube/YoutubeActionCreators';
// import { setMessage } from '../../Redux/Messages/MessagesActionCreators';

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

      hideChat: false,
      hideChannelsList: false,
      isFullscreen: false,
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    // console.log('componentWillMount', this.props);
    // this.registerPlayerSources(this.props);
    // this.props.getYoutubeLoginStatus();
  }
  
  componentWillUnmount() {
    // console.log('unmounting');
    // this.resetChannels();
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
    const sourceType = this.props.sourceType;
    // const { loaded, playerSources, hideChannelsList, isFullscreen } = this.state;
    const { hideChannelsList, isFullscreen } = this.state;
    const playerLoaded = this.props.loaded;
    const playerSources = this.props.sources;

    // const playerChannels = ( source === 'tw' ) ? this.props.channels : ( source === 'yt' ? this.props.youtubeChannels : [] );
    const playerChannelDetails = ( sourceType === 'tw' ) ? this.props.channelDetails : ( sourceType === 'yt' ? this.props.youtubeChannelDetails : [] );
    
    if ( !playerLoaded ) {
      return (
        <PlayerLoadingWrapper />
      )
    } else {
      return (
        <div className="player-main-container">
          <PlayerWrapper
            source={sourceType}
            playerSources={playerSources}
            playerChannelDetails={playerChannelDetails}
            hideChannelsList={hideChannelsList}
            isFullscreen={isFullscreen}
            onFullScreenChange={this.onFullScreenChange}
          ></PlayerWrapper>
        </div>
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
    // recentActivity: state.recentChannels.recentChannels,
    channels: state.twitchDetails.channels,
    channelDetails: state.twitchDetails.channelDetails,
    // youtubeLoggedIn: state.youtubeOauth.loggedIn,
    youtubeChannels: state.youtubeDetails.channels,
    youtubeChannelDetails: state.youtubeDetails.channelDetails,
    sourceType: state.player.sourceType,
    sources: state.player.sources,
    loaded: state.player.loaded
  }
}

const mapDispatchToProps = dispatch => ({
  // setRecentChannelsItem: (source, channelDetails) => dispatch(setRecentChannelsItem(source, channelDetails)),

  // getTwitchChannel: (channels) => dispatch(getTwitchChannel(channels)),
  // resetTwitchChannel: () => dispatch(resetTwitchChannel()),
  // resetTwitchChannelDetails: () => dispatch(resetTwitchChannelDetails()),

  // getYoutubeChannel: (channels) => dispatch(getYoutubeChannel(channels)),
  // resetYoutubeChannel: () => dispatch(resetYoutubeChannel()),
  // resetYoutubeChannelDetails: () => dispatch(resetYoutubeChannelDetails()),
  // getYoutubeLoginStatus: () => dispatch(getYoutubeLoginStatus()),

  // setMessage: (message) => dispatch(setMessage(message)),
})

Player.propTypes = {
  history: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);

