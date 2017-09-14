import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

import Grid from 'material-ui/Grid';
import ChevronRight from 'material-ui-icons/ChevronRight';

import RecentChannelItem from '../../Components/RecentChannelsList/RecentChannelItem';

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
        <div className="grid-header"><h3><Link to='/recents'>Recent Activity</Link> <ChevronRight/></h3></div>
        <Grid container spacing={8} >
          { recentActivityList }
        </Grid>
      </div>
    );
  }
}

RecentChannelsList.propTypes = {
  recentActivity: PropTypes.arrayOf( PropTypes.object ).isRequired
}

export default RecentChannelsList;
