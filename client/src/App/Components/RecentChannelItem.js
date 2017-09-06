import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ChannelImage extends Component {

  render() {

    const type = this.props.type;
    const channels = this.props.channels;
    const imgSize = channels.length < 2 ? 'image-lg' : 'image-sm';
    const images = channels.map( (channel, index) => 
      <div className={imgSize} key={index}><img src={channel.thumbUri} alt={channel.name}/></div>
    );

    return (
      <div className={type + ' image-wrapper'}>
        {images}
      </div>
    );
  }
} 

class ChannelDetails extends Component {

  render() {

    const hover = this.props.hover;
    const title = this.props.title;
    const channels = this.props.channels;
    const links = channels.map( (channel, index) => (
      <span key={index}>
        {channel.name}
        {(() => {
          if (index !== channels.length-1) { return (<span>/</span>) }
        })()}
      </span>
    ));

    return (
      <div className={hover + ' details'}>
        <div><Link to='/'>{title}</Link></div>
        <a className="channel-link" href="http://youtube.com">{links}</a>
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
    const type = this.props.activityItem.type;
    const route = this.props.activityItem.route;
    const title = this.props.activityItem.title;
    const channels = this.props.activityItem.channels;
    return (
      <div className="recent-channel-item-container" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Link to={route}><ChannelImage channels={channels} type={type} /></Link>
        <ChannelDetails hover={hover} title={title} channels={channels}/>
      </div>
    );
  }
}

export default RecentChannelItem;
