import React       from 'react';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import { getRecentChannelsItems } from '../../Redux/RecentChannels/RecentChannelsActionCreators';

import RecentChannelsList  from '../../Components/RecentChannelsList/RecentChannelsList';
import TwitchFollowingGrid from '../../Components/Twitch/TwitchFollowingGrid/TwitchFollowingGrid';
import TwitchFeaturedGrid  from '../../Components/Twitch/TwitchFeaturedGrid/TwitchFeaturedGrid';
import YoutubePopularGrid  from '../../Components/YouTube/YoutubePopularGrid/YoutubePopularGrid';
import YoutubeRecentGrid   from '../../Components/YouTube/YoutubeRecentGrid/YoutubeRecentGrid';

const styles = theme => ({
  recentActivity: {
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
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
      <Grid item xs={12}>
        <Grid container spacing={0} >
          
          <Grid item xs={12} className={classes.recentActivity}>
            <RecentChannelsList recentActivity={this.props.recentActivity}></RecentChannelsList>
          </Grid>
          
          <Grid item xs={12}>

              <TwitchFollowingGrid paginate={true}></TwitchFollowingGrid>
            
              <YoutubeRecentGrid paginate={true}></YoutubeRecentGrid>
              
              <TwitchFeaturedGrid paginate={true}></TwitchFeaturedGrid>
            
              <YoutubePopularGrid paginate={true}></YoutubePopularGrid>
              
          </Grid>

        </Grid>
      </Grid>
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