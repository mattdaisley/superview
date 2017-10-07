import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';

import VideoGrid     from '../../../Components/VideoGrid/VideoGrid';
import VideoGridHeader from '../../../Components/VideoGrid/VideoGridHeader';

import { getYoutubeRecentVideoIds } from '../../../Redux/SuperViewApi/SuperViewApiActionCreators';
import { getYoutubeRecent }         from '../../../Redux/Youtube/YoutubeActionCreators';

class YoutubeRecentGrid extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log('YoutubeRecentGrid props', props);

    this.state = {
      youtubeRecentLoaded: false
    }
  }

  componentWillMount() {
    this.props.getYoutubeRecentVideoIds();
    
    var intervalId = setInterval(this.props.getYoutubeRecentVideoIds, 10000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.youtubeRecentVideoIds !== nextProps.youtubeRecentVideoIds ) {
      this.props.getYoutubeRecent( nextProps.youtubeRecentVideoIds );
    }

    if ( this.props.youtubeRecentResults !== nextProps.youtubeRecentResults ) {
      this.setState({youtubeRecentLoaded: true})
    }
  }

  render() {
    
    const { youtubeRecentLoaded } = this.state;
    const { youtubeRecentResults, limit, paginate, windowWidth } = this.props
    
    let gridElement = null;

    if ( !!youtubeRecentLoaded ) {
      if ( windowWidth <= 960 ) { 
        gridElement = <VideoGrid videoItems={youtubeRecentResults} limit={limit} />
      } else if ( windowWidth <= 1280 ) {
        gridElement = <VideoGrid videoItems={youtubeRecentResults} />
      } else if ( windowWidth > 1280 ) {
        if ( !!paginate ) {
          gridElement = <VideoGrid paginate videoItems={youtubeRecentResults} />
        } else {
          gridElement = <VideoGrid videoItems={youtubeRecentResults} />
        }
      }
    }

    if (!!youtubeRecentResults && youtubeRecentResults.length > 0) {
      return (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <VideoGridHeader route="/browse/yt/subscriptions" title="Recent From Your YouTube subscriptions" sourceType="yt" />
            {gridElement}
          </Grid>
        </Grid>
      )
    }
    
    return null

  }
}

YoutubeRecentGrid.propTypes = {
  className: PropTypes.any,
  paginate: PropTypes.bool,
  limit: PropTypes.number,
}

YoutubeRecentGrid.defaultProps = {
  paginate: false
}

const mapStateToProps = state => {
  return {
    youtubeRecentVideoIds: state.superViewApi.youtubeRecentVideoIds,
    youtubeRecentResults: state.youtubeBrowse.youtubeRecentResults,
    windowWidth: state.window.width,
  }
}

const mapDispatchToProps = dispatch => ({
  getYoutubeRecentVideoIds: () => dispatch(getYoutubeRecentVideoIds()),
  getYoutubeRecent: (videoIds) => dispatch(getYoutubeRecent(videoIds)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YoutubeRecentGrid);
