import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ChannelImage extends Component {

  render() {

    let type = this.props.type;
    let channels = this.props.channels;
    let thumb = this.props.thumb;
    let imgSize = (channels.length < 2 && !thumb) ? 'image-lg' : 'image-sm';
    let images = channels.map( (channel, index) =>
      <div className={imgSize} key={index}><img src={channel.channelThumb} alt={channel.name}/></div>
    );

    return (
      <div className={type + ' image-wrapper'}>
        { !!thumb && <img className="thumb" src={thumb.url} width={thumb.width} height={thumb.height} /> }
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
    const hover = (this.state.hover) ? 'hover' : '';
    const activityItem = this.props.activityItem;
    const type = activityItem.type;
    const route = activityItem.route;
    const title = activityItem.title;
    const channels = activityItem.channels;

    let itemStyle = {};
    // if ( activityItem.thumb ) {
    //   itemStyle = {
    //     backgroundImage: `url(${activityItem.thumb.url})`,
    //     backgroundSize: `${activityItem.thumb.width})px ${activityItem.thumb.height}px`,
    //     width: activityItem.thumb.width
    //   };
    // }
    console.log('itemstyle', itemStyle);
    return (
      <div className={`recent-channel-item-container ${!!activityItem.thumb ? 'lg' : 'sm'}`} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={itemStyle}>
        <Link to={route}>
          <ChannelImage thumb={activityItem.thumb} channels={channels} type={type} />
          <ChannelDetails hover={hover} title={title} channels={channels}/>
        </Link>
      </div>
    );
  }
}

export default RecentChannelItem;
