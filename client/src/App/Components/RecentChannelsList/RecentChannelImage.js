import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecentChannelImage extends Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('RecentChannelImage props', props);
  // }

  render() {

    let thumb = this.props.thumb;
    let channels = this.props.channels;
    let channelThumbs;
    switch (this.props.channels.length) {
      case 3:
        channelThumbs = [...channels, channels[0]];
        break;
      case 2:
        channelThumbs = [...channels, ...channels.slice().reverse()].slice(0,4);
        break;
      default:
        channelThumbs = channels;
        break;
    }
    let imgSize = (channels.length === 1 && !thumb) ? 'image-lg' : 'image-sm';
    
    let images = channelThumbs.map( (channel, index) =>
      <div className={imgSize} key={index}><img src={channel.logo} alt={channel.title}/></div>
    );

    return (
      <div className={'image-wrapper'}>
        { !!thumb && <img alt="channel thumbnail" className="thumb" src={thumb.url} width={thumb.width} height={thumb.height} /> }
        <div className={`thumb-solo-${!!thumb} channel-thumbs`}>
          {images}
        </div>
      </div>
    );
  }
} 

RecentChannelImage.propTypes = {

  channels: PropTypes.arrayOf( 
    PropTypes.object
  ).isRequired,

  type: PropTypes.oneOf(['tw', 'yt']).isRequired,

  thumb: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
  }),
}

export default RecentChannelImage;
