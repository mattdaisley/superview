import React       from 'react';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import { getRecentChannelsItems } from '../../Redux/RecentChannels/RecentChannelsActionCreators';

import RecentChannelsList  from '../../Components/RecentChannelsList/RecentChannelsList';
import TwitchFollowingGrid from '../../Components/Twitch/TwitchFollowingGrid/TwitchFollowingGrid';
import TwitchFeaturedGrid  from '../../Components/Twitch/TwitchFeaturedGrid/TwitchFeaturedGrid';
import YoutubePopularGrid  from '../../Components/YouTube/YoutubePopularGrid/YoutubePopularGrid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      marginTop: '30px',
    },
    [theme.breakpoints.down('md')]: {
    },
    marginBottom: 100
  },
})


class Home extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('Home props', props);
  // }

  componentWillMount() {
    this.props.getRecentChannelsItems();
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={9}>
            <Grid container spacing={0} >
              
              <Grid item xs={12}>
                <RecentChannelsList recentActivity={this.props.recentActivity}></RecentChannelsList>
              </Grid>
              
              <Grid item xs={12}>
                <Grid container spacing={24} >
                  
                  <Grid item xs={12}>
                    <TwitchFollowingGrid></TwitchFollowingGrid>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TwitchFeaturedGrid></TwitchFeaturedGrid>
                  </Grid>
                
                  <Grid item xs={12}>
                    <YoutubePopularGrid></YoutubePopularGrid>
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

const mapStateToProps = state => {
  return {
    recentActivity: state.recentChannels.recentChannels
  }
}
const mapDispatchToProps = dispatch => ({
  getRecentChannelsItems: () => dispatch(getRecentChannelsItems())
})


const HomeWithStyles = withStyles(styles)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(HomeWithStyles);