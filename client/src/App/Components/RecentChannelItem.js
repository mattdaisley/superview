import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ChannelImage extends Component {

  render() {

    let type = this.props.type;
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

  render() {

    const hover = this.props.hover;
    const title = this.props.title;
    const channels = this.props.channels;

    var channelNames;
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
    let activityItem = this.props.activityItem;
    let type = activityItem.type;
    let title = activityItem.title;
    let channels = activityItem.channels;
    let route = activityItem.route;
    // let route = type + '/' + channels.map( (channel) => channel.name).join('/');

    return (
      <div className={`recent-channel-item-container ${!!activityItem.thumb ? 'lg' : 'sm'}`} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Link to={route}>
          <ChannelImage thumb={activityItem.thumb} channels={channels} type={type} />
          <ChannelDetails hover={hover} title={title} channels={channels}/>
        </Link>
      </div>
    );
  }
}

export default RecentChannelItem;
