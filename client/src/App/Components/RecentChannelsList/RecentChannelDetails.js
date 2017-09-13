import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecentChannelDetails extends Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('ChannelDetails props', props);
  // }

  render() {

    let {hover, title, channels} = this.props;

    let channelNames;
    if ( channels.length > 2 ) {
      channelNames = channels[0].channel.name + ' and ' + (channels.length - 1) + ' others'
    } else if ( channels.length === 2 ) {
      channelNames = channels[0].channel.name + ', ' + channels[1].channel.name
    } else {
      channelNames = channels[0].channel.name
    }

    return (
      <div className={hover + ' details'}>
        <div>{title}</div>
        <div className="channel-names">{channelNames}</div>
      </div>
    );
  }
} 

RecentChannelDetails.propTypes = {

  type: PropTypes.oneOf(['hover', '']),

  title: PropTypes.string.isRequired,

  channels: PropTypes.arrayOf( 
    PropTypes.shape({
      name: PropTypes.string,
      channelThumb: PropTypes.string,
    })
  ).isRequired,

}

RecentChannelDetails.defaultProps = {
  hover: ''
}

export default RecentChannelDetails;
