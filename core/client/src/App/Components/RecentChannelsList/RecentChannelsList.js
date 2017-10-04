import React     from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import RecentChannelItem from '../../Components/RecentChannelsList/RecentChannelItem';
import VideoGridHeader   from '../../Components/VideoGrid/VideoGridHeader';

class RecentChannelsList extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('RecentChannelsList props', props);
  // }

  render() {

    const sortByTimestmap = (a, b) => {
      if (a.timestamp > b.timestamp) return -1;
      if (a.timestamp < b.timestamp) return 1;
      return 0;
    }

    let recentActivityList = null;
    if ( this.props.recentActivity ) {
      recentActivityList = this.props.recentActivity.sort(sortByTimestmap).map( (activityItem, index) => {
        return (
          <Grid item key={index}>
            <RecentChannelItem activityItem={activityItem}/>
          </Grid>
        )
      })
    }

    return (
      <div className="recent-activity-wrapper">
        { !!recentActivityList &&
          <VideoGridHeader route="/recents" title="RecentActivity" />
        }
        <Grid container spacing={8} >
          { recentActivityList }
        </Grid>
      </div>
    );
  }
}

RecentChannelsList.propTypes = {
  recentActivity: PropTypes.arrayOf( PropTypes.object )
}

export default RecentChannelsList;
