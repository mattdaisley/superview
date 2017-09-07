import React from 'react';
import Grid  from 'material-ui/Grid';

import EmbedPlayer    from '../Components/EmbedPlayer';
import TwitchChat     from '../Components/TwitchChat';
import PlayerControls from '../Components/PlayerControls';
import PlayerChannelsList from '../Components/PlayerChannelsList';

class Player extends React.Component {
  
  constructor(props) {
    super(props);

    console.log(props);
    this.onFullScreenChange = this.onFullScreenChange.bind(this);
    
    this.state = {
      hideChat: false,
      hideChannelsList: false
    }
  }

  onFullScreenChange() {
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
    console.log(channels);

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

        { !!(this.props.match.params.source === 'tw') &&
          <div style={{width: '400px', height:'100%', backgroundColor: '#ccc', border: '1px solid #ccc', boxSizing: 'border-box'}} className={'flex-item hidden-'+this.state.hideChannelsList}>
            <TwitchChat id={this.props.match.params.id}/>
          </div>
        }

        <PlayerChannelsList channels={channels} className={'hidden-'+this.state.hideChannelsList}/>

        <PlayerControls onFullScreenChange={this.onFullScreenChange}/>   
      </div>
    );
  }
  
   _onReady(event) {
     // access to player in all event handlers via event.target 
     event.target.pauseVideo();
   }
}

export default Player;
