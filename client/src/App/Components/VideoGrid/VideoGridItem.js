import React     from 'react';
import PropTypes from 'prop-types';

import Grid      from 'material-ui/Grid';

const VideoGridItem = (props) => {
  console.log(props);
  return (
    <Grid item xs={6} sm={3} className="list-grid-item">
      <div className="list-grid-thumb">
        <img src={props.videoItem.thumb} alt={props.videoItem.title} style={ {width: '100%'} } />
      </div>

      <div className="list-grid-details-container">
        <div className="list-grid-details">
          <div className="list-grid-details-title">{props.videoItem.title}</div>
          <div className="list-grid-details-channel">{props.videoItem.channels.map((channel, i)=>(<span key={i}>{channel.name}</span>))}</div>
          <div className="list-grid-details-info">{props.videoItem.viewers}</div>
        </div>
      </div>
    </Grid>
  );
} 

VideoGridItem.propTypes = {
  videoItem: PropTypes.object.isRequired,
}

export default VideoGridItem;
