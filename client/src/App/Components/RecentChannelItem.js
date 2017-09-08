import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class ChannelImage extends Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('ChannelImage props', props);
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
      <div className={imgSize} key={index}><img src={channel.channelThumb} alt={channel.name}/></div>
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

class ChannelDetails extends Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('ChannelDetails props', props);
  // }

  render() {

    let {hover, title, channels} = this.props;

    let channelNames;
    if ( channels.length > 2 ) {
      channelNames = channels[0].name + ' and ' + (channels.length - 1) + ' others'
    } else if ( channels.length === 2 ) {
      channelNames = channels[0].name + ', ' + channels[1].name
    } else {
      channelNames = channels[0].name
    }

    return (
      <div className={hover + ' details'}>
        <div>{title}</div>
        <div className="channel-names">{channelNames}</div>
      </div>
    );
  }
} 

class RecentChannelItem extends Component {
  
  constructor(props) {
    super(props);
    // console.log('RecentChannelItem props', props);

    this.state = {
      hover: false
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  
  handleMouseEnter() {
    this.setState({ hover: true });
  }
    
  handleMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    let hover = (this.state.hover) ? 'hover' : '';

    let {type, title, channels, route, thumb} = this.props.activityItem;

    return (
      <div className={`recent-channel-item-container ${!!thumb ? 'lg' : 'sm'}`} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Link to={route}>
          <ChannelImage thumb={thumb} channels={channels} type={type} />
          <ChannelDetails hover={hover} title={title} channels={channels}/>
        </Link>
      </div>
    );
  }
}

RecentChannelItem.propTypes = {
  activityItem: PropTypes.shape({
    title: PropTypes.string.isRequired,

    type: PropTypes.oneOf(['tw','yt']).isRequired,
    
    route: PropTypes.string.isRequired,

    channels: PropTypes.array.isRequired,

    thumb: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      url: PropTypes.string,
    }),
  })
}

ChannelImage.propTypes = {

  channels: PropTypes.arrayOf( 
    PropTypes.shape({
      name: PropTypes.string,
      channelThumb: PropTypes.string,
    })
  ).isRequired,

  type: PropTypes.oneOf(['tw', 'yt']).isRequired,

  thumb: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
  }),
}

ChannelDetails.propTypes = {

  type: PropTypes.oneOf(['hover', '']),

  title: PropTypes.string.isRequired,

  channels: PropTypes.arrayOf( 
    PropTypes.shape({
      name: PropTypes.string,
      channelThumb: PropTypes.string,
    })
  ).isRequired,

}

ChannelDetails.defaultProps = {
  hover: ''
}

export default RecentChannelItem;
