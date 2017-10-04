import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';

import VideoGrid       from '../../../Components/VideoGrid/VideoGrid';
import VideoGridPage   from '../../../Components/VideoGrid/VideoGridPage';
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
    let element = null;
    let gridElement = null;
    
    const width = window.innerWidth

    if ( !!this.state.twitchFollowingLoaded ) {
      if ( width <= 960 ) { 
        gridElement = <VideoGridPage videoItems={this.props.twitchFollowing} limit={6}></VideoGridPage>
      } else if ( width <= 1280 ) {
        gridElement = <VideoGrid videoItems={this.props.twitchFollowing}></VideoGrid>
      } else if ( width > 1280 ) {
        if ( !!this.props.paginate ) {
          gridElement = <VideoGrid videoItems={this.props.twitchFollowing}></VideoGrid>
        } else {
          gridElement = <VideoGridPage videoItems={this.props.twitchFollowing}></VideoGridPage>
        }
      }
    }

    if ( !!this.props.twitchFollowing && this.props.twitchFollowing.length > 0 ) {
      element = (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <VideoGridHeader route="/browse/tw/following" title="Live Channels You Follow on Twitch" sourceType="tw" />
            {gridElement}
          </Grid>
        </Grid>
      )
    }

    return element;

  }
}

TwitchFollowingGrid.propTypes = {
  className: PropTypes.any,
  paginate: PropTypes.bool
}

TwitchFollowingGrid.defaultProps = {
  paginate: false
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
