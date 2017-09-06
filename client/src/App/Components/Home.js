import React from 'react';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
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
    type: 'yt',
    title: 'Multi-tube',
    route: '/yt/s65A6QrScVI/8vNjD_3Fopc/UHfJsxg6_5E/gNPeqSGtAm0',
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
    route: '/tw/s65A6QrScVI',
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

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={12} md={9}>
            <Grid container spacing={24} >
              
              <Grid item xs={12} className="recent-activity-wrapper">
                <h3><Link to='/recents'>Recent Activity</Link> <ChevronRight/></h3>
                <Grid container spacing={8} >
                  <Grid item>
                    <RecentChannelItem hover="hover" activityItem={recentActivity[0]}/>
                  </Grid>
                  <Grid item>
                    <RecentChannelItem hover="" activityItem={recentActivity[1]}/>
                  </Grid>
                  <Grid item>
                    <RecentChannelItem hover="" activityItem={recentActivity[2]}/>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>xs=12, md=6</Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>xs=12, md=6</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
