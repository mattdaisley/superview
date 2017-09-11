import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setRecentChannelsItem } from '../../Redux/RecentChannels/RecentChannelsActionCreators';
import { getTwitchChannel, resetTwitchChannel, resetTwitchChannelDetails } from '../../Redux/Twitch/TwitchActionCreators';
import { getYoutubeChannel, resetYoutubeChannel, resetYoutubeChannelDetails } from '../../Redux/Youtube/YoutubeActionCreators';
import { setMessage } from '../../Redux/Messages/MessagesActionCreators';

import PlayerControls     from './PlayerControls/PlayerControls';
import PlayerChannelsList from './PlayerChannelsList';
import EmbedPlayer        from './EmbedPlayer';
import TwitchChat         from '../../Components/Twitch/TwitchChat';

import './Player.css';


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
  

  registerPlayerSources(props) {
    const { source } = props.match.params;

    let videoIds = this.getVideoIds(props.match.params);
    let uniqueVideoIds = this.getUniqueVideoIds(props.match.params);
    if ( !this.compareArrays(videoIds, uniqueVideoIds) ) {
      let pathname = '/'+source + '/' + uniqueVideoIds.join('/');
      this.context.router.history.push(pathname);
    }

    // console.log('registerPlayerSources, uniqueVideoIds:', uniqueVideoIds);
    this.setState( {channelsRequested: true, playerSources: uniqueVideoIds} );
    
    if ( source === 'tw' ) props.getTwitchChannel(uniqueVideoIds);
    if ( source === 'yt' ) props.getYoutubeChannel(uniqueVideoIds);
  }
  
  getVideoIds( params ) {
    return Object.keys(params).map( key => ( key === 'source' ) ? undefined : params[key] ).filter( item => item !== undefined )
  }

  getUniqueVideoIds( params ) {
    return this.getVideoIds(params).filter( (elem, pos, arr) => arr.indexOf(elem) === pos )
  }

  compareArrays(arr1, arr2) {
    if ( arr1.length !== arr2.length ) return false;
    
    for (let index = 0; index < arr1.length; index++) {
      // console.log('compareArrays', arr1[index], arr2[index], arr2.indexOf(arr1[index]))
      if ( arr2.indexOf(arr1[index]) === -1 ) return false;
    }
    return true;
  }


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

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate', prevProps, this.props);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', this.props, nextProps);

    const { source } = nextProps.match.params;

    // check for pathname change
    // console.log('componentWillReceiveProps', this.props.location.pathname, nextProps.location.pathname, this.props.location.pathname !== nextProps.location.pathname);
    if ( this.props.location.pathname !== nextProps.location.pathname ) {
      // console.log('new path');
      this.resetChannels();
      this.registerPlayerSources(nextProps);
      return;
    }


    if ( nextProps.channels.length > 0 ) {
        
      // check for channels change
      const oldChannelIds = this.props.channels.map( channel => channel.id );
      const newChannelIds = nextProps.channels.map( channel => channel.id );

      if ( !this.compareArrays(oldChannelIds, newChannelIds) ) {
        // console.log('props.channels updated', oldChannelIds, newChannelIds)

        if ( !this.compareArrays(newChannelIds, this.state.playerSources) ) {
          let pathname = '/'+ source + '/' + newChannelIds.join('/');
          // console.log('new pathname', pathname);
          this.context.router.history.push(pathname);
          return;
        }
        // console.log(this.state.playerSources);
      }

    }

    if ( nextProps.channelDetails.length > 0 ) {

      // check for channel details change
      const oldChannelDetails = this.props.channelDetails.map( channelDetails => channelDetails.id );
      const newChannelDetails = nextProps.channelDetails.map( channelDetails => channelDetails.id );

      if ( !this.compareArrays(oldChannelDetails, newChannelDetails) ) {
        // console.log('props.newChannelDetails updated', oldChannelDetails, newChannelDetails)
        if ( newChannelDetails.length > 0 ) {
          this.setState( {loaded: true} )
        }
      }

    }

    if ( source === 'yt' && !this.props.youtubeLoggedIn ) {
      this.setState( {loaded: true });
      return;
    }


    if ( nextProps.youtubeChannels.length > 0 ) {
        
      // check for channels change
      const oldChannelIds = this.props.youtubeChannels.map( channel => channel.id );
      const newChannelIds = nextProps.youtubeChannels.map( channel => channel.id );

      if ( !this.compareArrays(oldChannelIds, newChannelIds) ) {
        // console.log('props.channels updated', oldChannelIds, newChannelIds)

        if ( !this.compareArrays(newChannelIds, this.state.playerSources) ) {
          let pathname = '/'+ source + '/' + newChannelIds.join('/');
          // console.log('new pathname', pathname);
          this.context.router.history.push(pathname);
          return;
        }
        // console.log(this.state.playerSources);
      }

    }
    
    if ( nextProps.youtubeChannelDetails.length > 0 ) {

      // check for channel details change
      const oldChannelDetails = this.props.youtubeChannelDetails.map( channelDetails => channelDetails.id );
      const newChannelDetails = nextProps.youtubeChannelDetails.map( channelDetails => channelDetails.id );

      if ( !this.compareArrays(oldChannelDetails, newChannelDetails) ) {
        // console.log('props.newChannelDetails updated', oldChannelDetails, newChannelDetails)
        if ( newChannelDetails.length > 0 ) {
          this.setState( {loaded: true} )
        }
      }

    }
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

  getLoadingWrapper() {
    return (
      <div className="Player-wrapper">
        <div className="player-loading">Loading channel(s)</div>
      </div>
    )
  }

  getErrorWrapper() {
    return (
      <div className="Player-wrapper">
        <div className="player-loading">Error loading channels</div>
      </div>
    )
  }

  getLayout( videoIds ) {
    switch(videoIds.length) {
      case 6: return 10;
      case 5: return 7;
      case 4: return 5;
      case 3: return 3;
      case 2: return 1;
      case 1:
      default:
        return 0;
    }
  }
  

  getPlayerWrapper(validAndUniqueVideoIds, playerChannelDetails) {
    // console.log('in getPlayerWrapper');
    const { params } = this.props.match;
    const { source } = params;
    const { hideChannelsList, isFullscreen } = this.state;

    const layout = this.getLayout(validAndUniqueVideoIds);
    const fullscreenClass = (isFullscreen) ? 'fullscreen' : '';

    // build the embed player elements to display
    const embedPlayers = validAndUniqueVideoIds.map( (videoId, index) => {
      // console.log('embedPlayer', source, videoId);
      return (
        <EmbedPlayer
          key={videoId}
          className={['layout' + layout,'player' + index, fullscreenClass].join(' ')}
          source={source}
          id={videoId} 
        />
      )
    })


    const showPlayerChannelsList = () => {
      if ( source === 'yt' && !!this.props.youtubeLoggedIn ) return true;
      if ( source === 'tw' && !!this.state.loaded ) return true;
      return false;
    }
    
    return (
      <div id="player-wrapper" className={['Player-wrapper','flex',fullscreenClass].join(' ')}>

      
        {/* <div>{this.props.channels ? (this.props.channels[0] ? this.props.channels[0].name : '') : ''}</div> */}
        {/* <div>{this.props.channelDetails ? (this.props.channelDetails[0] ? this.props.channelDetails[0].game : '') : ''}</div> */}

        <div className={['Player-container','flex-item',fullscreenClass].join(' ')}>
          { !!this.state.loaded && embedPlayers}
        </div>

        { !!(source === 'tw') && !!this.state.loaded && 
          <TwitchChat hideChannelsList={hideChannelsList} id={this.props.match.params.id1}/>
        }

        { showPlayerChannelsList() && !!this.state.loaded && 
          <PlayerChannelsList channels={playerChannelDetails} className={'hidden-'+hideChannelsList}/>
        }

        <PlayerControls fullscreenContainer={'player-wrapper'} onFullScreenChange={this.onFullScreenChange}/>   
      </div>
    )
  }

  render() {
    const { params } = this.props.match;
    const { source } = params;
    const { loaded, playerSources } = this.state;

    const playerChannels = ( source === 'tw' ) ? this.props.channels : ( source === 'yt' ? this.props.youtubeChannels : [] );
    const playerChannelDetails = ( source === 'tw' ) ? this.props.channelDetails : ( source === 'yt' ? this.props.youtubeChannelDetails : [] );
    
    
    if ( !loaded )
      return this.getLoadingWrapper();

    return this.getPlayerWrapper(playerSources, playerChannelDetails)
    

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

