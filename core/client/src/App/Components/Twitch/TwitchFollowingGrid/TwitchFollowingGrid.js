import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';

import VideoGrid       from '../../../Components/VideoGrid/VideoGrid';
import VideoGridHeader from '../../../Components/VideoGrid/VideoGridHeader';

import { getTwitchFollowing } from '../../../Redux/Twitch/TwitchActionCreators';

class TwitchFollowingGrid extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log('TwitchFollowingGrid props', props);

    this.state = {
      twitchFollowingLoaded: false
    }
  }

  componentWillMount() {
    this.props.getTwitchFollowing();

    var intervalId = setInterval(this.props.getTwitchFollowing, 15000);
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

    const { twitchFollowingLoaded } = this.state;
    const { twitchFollowing, limit, paginate, windowWidth } = this.props
    
    let gridElement = null;
    
    if ( !!twitchFollowingLoaded ) {
      if ( windowWidth <= 960 ) { 
        gridElement = <VideoGrid videoItems={twitchFollowing} limit={limit} />
      } else if ( windowWidth <= 1280 ) {
        gridElement = <VideoGrid videoItems={twitchFollowing} />
      } else if ( windowWidth > 1280 ) {
        if ( !!paginate ) {
          gridElement = <VideoGrid paginate videoItems={twitchFollowing} />
        } else {
          gridElement = <VideoGrid videoItems={twitchFollowing} />
        }
      }
    }

    if ( !!twitchFollowing && twitchFollowing.length > 0 ) {
      return (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <VideoGridHeader route="/browse/tw/following" title="Live Channels You Follow on Twitch" sourceType="tw" />
            {gridElement}
          </Grid>
        </Grid>
      )
    }

    return null;

  }
}

TwitchFollowingGrid.propTypes = {
  className: PropTypes.any,
  paginate: PropTypes.bool,
  limit: PropTypes.number,
}

TwitchFollowingGrid.defaultProps = {
  paginate: false
}

const mapStateToProps = state => {
  return {
    twitchFollowing: state.twitchBrowse.twitchFollowing,
    windowWidth: state.window.width,
  }
}

const mapDispatchToProps = dispatch => ({
  getTwitchFollowing: () => dispatch(getTwitchFollowing()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitchFollowingGrid);
