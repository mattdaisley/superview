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

/*
const recentActivity = [
  {
    type: 'tw',
    title: 'The Northernlion Live Super Show!',
    route: '/tw/northernlion',
    thumb: {
      width: 160,
      height: 90,
      url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_northernlion-320x180.jpg'
    },
    channels: [
      {
        name: 'Northernlion',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/northernlion-profile_image-24031606a8e430c3-300x300.png'
      }
    ]
  },
  {
    type: 'tw',
    title: '5th 4th 3rd....',
    route: '/tw/bdoubleo',
    thumb: {
      width: 160,
      height: 90,
      url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_bdoubleo-320x180.jpg'
    },
    channels: [
      {
        name: 'BdoubleO',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/517b7b22d24c1849-profile_image-300x300.png'
      }
    ]
  },
  {
    type: 'tw',
    title: 'Anthony | 50% off Subs this Month !!! #FullSelloutMode',
    route: '/tw/Anthony_Kongphan',
    thumb: {
      width: 160,
      height: 90,
      url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_anthony_kongphan-320x180.jpg'
    },
    channels: [
      {
        name: 'Anthony_Kongphan',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/anthony_kongphan-profile_image-779ae9619d16e5d4-300x300.png'
      }
    ]
  },
  {
    type: 'tw',
    title: 'Multi-stream',
    route: '/tw/bdoubleo/wolvesatmydoor',
    channels: [
      {
        name: 'BdoubleO',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/517b7b22d24c1849-profile_image-300x300.png'
      },
      {
        name: 'wolvesatmydoor',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/504ced8a97f2f6a5-profile_image-300x300.png'
      }
    ]
  },
  {
    type: 'yt',
    title: 'Multi-tube',
    route: '/yt/e-Y4QLalzjw/U5kQq2P50QY',
    channels: [
      {
        name: 'Northernlion',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/northernlion-profile_image-24031606a8e430c3-300x300.png'
      },
      {
        name: 'DanGheesling',
        channelThumb: 'https://yt3.ggpht.com/-Okp3KzEB6xc/AAAAAAAAAAI/AAAAAAAAAAA/AkWCDXngQjs/s176-c-k-no-mo-rj-c0xffffff/photo.jpg'
      }
    ]
  },
  {
    type: 'yt',
    title: 'Multi-tube',
    route: '/yt/e-Y4QLalzjw/7m04pIMVAZY/U5kQq2P50QY/KKHmRFLs00g',
    channels: [
      {
        name: 'Northernlion',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/northernlion-profile_image-24031606a8e430c3-300x300.png'
      },
      {
        name: 'Last_Grey_Wolf',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/0434b290530af95a-profile_image-300x300.png'
      },
      {
        name: 'DanGheesling',
        channelThumb: 'https://yt3.ggpht.com/-Okp3KzEB6xc/AAAAAAAAAAI/AAAAAAAAAAA/AkWCDXngQjs/s176-c-k-no-mo-rj-c0xffffff/photo.jpg'
      },
      {
        name: 'michaelalfox',
        channelThumb: 'https://yt3.ggpht.com/-MgNHVOdUNEE/AAAAAAAAAAI/AAAAAAAAAAA/oQBTxr6rOQc/s176-c-k-no-mo-rj-c0xffffff/photo.jpg'
      }
    ]
  },
  {
    type: 'yt',
    title: 'Northernlion and Friends Play - PlayerUnknown\'s Battlegrounds - Episode 156',
    route: '/yt/s65A6QrScVI',
    thumb: {
      width: 120,
      height: 90,
      url: 'https://i.ytimg.com/vi/e-Y4QLalzjw/hqdefault.jpg'
    },
    channels: [
      {
        name: 'Northernlion',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/northernlion-profile_image-24031606a8e430c3-300x300.png'
      }
    ]
  },
  {
    type: 'tw',
    title: 'Multi-stream',
    route: '/tw/grimmmz/Anthony_Kongphan',
    channels: [
      {
        name: 'Grimmmz',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/grimmmz-profile_image-b6c4dd27a4b900a3-300x300.png'
      },
      {
        name: 'Anthony_Kongphan',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/anthony_kongphan-profile_image-779ae9619d16e5d4-300x300.png'
      }
    ]
  },
  {
    type: 'tw',
    title: '(!charity !topic !prime) Charity Chillin PUBG Wins:2...',
    route: '/tw/grimmmz',
    thumb: {
      width: 160,
      height: 90,
      url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_grimmmz-320x180.jpg'
    },
    channels: [
      {
        name: 'Grimmmz',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/grimmmz-profile_image-b6c4dd27a4b900a3-300x300.png'
      }
    ]
  },
  {
    type: 'tw',
    title: 'ttest',
    route: '/tw/armorra',
    thumb: {
      width: 160,
      height: 90,
      url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_armorra-320x180.jpg'
    },
    channels: [
      {
        name: 'armorra',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/armorra-profile_image-b6c4dd27a4b900a3-300x300.png'
      }
    ]
  },
  {
    type: 'tw',
    title: 'Multi-stream',
    route: '/tw/grimmmz/Anthony_Kongphan/DrDisRespectLive',
    channels: [
      {
        name: 'Grimmmz',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/grimmmz-profile_image-b6c4dd27a4b900a3-300x300.png'
      },
      {
        name: 'Anthony_Kongphan',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/anthony_kongphan-profile_image-779ae9619d16e5d4-300x300.png'
      },
      {
        name: 'DrDisRespectLive',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/drdisrespectlive-profile_image-abc1fc67d2ea1ae1-300x300.png'
      }
    ]
  }
]
*/

class Player extends React.Component {
  
  constructor(props) {
    super(props);

    this.onFullScreenChange = this.onFullScreenChange.bind(this);
    
    this.state = {
      loaded: (this.props.channels.length > 0) ? true : false,
      hideChat: false,
      hideChannelsList: false,
      isFullscreen: false,
      channelsRequested: false
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    // console.log(this.props);
    const { source } = this.props.match.params;

    if ( this.props.channels.length === 0 && source === 'tw' && !this.state.channelsRequested ) {
      let channels = this.props.location.pathname.substring(4).split('/').filter( item => item !== '' );
      this.setState({channelsRequested:true})
      this.props.getTwitchChannel(channels);
    }
    if ( this.props.youtubeLoggedIn && this.props.youtubeChannels.length === 0 && source === 'yt' && !this.state.channelsRequested ) {
      let channels = this.props.location.pathname.substring(4).split('/').filter( item => item !== '' );
      this.setState({channelsRequested:true})
      this.props.getYoutubeChannel(channels);
    }
    if ( !this.props.youtubeLoggedIn && source === 'yt' ) {
      this.props.setMessage({type: 'info', message: 'Log in to YouTube to view video details and channel info'})
    }


  }

  componentWillUnmount() {
    // console.log('unmounting');
    if ( this.props.match.params.source === 'tw' ) {
      this.props.resetTwitchChannel();
      this.props.resetTwitchChannelDetails();
    }
    if ( this.props.match.params.source === 'yt' ) {
      this.props.resetYoutubeChannel();
      this.props.resetYoutubeChannelDetails();
    }
    
  }

  componentWillReceiveProps(nextProps) {
    console.log('in componentWillRecieveProps', nextProps.youtubeChannels, nextProps.youtubeChannelDetails);
    const { source } = nextProps.match.params;

    let channels = nextProps.location.pathname.substring(4).split('/').filter( item => item !== '' );
    let uniqueChannels = channels.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

    // console.log('in componentWillReceiveProps', channels, uniqueChannels);
    // console.log('context', this.context);
    if ( uniqueChannels.length !== channels.length ) {
      // redirect route to view without duplicate channels
      let pathname = '/'+source + '/' + uniqueChannels.join('/');
      this.context.router.history.push(pathname);
      this.setState({loaded:false})
      console.log('history push', pathname);
    } else {
      // console.log(source, this.props);
      if ( source === 'tw' && !this.state.channelsRequested ) {
        this.setState({channelsRequested:true})
        this.props.getTwitchChannel(channels);
      }
      if ( source === 'tw' && this.props.channelDetails !== nextProps.channelDetails ) {
        this.setState({loaded:true})
        this.props.setRecentChannelsItem(source, nextProps.channels, nextProps.channelDetails);
      }
      if ( source === 'yt' && this.props.youtubeChannelDetails !== nextProps.youtubeChannelDetails ) {
        this.setState({loaded:true})
        this.props.setRecentChannelsItem(source, nextProps.youtubeChannels, nextProps.youtubeChannelDetails);
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

  getValidAndUniqueVideoIds( source, params, channels) {
    // list of unique video or channel id params
    let uniqueVideoIds = Object.keys(params)
      .map( key => ( key === 'source' ) ? undefined : params[key] )
      .filter( (elem, pos, arr) => arr.indexOf(elem) === pos )

    console.log('getValidAndUniqueVideoIds', uniqueVideoIds);
    // videoIds of channels/videos that had a matching api response item
    switch ( source ) {
      case 'tw':
        return this.validateTWChannelNames( uniqueVideoIds, channels );
      case 'yt':
        return this.validateYTVideoIds( uniqueVideoIds, channels );
    }

    return [];
  }

  validateTWChannelNames( uniqueVideoIds, channels ) {
    let arrChannelNames = this.props.channels.map( channel => channel.id.toLowerCase());
    // console.log('arrchannelnames', arrChannelNames);
    return uniqueVideoIds.filter( (videoId, index) => videoId !== undefined && arrChannelNames.indexOf(videoId.toLowerCase()) !== -1 );
  }

  validateYTVideoIds( uniqueVideoIds, videos ) {
    let arrVideoIds = videos.map( video => video.id );
    // console.log('in validateYTVideoIds', arrVideoIds, uniqueVideoIds);
    return uniqueVideoIds.filter( (videoId, index) => videoId !== undefined && arrVideoIds.indexOf(videoId) !== -1 );
    // return uniqueVideoIds.filter( videoId => videoId !== undefined );
  }

  getPlayerWrapper(validAndUniqueVideoIds, playerChannelDetails) {
    
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

    const showYoutubeLoginWarning = () => {
      if ( source === 'yt' && !!this.props.youtubeLoggedIn ) return true;
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

        { showPlayerChannelsList() && 
          <PlayerChannelsList channels={playerChannelDetails} className={'hidden-'+hideChannelsList}/>
        }

        <PlayerControls fullscreenContainer={'player-wrapper'} onFullScreenChange={this.onFullScreenChange}/>   
      </div>
    )
  }

  render() {
    const { params } = this.props.match;
    const { source } = params;
    
    const playerChannels = ( source === 'tw' ) ? this.props.channels : ( source === 'yt' ? this.props.youtubeChannels : [] );
    const playerChannelDetails = ( source === 'tw' ) ? this.props.channelDetails : ( source === 'yt' ? this.props.youtubeChannelDetails : [] );
    console.log('player render: playerChannels, playerChannelDetails', playerChannels, playerChannelDetails);
    // finally, determine if the channels are loading, had an error, or are loaded and ready for videos to be played
    if ( playerChannels.length === 0 || playerChannelDetails.length === 0) 
      return this.getLoadingWrapper();
    if ( playerChannels[0] && playerChannels.status === 'error' ) 
      return this.getErrorWrapper();
    if ( playerChannelDetails[0] && playerChannelDetails.status === 'error' ) 
      return this.getErrorWrapper();
    
    const validAndUniqueVideoIds = this.getValidAndUniqueVideoIds(source, params, playerChannels);
    // console.log(validAndUniqueVideoIds);
    // check if the existing path requests a video or channel that did not have a matching api response
    // if there was an invalid id/channel, redirect to a route with only the valid ids
    const pathname = '/'+source+'/'+validAndUniqueVideoIds.join('/');
    if ( pathname.toLowerCase() !== this.props.location.pathname.toLowerCase() ) {
      this.context.router.history.push(pathname);
      return (<div></div>)
    }

    // console.log('getting player');
    return this.getPlayerWrapper(validAndUniqueVideoIds, playerChannelDetails);

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

