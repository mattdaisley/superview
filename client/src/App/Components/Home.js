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
    route: '/tw/bdoubleo/nobodyepic',
    channels: [
      {
        name: 'BdoubleO',
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/517b7b22d24c1849-profile_image-300x300.png'
      },
      {
        name: 'NobodyEpic',
        thumbUri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2df17b12822bb83a-profile_image-300x300.png'
      }
    ]
  },
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
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
