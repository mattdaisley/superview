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

class Home extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('Home props', props);
  // }

  componentWillMount() {
    this.props.getRecentChannelsItems();
  }

  render() {
    return (
      <div className="root">
        <Grid container spacing={0} justify="center">
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
