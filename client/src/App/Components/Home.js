import React from 'react';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ChevronRight from 'material-ui-icons/ChevronRight';

import RecentChannelItem from '../Components/RecentChannelItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const recentActivity = [
  {
    type: 'tw',
    title: '5th 4th 3rd....',
    route: '/tw/bdoubleo',
    channels: [
      {
        name: 'BdoubleO',
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/517b7b22d24c1849-profile_image-300x300.png'
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
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/517b7b22d24c1849-profile_image-300x300.png'
      },
      {
        name: 'wolvesatmydoor',
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/504ced8a97f2f6a5-profile_image-300x300.png'
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
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/northernlion-profile_image-24031606a8e430c3-300x300.png'
      },
      {
        name: 'Last_Grey_Wolf',
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/0434b290530af95a-profile_image-300x300.png'
      },
      {
        name: 'DanGheesling',
        thumbUri: 'https://yt3.ggpht.com/-Okp3KzEB6xc/AAAAAAAAAAI/AAAAAAAAAAA/AkWCDXngQjs/s176-c-k-no-mo-rj-c0xffffff/photo.jpg'
      },
      {
        name: 'michaelalfox',
        thumbUri: 'https://yt3.ggpht.com/-MgNHVOdUNEE/AAAAAAAAAAI/AAAAAAAAAAA/oQBTxr6rOQc/s176-c-k-no-mo-rj-c0xffffff/photo.jpg'
      }
    ]
  },
  {
    type: 'yt',
    title: 'Northernlion and Friends Play - PlayerUnknown\'s Battlegrounds - Episode 156',
    route: '/yt/s65A6QrScVI',
    channels: [
      {
        name: 'Northernlion',
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/northernlion-profile_image-24031606a8e430c3-300x300.png'
      },
    ]
  },
  {
    type: 'tw',
    title: 'Multi-stream',
    route: '/tw/grimmmz',
    channels: [
      {
        name: 'Grimmmz',
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/grimmmz-profile_image-b6c4dd27a4b900a3-300x300.png'
      },
      {
        name: 'Anthony_Kongphan',
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/anthony_kongphan-profile_image-779ae9619d16e5d4-300x300.png'
      },
      {
        name: 'DrDisRespectLive',
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/drdisrespectlive-profile_image-abc1fc67d2ea1ae1-300x300.png'
      }
    ]
  },
]

class Home extends React.Component {
  
  // constructor(props) {
    // super(props);

    // propTypes = {
    //   classes: PropTypes.object.isRequired
    // }
  // }

  render() {
    const classes = this.props.classes;

    const recentActivityList = recentActivity.map( (activityItem, index) => {
      return (
        <Grid item key={index}>
          <RecentChannelItem activityItem={activityItem}/>
        </Grid>
      )
    })

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={12} md={9}>
            <Grid container spacing={0} >
              
              <Grid item xs={12} className="recent-activity-wrapper">
                <h3><Link to='/recents'>Recent Activity</Link> <ChevronRight/></h3>
                <Grid container spacing={8} >
                  { recentActivityList }
                </Grid>
              </Grid>
              
              <Grid item xs={12} className="recent-activity-wrapper">
                <h3><Link to='/tw/live'>Live Channels on Twitch</Link> <ChevronRight/></h3>
                <Grid container spacing={8} >
                  <Grid item xs={6} sm={3} className="list-grid-item">
                    <div style={ {width: '100%'} }>
                      <img src="https://static-cdn.jtvnw.net/previews-ttv/live_user_bdoubleo-320x180.jpg" alt="bdoubleo" style={ {width: '100%'} } />
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={3} className="list-grid-item">
                    <div style={ {width: '100%'} }>
                      <img src="https://static-cdn.jtvnw.net/previews-ttv/live_user_stockstream-320x180.jpg" alt="stockstream" style={ {width: '100%'} } />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              
              <Grid item xs={12} className="recent-activity-wrapper">
                <h3><Link to='/yt/subscriptions'>Recent from your YouTube subscriptions</Link> <ChevronRight/></h3>
                <Grid container spacing={8} >
                  <Grid item xs={6} sm={3} className="list-grid-item">
                    <div style={ {width: '100%'} }>
                      <img src="https://i.ytimg.com/vi/U5kQq2P50QY/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCUJat6Cf58B1E-oO6glixdcJ0weA" alt="dan" style={ {width: '100%'} } />
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={3} className="list-grid-item">
                    <div style={ {width: '100%'} }>
                      <img src="https://i.ytimg.com/vi/VCiTarqUyXM/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBWbfzvu5RRytl1htmDrCFhNLFFXg" alt="nl" style={ {width: '100%'} } />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
