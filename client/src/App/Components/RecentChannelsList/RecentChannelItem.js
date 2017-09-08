import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RecentChannelImage from './RecentChannelImage';
import RecentChannelDetails from './RecentChannelDetails';

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

    let itemStyle = !!thumb ? { width: thumb.width } : {}
    let itemClasses = ['recent-channel-item-container'];

    return (
      <div className={itemClasses.join(' ')} style={itemStyle} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Link to={route}>
          <RecentChannelImage thumb={thumb} channels={channels} type={type} />
          <RecentChannelDetails hover={hover} title={title} channels={channels}/>
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

export default RecentChannelItem;
