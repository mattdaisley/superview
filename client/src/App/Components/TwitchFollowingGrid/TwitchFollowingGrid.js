import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import ChevronRight from 'material-ui-icons/ChevronRight';

import VideoGrid    from '../../Components/VideoGrid/VideoGrid';

import { getTwitchFollowing } from '../../Redux/Twitch/TwitchActionCreators';

class TwitchFollowingGrid extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log('RecentChannelsGrid props', props);

    this.state = {
      twitchFollowingLoaded: false
    }
  }

  componentWillMount() {
    this.props.getTwitchFollowing();

    var intervalId = setInterval(this.props.getTwitchFollowing, 5000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.twitchFollowing !== nextProps.twitchFollowing ) {
      this.setState({twitchFollowingLoaded: true})
    }
  }

  render() {

    return (
      <div>
        <div className="grid-header"><h3><Link to='/tw/live'>Live Channels on Twitch</Link> <ChevronRight/></h3></div>
        { !!this.state.twitchFollowingLoaded && (
          <VideoGrid source="tw" videoItems={this.props.twitchFollowing}></VideoGrid>
        )}
      </div>
    );

  }
}

TwitchFollowingGrid.propTypes = {
  liveChannels: PropTypes.arrayOf( PropTypes.object ).isRequired
}

const mapStateToProps = state => {
  return {
    twitchFollowing: state.twitchBrowse.twitchFollowing,
  }
}

const mapDispatchToProps = dispatch => ({
  getTwitchFollowing: () => dispatch(getTwitchFollowing()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitchFollowingGrid);
