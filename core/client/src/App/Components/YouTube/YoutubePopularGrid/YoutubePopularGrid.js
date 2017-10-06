import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';

import VideoGrid     from '../../../Components/VideoGrid/VideoGrid';
import VideoGridPage from '../../../Components/VideoGrid/VideoGridPage';
import VideoGridHeader from '../../../Components/VideoGrid/VideoGridHeader';

import { getYoutubePopular } from '../../../Redux/Youtube/YoutubeActionCreators';

class YoutubePopularGrid extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log('YoutubePopularGrid props', props);

    this.state = {
      youtubePopularLoaded: false
    }
  }

  componentWillMount() {
    this.props.getYoutubePopular();
    
    var intervalId = setInterval(this.props.getYoutubePopular, 10000);
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

    let element = null
    let gridElement = null;
    
    const width = this.props.windowWidth

    if ( !!this.state.youtubePopularLoaded ) {
      if ( width <= 960 ) { 
        gridElement = <VideoGridPage videoItems={this.props.youtubePopularResults} limit={6}></VideoGridPage>
      } else if ( width <= 1280 ) {
        gridElement = <VideoGrid videoItems={this.props.youtubePopularResults}></VideoGrid>
      } else if ( width > 1280 ) {
        if ( !!this.props.paginate ) {
          gridElement = <VideoGrid videoItems={this.props.youtubePopularResults}></VideoGrid>
        } else {
          gridElement = <VideoGridPage videoItems={this.props.youtubePopularResults}></VideoGridPage>
        }
      }
    }

    if (!!this.props.youtubePopularResults && this.props.youtubePopularResults.length > 0) {
      element = (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <VideoGridHeader route="/browse/yt/popular" title="Popular Videos on YouTube" sourceType="yt" />
            {gridElement}
          </Grid>
        </Grid>
      )
    }

    return element

  }
}

YoutubePopularGrid.propTypes = {
  className: PropTypes.any,
  paginate: PropTypes.bool
}

YoutubePopularGrid.defaultProps = {
  paginate: false
}

const mapStateToProps = state => {
  return {
    youtubePopularResults: state.youtubeBrowse.youtubePopularResults,
    windowWidth: state.window.width,
  }
}

const mapDispatchToProps = dispatch => ({
  getYoutubePopular: () => dispatch(getYoutubePopular()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YoutubePopularGrid);
