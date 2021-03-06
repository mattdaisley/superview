import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';

import VideoGrid     from '../../../Components/VideoGrid/VideoGrid';
import VideoGridHeader from '../../../Components/VideoGrid/VideoGridHeader';

import { getYoutubePopular } from '../../../Redux/Youtube/YoutubeActionCreators';

// import { getYoutubePopularVideos } from '../../../Redux/SuperViewApi/SuperViewApiActionCreators';

class YoutubePopularGrid extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log('YoutubePopularGrid props', props);

    this.state = {
      youtubePopularLoaded: false
    }
  }

  componentWillMount() {
    // this.props.getYoutubePopularVideos();
    this.props.getYoutubePopular();
    
    var intervalId = setInterval(this.props.getYoutubePopularVideos, 10000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.youtubePopularResults !== nextProps.youtubePopularResults ) {
      this.setState({youtubePopularLoaded: true})
    }
  }

  render() {
    
    const { youtubePopularLoaded } = this.state;
    const { youtubePopularResults, limit, paginate, windowWidth } = this.props
    
    let gridElement = null;

    if ( !!youtubePopularLoaded ) {
      if ( windowWidth <= 960 ) { 
        gridElement = <VideoGrid videoItems={youtubePopularResults} limit={limit} />
      } else if ( windowWidth <= 1280 ) {
        gridElement = <VideoGrid videoItems={youtubePopularResults} />
      } else if ( windowWidth > 1280 ) {
        if ( !!paginate ) {
          gridElement = <VideoGrid paginate videoItems={youtubePopularResults} />
        } else {
          gridElement = <VideoGrid videoItems={youtubePopularResults} />
        }
      }
    }

    if (!!this.props.youtubePopularResults && this.props.youtubePopularResults.length > 0) {
      return (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <VideoGridHeader route="/browse/yt/popular" title="Popular Videos on YouTube" sourceType="yt" />
            {gridElement}
          </Grid>
        </Grid>
      )
    }

    return null

  }
}

YoutubePopularGrid.propTypes = {
  className: PropTypes.any,
  paginate: PropTypes.bool,
  limit: PropTypes.number,
}

YoutubePopularGrid.defaultProps = {
  paginate: false
}

const mapStateToProps = state => {
  return {
    youtubePopularResults: state.youtubeBrowse.youtubePopularResults,
    // youtubePopularResults: state.superViewApi.youtubePopularVideos,
    windowWidth: state.window.width,
  }
}

const mapDispatchToProps = dispatch => ({
  // getYoutubePopularVideos: () => dispatch(getYoutubePopularVideos()),
  getYoutubePopular: () => dispatch(getYoutubePopular()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YoutubePopularGrid);
