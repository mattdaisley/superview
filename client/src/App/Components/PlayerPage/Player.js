import React from 'react';
import Grid  from 'material-ui/Grid';
import { connect } from 'react-redux';

import { setRecentChannelsItem } from '../../Redux/RecentChannels/RecentChannelsActionCreators';

import PlayerControls     from './PlayerControls/PlayerControls';
import PlayerChannelsList from './PlayerChannelsList';
import EmbedPlayer        from './EmbedPlayer';
import TwitchChat         from '../../Components/Twitch/TwitchChat';

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

class Player extends React.Component {
  
  constructor(props) {
    super(props);

    this.onFullScreenChange = this.onFullScreenChange.bind(this);
    
    this.state = {
      hideChat: false,
      hideChannelsList: false
    }
  }

  componentWillMount() {
    let activityItem = recentActivity.filter( (item) => {
      return item.route === this.props.location.pathname
    });
    this.props.setRecentChannelsItem(activityItem[0]);
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
        hideChat: !prevState.hideChat,
        hideChannelsList: !prevState.hideChannelsList
      };
    });
  }

  render() {

    const channelsMap = [
      {
        type: 'tw',
        name: 'BdoubleO',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/517b7b22d24c1849-profile_image-300x300.png'
      },
      {
        type: 'tw',
        name: 'wolvesatmydoor',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/504ced8a97f2f6a5-profile_image-300x300.png'
      },
      {
        type: 'yt',
        name: 'Northernlion',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/northernlion-profile_image-24031606a8e430c3-300x300.png'
      },
      {
        type: 'tw',
        name: 'Northernlion',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/northernlion-profile_image-24031606a8e430c3-300x300.png'
      },
      {
        type: 'yt',
        name: 'Last_Grey_Wolf',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/0434b290530af95a-profile_image-300x300.png'
      },
      {
        type: 'tw',
        name: 'Last_Grey_Wolf',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/0434b290530af95a-profile_image-300x300.png'
      },
      {
        type: 'yt',
        name: 'DanGheesling',
        channelThumb: 'https://yt3.ggpht.com/-Okp3KzEB6xc/AAAAAAAAAAI/AAAAAAAAAAA/AkWCDXngQjs/s176-c-k-no-mo-rj-c0xffffff/photo.jpg'
      },
      {
        type: 'tw',
        name: 'DanGheesling',
        channelThumb: 'https://yt3.ggpht.com/-Okp3KzEB6xc/AAAAAAAAAAI/AAAAAAAAAAA/AkWCDXngQjs/s176-c-k-no-mo-rj-c0xffffff/photo.jpg'
      },
      {
        type: 'yt',
        name: 'michaelalfox',
        channelThumb: 'https://yt3.ggpht.com/-MgNHVOdUNEE/AAAAAAAAAAI/AAAAAAAAAAA/oQBTxr6rOQc/s176-c-k-no-mo-rj-c0xffffff/photo.jpg'
      },
      {
        type: 'tw',
        name: 'michaelalfox',
        channelThumb: 'https://yt3.ggpht.com/-MgNHVOdUNEE/AAAAAAAAAAI/AAAAAAAAAAA/oQBTxr6rOQc/s176-c-k-no-mo-rj-c0xffffff/photo.jpg'
      },
      {
        type: 'tw',
        name: 'Grimmmz',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/grimmmz-profile_image-b6c4dd27a4b900a3-300x300.png'
      },
      {
        type: 'tw',
        name: 'Anthony_Kongphan',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/anthony_kongphan-profile_image-779ae9619d16e5d4-300x300.png'
      },
      {
        type: 'tw',
        name: 'DrDisRespectLive',
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/drdisrespectlive-profile_image-abc1fc67d2ea1ae1-300x300.png'
      },
    ]

    const channels = channelsMap.filter( (channel) => {
      if ( channel.type === this.props.match.params.source ) {
        
        let name = channel.name.toLowerCase();
        let params = this.props.match.params;
        if ( params.id && params.id.toLowerCase() === name ) return true;
        if ( params.id2 && params.id2.toLowerCase() === name ) return true;
        if ( params.id3 && params.id3.toLowerCase() === name ) return true;
        if ( params.id4 && params.id4.toLowerCase() === name ) return true;
      }
      return false;
    });

    let {source, id} = this.props.match.params;
    let {hideChannelsList} = this.state;

    return (
      <div id="player-wrapper" className="Player-wrapper flex">
        <Grid container spacing={0} direction="row" className="Player-container flex-item">
          
          <Grid item xs={12}>
            <Grid container spacing={0} justify="center" direction="row" className="Player-container">
              
              { !!(this.props.match.params.id && !this.props.match.params.id2) &&
                <Grid item xs={12}>
                  <div className="Player flex-item">
                    <EmbedPlayer
                      source={this.props.match.params.source}
                      id={this.props.match.params.id}
                    />
                  </div>
                </Grid>
              }
              
              { !!(this.props.match.params.id && this.props.match.params.id2) &&
                <Grid item xs={12} md={6}>
                  <div className="Player flex-item">
                    <EmbedPlayer
                      source={this.props.match.params.source}
                      id={this.props.match.params.id}
                    />
                  </div>
                </Grid>
              }
              { !!(this.props.match.params.id2) &&
                <Grid item xs={12} md={6}>
                  <div className="Player flex-item">
                  <EmbedPlayer
                    source={this.props.match.params.source}
                    id={this.props.match.params.id2}
                  />
                  </div>
                </Grid>
              }
            </Grid>
          </Grid>

          { !!(this.props.match.params.id3 || this.props.match.params.id4 ) &&
              <Grid item xs={12}>

                <Grid container spacing={0} justify="center" direction="row" className="Player-container">
                  { !!(this.props.match.params.id3 && !this.props.match.params.id4) &&
                    <Grid item xs={12}>
                      <div className="Player flex-item">
                      <EmbedPlayer
                        source={this.props.match.params.source}
                        id={this.props.match.params.id3}
                      />
                      </div>
                    </Grid>
                  }
                  { !!(this.props.match.params.id3 && this.props.match.params.id4 ) &&
                    <Grid item xs={12} md={6}>
                      <div className="Player flex-item">
                      <EmbedPlayer
                        source={this.props.match.params.source}
                        id={this.props.match.params.id3}
                      />
                      </div>
                    </Grid>
                  }
                  { !!(this.props.match.params.id4) &&
                    <Grid item xs={12} md={6}>
                      <div className="Player flex-item">
                      <EmbedPlayer
                        source={this.props.match.params.source}
                        id={this.props.match.params.id4}
                      />
                      </div>
                    </Grid>
                  }
                </Grid>

              </Grid>
            }

        </Grid>

        { !!(source === 'tw') &&
          <div style={{width: '400px', height:'100%', backgroundColor: '#ccc', border: '1px solid #ccc', boxSizing: 'border-box'}} className={'flex-item hidden-'+hideChannelsList}>
            <TwitchChat id={id}/>
          </div>
        }

        <PlayerChannelsList channels={channels} className={'hidden-'+hideChannelsList}/>

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
    recentActivity: state.recentChannels.recentChannels
  }
}

const mapDispatchToProps = dispatch => ({
  setRecentChannelsItem: (item) => dispatch(setRecentChannelsItem(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);

