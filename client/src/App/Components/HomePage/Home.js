import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getRecentChannelsItems } from '../../Redux/RecentChannels/RecentChannelsActionCreators';

import Grid from 'material-ui/Grid';
import ChevronRight from 'material-ui-icons/ChevronRight';

import RecentChannelItem from '../../Components/RecentChannelsList/RecentChannelItem';

class Home extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('Home props', props);
  // }

  componentWillMount() {
    this.props.getRecentChannelsItems();
  }

  render() {

    const sortByTimestmap = (a, b) => {
      console.log(a.timestamp, b.timestamp);
      if (a.timestamp > b.timestamp) return -1;
      if (a.timestamp < b.timestamp) return 1;
      return 0;
    }

    const recentActivityList = this.props.recentActivity.sort(sortByTimestmap).map( (activityItem, index) => {
      return (
        <Grid item key={index}>
          <RecentChannelItem activityItem={activityItem}/>
        </Grid>
      )
    })

    return (
      <div className="root">
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
