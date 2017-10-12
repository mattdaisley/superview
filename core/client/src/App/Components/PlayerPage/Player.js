import React       from 'react';
import { connect } from 'react-redux';
import PropTypes   from 'prop-types';

import PlayerWrapper        from './PlayerWrapper';
import PlayerLoadingWrapper from './PlayerLoadingWrapper';
import PlayerChannelDetails from './PlayerChannelDetails/PlayerChannelDetails';

import { rateYoutubeVideo } from '../../Redux/Youtube/YoutubeActionCreators';

import './Styles/Player.css';


class Player extends React.Component {
  
  constructor(props) {
    super(props);

    this.onFullScreenChange = this.onFullScreenChange.bind(this);
    this.toggleLike    = this.toggleLike.bind(this);
    this.toggleDislike = this.toggleDislike.bind(this);
    
    this.state = {
      loaded: false,
      playerChannelDetails: [],

      hideChat: false,
      hideChannelsList: false,
      isFullscreen: false,
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.setState( {playerSources: this.props.playerSources} )
    // console.log('componentWillMount', this.props);
    // this.registerPlayerSources(this.props);
    // this.props.getYoutubeLoginStatus();
  }
  
  componentWillUnmount() {
    // console.log('unmounting');
    // this.resetChannels();
  }

  componentWillReceiveProps(nextProps) {
    const playerChannelDetails = ( nextProps.sourceType === 'tw' ) ? nextProps.twitchChannelDetails : ( nextProps.sourceType === 'yt' ? nextProps.youtubeChannelDetails : [] );
    this.setState( {playerChannelDetails: playerChannelDetails} )
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

  toggleLike(index) {
    let { playerChannelDetails } = this.state
    // console.log('liked', playerChannelDetails[index].id)
    this.props.rateYoutubeVideo(playerChannelDetails[index].id, 'like')
    playerChannelDetails[index].stats.likes ++;
    this.setState( { playerChannelDetails: playerChannelDetails } )
  }
  
  toggleDislike(index) {
    let { playerChannelDetails } = this.state
    // console.log('dislike', playerChannelDetails[index].id)
    this.props.rateYoutubeVideo(playerChannelDetails[index].id, 'dislike')
    playerChannelDetails[index].stats.dislikes ++;
    this.setState( { playerChannelDetails: playerChannelDetails } )
  }

  render() {
    const { sourceType, openState } = this.props;
    const { hideChannelsList, isFullscreen, playerChannelDetails } = this.state;
    const playerLoaded = this.props.loaded;
    const playerSources = this.props.sources;

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

          { (!isFullscreen && openState === 'open') && (
            <PlayerChannelDetails sourceType={sourceType} channelDetails={playerChannelDetails} />
          )}
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
    twitchChannels: state.twitchDetails.channels,
    twitchChannelDetails: state.twitchDetails.channelDetails,
    // youtubeLoggedIn: state.youtubeOauth.loggedIn,
    youtubeChannels: state.youtubeDetails.channels,
    youtubeChannelDetails: state.youtubeDetails.channelDetails,

    openState: state.player.openState,
    sourceType: state.player.sourceType,
    sources: state.player.sources,
    loaded: state.player.loaded
  }
}

const mapDispatchToProps = dispatch => ({
  rateYoutubeVideo: (videoId, rating) => dispatch(rateYoutubeVideo(videoId, rating)),

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

