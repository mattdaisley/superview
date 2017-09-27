import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import Grid         from 'material-ui/Grid';
import ChevronRight from 'material-ui-icons/ChevronRight';

import VideoGrid     from '../../../Components/VideoGrid/VideoGrid';
import VideoGridPage from '../../../Components/VideoGrid/VideoGridPage';

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
    console.log(nextProps);
    if ( this.props.youtubeRecentVideoIds !== nextProps.youtubeRecentVideoIds ) {
      this.props.getYoutubeRecent( nextProps.youtubeRecentVideoIds );
    }

    if ( this.props.youtubeRecentResults !== nextProps.youtubeRecentResults ) {
      this.setState({youtubeRecentLoaded: true})
    }
  }

  render() {
    let element = null
    let gridElement = null

    if ( !!this.state.youtubeRecentLoaded ) {
      if ( !!this.props.paginate ) {
        gridElement = <VideoGrid videoItems={this.props.youtubeRecentResults}></VideoGrid>
      } else {
        gridElement = <VideoGridPage videoItems={this.props.youtubeRecentResults}></VideoGridPage>
      }
    }

    if (!!this.props.youtubeRecentResults && this.props.youtubeRecentResults.length > 0) {
      element = (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <div className="grid-header"><h3><Link to='/tw/live'>Recent Uploads From Your YouTube Subscriptions</Link> <ChevronRight/></h3></div>

            {gridElement}
          </Grid>
        </Grid>
      )
    }

    return element

  }
}

YoutubeRecentGrid.propTypes = {
  className: PropTypes.any,
  paginate: PropTypes.bool
}

YoutubeRecentGrid.defaultProps = {
  paginate: false
}

const mapStateToProps = state => {
  return {
    youtubeRecentVideoIds: state.superViewApi.youtubeRecentVideoIds,
    youtubeRecentResults: state.youtubeBrowse.youtubeRecentResults,
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
