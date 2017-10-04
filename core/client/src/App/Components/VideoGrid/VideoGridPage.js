import React     from 'react';
import PropTypes from 'prop-types';

import Grid      from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import VideoGridItem from './VideoGridItem/VideoGridItem';

import './VideoGrid.css';

const styles = theme => ({
  listGridItem: {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
})

class VideoGridPage extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    // console.log('in componentWillMount', this.props );
    if ( !!this.props.featuredItem ) {
      this.setState({ 
        featuredItem: this.props.featuredItem,
      })
    } else {
      this.setState({ 
        featuredItem: undefined,
      })
    }
    if ( !!this.props.limit ) {
      this.setState({
        videoItems: this.props.videoItems.slice(0, this.props.limit)
      })
    } else {
      this.setState({
        videoItems: this.props.videoItems
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', nextProps);
    if ( !!nextProps.featuredItem ) {
      this.setState( { 
        featuredItem: nextProps.featuredItem,
      } )
    } else {
      this.setState( { 
        featuredItem: undefined,
      } )
    }

    if ( !!nextProps.limit ) {
      this.setState({
        videoItems: nextProps.videoItems.slice(0, nextProps.limit)
      })
    } else {
      this.setState({
        videoItems: nextProps.videoItems
      })
    }
  }

  render() {
    const classes = this.props.classes

    let element, videoElements;
    const { featuredItem, videoItems }   = this.state

    if ( !!featuredItem ) {

      let featuredElement = <VideoGridItem source={featuredItem.source_type} videoItem={featuredItem}></VideoGridItem> 

      if ( videoItems.length + 4 === 8 ) {
        videoElements = videoItems.map( (videoItem, index) => (
          <Grid item xs={6} className={classes.listGridItem} key={index}>
            <VideoGridItem source={videoItem.source_type} videoItem={videoItem}></VideoGridItem> 
          </Grid>
        ))
        element = (
          <Grid container spacing={16} >
            <Grid item xs={12} md={6}> {featuredElement} </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={16} > {videoElements} </Grid>
            </Grid>
          </Grid>
        )
      }
      if ( videoItems.length + 4 === 6 ) {
        videoElements = videoItems.map( (videoItem, index) => (
          <Grid item xs={12} className={classes.listGridItem} key={index}>
            <VideoGridItem source={videoItem.source_type} videoItem={videoItem}></VideoGridItem> 
          </Grid>
        ))
        element = (
          <Grid container spacing={24} >
            <Grid item xs={12} md={8}> {featuredElement} </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={16} > {videoElements} </Grid>
            </Grid>
          </Grid>
        )
      }
      if ( videoItems.length === 0 ) element = null;
    } else if ( videoItems.length > 0 ) {
      videoElements = videoItems.map( (videoItem, index) => (
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.listGridItem} key={index}>
          <VideoGridItem source={videoItem.source_type} videoItem={videoItem}></VideoGridItem> 
        </Grid>
      ))
      element = (
        <Grid container spacing={16} >
          {videoElements}
        </Grid>
      )
    } else {
      element = null
    }

    return element;
  }
} 

VideoGridPage.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired,
  featuredItem: PropTypes.object,
  limit: PropTypes.number
}


const VideoGridPageWithStyles = withStyles(styles)(VideoGridPage);

export default VideoGridPageWithStyles;

