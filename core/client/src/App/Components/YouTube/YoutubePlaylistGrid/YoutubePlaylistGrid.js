import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';

import VideoGrid     from '../../../Components/VideoGrid/VideoGrid';
import VideoGridHeader from '../../../Components/VideoGrid/VideoGridHeader';

// import { getYoutubePopularVideos } from '../../../Redux/SuperViewApi/SuperViewApiActionCreators';

class YoutubePlaylistGrid extends React.Component {

  // componentWillMount() {
  //   // this.props.getYoutubePopularVideos();
  //   this.getUploads();
    
  //   var intervalId = setInterval(this.getUploads, 10000);
  //   this.setState({intervalId: intervalId});
  // }

  // getUploads() {
  //   this.props.getYoutubePlaylistItems()
  // }

  // componentWillUnmount() {
  //   clearInterval(this.state.intervalId);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if ( this.props.youtubeChannelUploads !== nextProps.youtubeChannelUploads ) {
  //     this.setState({youtubeChannelUploadsLoaded: true})
  //   }
  // }

  render() {
    
    // const { youtubeChannelUploadsLoaded } = this.state;
    const { playlistItems, playlistId, limit, paginate, windowWidth } = this.props

    if ( !!playlistItems && playlistItems.length > 0 ) {
      let gridElement = null;

      if ( windowWidth <= 960 ) { 
        gridElement = <VideoGrid videoItems={playlistItems} limit={limit} />
      } else if ( windowWidth <= 1280 ) {
        gridElement = <VideoGrid videoItems={playlistItems} />
      } else if ( windowWidth > 1280 ) {
        if ( !!paginate ) {
          gridElement = <VideoGrid paginate videoItems={playlistItems} />
        } else {
          gridElement = <VideoGrid videoItems={playlistItems} />
        }
      }

      return (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <VideoGridHeader route={'/channel/yt/playlist/'+playlistId} title="Uploads" sourceType="yt" />
            {gridElement}
          </Grid>
        </Grid>
      )
    }

    return null

  }
}

YoutubePlaylistGrid.propTypes = {
  playlistId: PropTypes.string,
  playlistItems: PropTypes.array,
  className: PropTypes.any,
  paginate: PropTypes.bool,
  limit: PropTypes.number,
}

YoutubePlaylistGrid.defaultProps = {
  paginate: false
}

const mapStateToProps = state => {
  return {
    windowWidth: state.window.width,
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YoutubePlaylistGrid);
