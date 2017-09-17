import React     from 'react';
import PropTypes from 'prop-types';

import Grid      from 'material-ui/Grid';

import VideoGridItem from './VideoGridItem';

import './VideoGrid.css';

class VideoGrid extends React.Component {
  
  constructor(props) {
    super(props);
    console.log('ChannelDetails props', props);
  }

  render() {
    let videoItems = this.props.videoItems.map( (videoItem, index) => <VideoGridItem source={this.props.source} key={index} videoItem={videoItem}></VideoGridItem> )

    return (
      <Grid container spacing={8} >
        { !!videoItems.length && videoItems }
      </Grid>
    );
  }
} 

VideoGrid.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired,
}

export default VideoGrid;
