import React       from 'react';
import { connect } from 'react-redux';

import { getRecentChannelsItems } from '../../Redux/RecentChannels/RecentChannelsActionCreators';

import Grid         from 'material-ui/Grid';

import RecentChannelsList  from '../../Components/RecentChannelsList/RecentChannelsList';
import TwitchFollowingGrid from '../../Components/TwitchFollowingGrid/TwitchFollowingGrid';

const twLiveChannels = [
  {
    type: 'tw',
    title: 'wolvesDinner | only some !hats left!',
    route: '/tw/wolvesatmydoor',
    thumb: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_wolvesatmydoor-640x360.jpg',
    channels: [
      {
        name: 'wolvesatmydoor', 
        channelThumb: 'https://static-cdn.jtvnw.net/jtv_user_pictures/504ced8a97f2f6a5-profile_image-300x300.png',
        game: 'Playerunknown\'s Battlegrounds',
        title: 'wolvesDinner | only some !hats left!',
        views: 91,
        created_at: '2017-09-08T19:12:56Z'
      }
    ]
  }
]
const original = {
  "_id": 23937446096,
  "average_fps": 60,
  "channel": {
    "_id": 121059319,
    "broadcaster_language": "en",
    "created_at": "2016-04-06T04:12:40Z",
    "display_name": "MOONMOON_OW",
    "followers": 251103,
    "game": "Overwatch",
    "language": "en",
    "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/moonmoon_ow-profile_image-0fe586039bb28259-300x300.png",
    "mature": true,
    "name": "moonmoon_ow",
    "partner": true,
    "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/moonmoon_ow-profile_banner-13fbfa1ba07bcd8a-480.png",
    "profile_banner_background_color": null,
    "status": "KKona where my Darryl subs at KKona",
    "updated_at": "2016-12-15T19:34:46Z",
    "url": "https://www.twitch.tv/moonmoon_ow",
    "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/moonmoon_ow-channel_offline_image-2b3302e20384eee8-1920x1080.png",
    "views": 9865358
  },
  "created_at": "2016-12-15T14:55:49Z",
  "delay": 0,
  "game": "Overwatch",
  "is_playlist": false,
  "preview": {
    "large": "https://static-cdn.jtvnw.net/previews-ttv/live_user_moonmoon_ow-640x360.jpg",
    "medium": "https://static-cdn.jtvnw.net/previews-ttv/live_user_moonmoon_ow-320x180.jpg",
    "small": "https://static-cdn.jtvnw.net/previews-ttv/live_user_moonmoon_ow-80x45.jpg",
    "template": "https://static-cdn.jtvnw.net/previews-ttv/live_user_moonmoon_ow-{width}x{height}.jpg"
  },
  "video_height": 720,
  "viewers": 11211
}

class Home extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('Home props', props);
  // }

  componentWillMount() {
    this.props.getRecentChannelsItems();
  }

  render() {
    console.log('Home');
    return (
      <div className="root">
        <Grid container spacing={24} justify="center">
          <Grid item xs={12} md={9}>
            <Grid container spacing={0} >
              
              <Grid item xs={12}>
                <RecentChannelsList recentActivity={this.props.recentActivity}></RecentChannelsList>
              </Grid>
              
              <Grid item xs={12}>
                <TwitchFollowingGrid liveChannels={twLiveChannels}></TwitchFollowingGrid>
              </Grid>
              
              {/* <Grid item xs={12}>
                <TwitchFollowingGrid liveChannels={twLiveChannels}></TwitchFollowingGrid>
              </Grid> */}

            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recentActivity: state.recentChannels.recentChannels
  }
}
const mapDispatchToProps = dispatch => ({
  getRecentChannelsItems: () => dispatch(getRecentChannelsItems())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
