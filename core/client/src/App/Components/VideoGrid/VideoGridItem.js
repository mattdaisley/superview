import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

import Grid      from 'material-ui/Grid';

const VideoGridItem = (props) => {

  const thumbnail   = props.videoItem.thumbnail;
  const title       = props.videoItem.title;
  const id          = props.videoItem.id;
  const channelName = ( props.videoItem.channel ) ? props.videoItem.channel.name : null;
  const views       = ( props.videoItem.stats ) ? props.videoItem.stats.views.toLocaleString('en-IN') + ' ' + ( props.source === 'tw' ? 'viewers' : 'views' ) : null;
  
  return (
    <Grid item xs={12} sm={6} md={4} xl={3} className="list-grid-item">
      <div className="list-grid-item-wrapper">
        <div className={['list-grid-thumb', props.source].join(' ')}>
          <img src={thumbnail} alt={title} style={ {width: '100%'} } />
        </div>

        <div className="list-grid-details-container">
          <Link to={props.source + '/' + id}>
            <div className="list-grid-details">
              <div className="list-grid-details-title">{title}</div>
              <div className="list-grid-details-channel">{channelName}</div>
              <div className="list-grid-details-info">{views}</div>
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