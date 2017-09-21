import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

const ItemDetails = (props) => {

  const {
    route,
    title,
    channelName,
    views
  } = props.options;

  // const source      = props.videoItem.source
  // const title       = props.videoItem.title;
  // const id          = props.videoItem.id;
  // const channelName = ( props.videoItem.channel ) ? props.videoItem.channel.name : null;
  // const views       = ( props.videoItem.stats ) ? props.videoItem.stats.views.toLocaleString('en-IN') + ' ' + ( props.source === 'tw' ? 'viewers' : 'views' ) : null;
  
  return (
    <div className="list-grid-details-container">
      <Link to={route}>
        <div className="list-grid-details">
          <div className="list-grid-details-title">{title}</div>
          <div className="list-grid-details-channel">{channelName}</div>
          <div className="list-grid-details-info">{views}</div>
        </div>
      </Link>
    </div>
  );
} 

ItemDetails.propTypes = {
  options: PropTypes.object.isRequired,
}

export default ItemDetails;
