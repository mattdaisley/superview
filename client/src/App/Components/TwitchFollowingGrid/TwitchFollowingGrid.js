import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

import ChevronRight from 'material-ui-icons/ChevronRight';

import VideoGrid          from '../../Components/VideoGrid/VideoGrid';

class TwitchFollowingGrid extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('RecentChannelsGrid props', props);
  // }

  render() {

    return (
      <div>
        <div className="grid-header"><h3><Link to='/tw/live'>Live Channels on Twitch</Link> <ChevronRight/></h3></div>
        <VideoGrid videoItems={this.props.liveChannels}></VideoGrid>
      </div>
    );
    
  }
}

TwitchFollowingGrid.propTypes = {
  liveChannels: PropTypes.arrayOf( PropTypes.object ).isRequired
}

export default TwitchFollowingGrid;
