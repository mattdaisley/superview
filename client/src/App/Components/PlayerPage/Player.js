import React from 'react';
import { connect } from 'react-redux';

import { setRecentChannelsItem } from '../../Redux/RecentChannels/RecentChannelsActionCreators';
import { getTwitchChannel } from '../../Redux/PlayerDetails/PlayerDetailsActionCreators';

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
    
    const ids = Object.keys(this.props.match.params).filter( (key) => key.substring(0,2) === 'id' && this.props.match.params[key] !== undefined );
    let layout;
    switch(ids.length) {
      case 6:
        layout = 10;
        break;
      case 5:
        layout = 7;
        break;
      case 4: 
        layout = 5;
        break;
      case 3:
        layout = 3;
        break;
      case 2:
        layout = 1;
        break;
      case 1:
      default:
        layout = 0;
        break;
    }

    this.state = {
      hideChat: false,
      hideChannelsList: false,
      isFullscreen: false,
      layout: layout,
      ids: ids
    }
  }

  componentWillMount() {
    let channels = this.props.location.pathname.substring(4).split('/').filter( item => item !== '' );
    this.props.getTwitchChannel(channels);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', this.props, nextProps);
    if ( this.props.channelDetails !== nextProps.channelDetails ) {
      // console.log(this.props);
      // console.log('componentWillReceiveProps', nextProps.channelDetails);
      let recentActivityItem;

      if ( nextProps.channelDetails.length > 0 ) {
        let multiTitle = (this.props.match.params.source === 'tw') ? 'stream' : 'tube';
        let title = (this.props.channels.length > 1) ? 'Multi-' + multiTitle : nextProps.channelDetails[0].channel.status
        recentActivityItem = {
          type: nextProps.match.params.source,
          title: title,
          route: this.props.location.pathname,
          channels: nextProps.channelDetails.map( channelDetails => {
            // console.log(channelDetails)
            return {name: channelDetails.channel.display_name, channelThumb: channelDetails.channel.logo}
          }),
        }
        if ( this.props.channels.length === 1 ) {
          recentActivityItem.thumb = {
            width: 160,
            height: 90,
            url: nextProps.channelDetails[0].preview.medium
          }
        }
      } else {
        recentActivityItem = {
          type: nextProps.match.params.source,
          title: 'Offline',
          route: this.props.location.pathname,
          channels: this.props.channels.map( channel => {
            // console.log(channel)
            return {name: channel.display_name, channelThumb: channel.logo}
          }),
        }
      }
      nextProps.setRecentChannelsItem(recentActivityItem);
    }
  }

  onFullScreenChange() {
    console.log('Player onFullscreenChange');
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      let element = document.getElementById('player-wrapper');
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    this.setState((prevState, props) => {
      return {
        isFullscreen: !prevState.isFullscreen,
        hideChat: !prevState.hideChat,
        hideChannelsList: !prevState.hideChannelsList
      };
    });
  }

  render() {

    let {source} = this.props.match.params;
    let {hideChannelsList, layout} = this.state;
    let fullscreenClass = (this.state.isFullscreen) ? 'fullscreen' : '';
    let players = this.state.ids.map( (id, index) => {
      return (
        <EmbedPlayer
          key={index}
          className={['layout' + layout,'player' + index, fullscreenClass].join(' ')}
          source={this.props.match.params.source}
          id={this.props.match.params[id]} 
        />
      )
    })

    return (
      <div id="player-wrapper" className={['Player-wrapper','flex',fullscreenClass].join(' ')}>
      
        {/* <div>{this.props.channels ? (this.props.channels[0] ? this.props.channels[0].name : '') : ''}</div> */}
        {/* <div>{this.props.channelDetails ? (this.props.channelDetails[0] ? this.props.channelDetails[0].game : '') : ''}</div> */}

        <div className={['Player-container','flex-item',fullscreenClass].join(' ')}>
          {players}
        </div>

        { !!(source === 'tw') &&
          <TwitchChat hideChannelsList={hideChannelsList} id={this.props.match.params.id1}/>
        }

        <PlayerChannelsList channels={this.props.channels} className={'hidden-'+hideChannelsList}/>
        <PlayerControls onFullScreenChange={this.onFullScreenChange}/>   
      </div>
    );
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
  }
}

const mapDispatchToProps = dispatch => ({
  setRecentChannelsItem: (item) => dispatch(setRecentChannelsItem(item)),
  getTwitchChannel: (channels) => dispatch(getTwitchChannel(channels)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);

