import React from 'react';
import PropTypes from 'prop-types';

import ChannelListAvatars from './ChannelListAvatars';
import ChannelListEdit    from './ChannelListEdit';

import PlayerUtils from '../../Components/PlayerPage/PlayerUtils';


class ChannelsList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      mode: 'list',
    }

    this.onEditToggle = this.onEditToggle.bind(this);
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  onEditToggle(channels) {
    if ( channels && channels.length > 0 ) {
      // console.log('toggle', channels, this.props.channels);
      const newChannelNames = channels.map( channel => channel.name )
      const oldChannelNames = this.props.channels.map( channel => channel.name )
      console.log(newChannelNames, oldChannelNames);
      if ( !PlayerUtils.compareArrays(newChannelNames, oldChannelNames) ) {
        let pathname = '/'+this.props.source + '/' + newChannelNames.join('/');
        this.context.router.history.push(pathname);
      }
    }

    if ( this.state.mode === 'list' ) this.setState( {mode: 'edit'} )
    if ( this.state.mode === 'edit' ) this.setState( {mode: 'list'} )
  }

  render() {
    let parentClassName = '';
    if(this.props.className !== undefined){
      parentClassName = this.props.className
    }

    return (
      <div>
        { this.state.mode === 'list' && <ChannelListAvatars channels={this.props.channels} className={parentClassName} onEditToggle={this.onEditToggle}/> }
        { this.state.mode === 'edit' && <ChannelListEdit source={this.props.source} channels={this.props.channels} className={parentClassName} onEditToggle={this.onEditToggle}/> }
      </div>
    );
  }
}

ChannelsList.propTypes = {
  source: PropTypes.string,
  channels: PropTypes.arrayOf( 
    PropTypes.object
  ).isRequired,
  className: PropTypes.any
}

export default ChannelsList;