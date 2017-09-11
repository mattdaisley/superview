import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

import Grid      from 'material-ui/Grid';

const VideoGridItem = (props) => {
  return (
    <Grid item xs={12} sm={6} md={4} xl={3} className="list-grid-item">
      <div className="list-grid-item-wrapper">
        <div className="list-grid-thumb">
          <img src={props.videoItem.logo} alt={props.videoItem.title} style={ {width: '100%'} } />
        </div>

        <div className="list-grid-details-container">
          <Link to={props.source + '/' + props.videoItem.id}>
            <div className="list-grid-details">
              <div className="list-grid-details-title">{props.videoItem.title}</div>
              <div className="list-grid-details-channel">{props.videoItem.name}</div>
              <div className="list-grid-details-info">{props.videoItem.stats.views.toLocaleString('en-IN')} viewers</div>
            </div>
          </Link>
        </div>
      </div>
    </Grid>
  );
} 

VideoGridItem.propTypes = {
  videoItem: PropTypes.object.isRequired,
}

export default VideoGridItem;


/*
{
  id: stream.channel.name,
  name: stream.channel.display_name,
  title: stream.channel.status,
  logo: stream.preview.medium,
  channel_id: stream.channel._id,
  channel_logo: stream.channel.logo,
  description: stream.channel.description,
  published_at: stream.created_at,
  stats: {
    views: stream.viewers,
    likes: undefined,
    dislikes: undefined,
    comments: undefined,
  }
}
*/