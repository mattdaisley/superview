import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import Grid         from 'material-ui/Grid';
import ChevronRight from 'material-ui-icons/ChevronRight';

import VideoGrid     from '../../../Components/VideoGrid/VideoGrid';
import VideoGridPage from '../../../Components/VideoGrid/VideoGridPage';

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

    if ( !!this.state.youtubePopularLoaded ) {
      if ( !!this.props.paginate ) {
        gridElement = <VideoGrid videoItems={this.props.youtubePopularResults}></VideoGrid>
      } else {
        gridElement = <VideoGridPage videoItems={this.props.youtubePopularResults}></VideoGridPage>
      }
    }

    if (!!this.props.youtubePopularResults && this.props.youtubePopularResults.length > 0) {
      element = (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <div className="grid-header"><h3><Link to='/tw/live'>Popular Videos on YouTube</Link> <ChevronRight/></h3></div>
            <div className="youtube-divider"></div>
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
  }
}

const mapDispatchToProps = dispatch => ({
  getYoutubePopular: () => dispatch(getYoutubePopular()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YoutubePopularGrid);
