import React     from 'react';
import PropTypes from 'prop-types';

import Grid      from 'material-ui/Grid';

import ItemDetails from './ItemDetails';
import ItemImage   from './ItemImage';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  listGridItem: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  listGridItemWrapper: {
    position: 'relative',
    borderRadius: 3,
    // borderRadius: '20px',
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  }
})

class VideoGridItem extends React.PureComponent {

  render() {
    
    const classes = this.props.classes
  
    const { id, title, thumbnail } = this.props.videoItem;
    const channelName = ( this.props.videoItem.channel ) ? this.props.videoItem.channel.name : null;
    const views       = ( this.props.videoItem.stats ) ? this.props.videoItem.stats.views.toLocaleString('en-IN') + ' ' + ( this.source === 'tw' ? 'viewers' : 'views' ) : null;
    const route       = this.props.source + '/' + id
  
    const itemDetailOptions = {
      title,
      channelName,
      views,
      route
    }
    
    return (
      <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.listGridItem}>
        <div className={classes.listGridItemWrapper}>
          <ItemImage src={thumbnail} title={title} />
          <ItemDetails options={itemDetailOptions} />
        </div>
      </Grid>
    );
  }
} 

VideoGridItem.propTypes = {
  videoItem: PropTypes.object.isRequired,
}

const VideoGridItemWithStyles = withStyles(styles)(VideoGridItem);

export default VideoGridItemWithStyles;
