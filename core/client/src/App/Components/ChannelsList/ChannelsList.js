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

    this.onEditToggle   = this.onEditToggle.bind(this);
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  onEditToggle(channels) {

    if ( channels && channels.length > 0 ) {
      const newChannelNames = channels.map( channel => {
        if ( channel.source_type && channel.source_type === 'tw' ) return channel.channel.name
        if ( channel.source_type && channel.source_type === 'yt' ) return channel.id
        return channel.id
      } )
      const oldChannelNames = this.props.sources.map( channel => {
        if ( channel.source_type && channel.source_type === 'tw' ) return channel.channel.name
        if ( channel.source_type && channel.source_type === 'yt' ) return channel.id
        return channel.id
      } )
      if ( !PlayerUtils.compareArrays(newChannelNames, oldChannelNames) ) {
        let pathname = '/'+ channels[0].source_type + '/' + newChannelNames.join('/');
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
        { this.state.mode === 'list' && 
          <ChannelListAvatars 
            sources={this.props.sources} 
            className={parentClassName} 
            onEditToggle={this.onEditToggle} 
          /> 
        }
        { this.state.mode === 'edit' && 
          <ChannelListEdit 
            source={this.props.source} 
            sources={this.props.sources} 
            className={parentClassName} 
            onEditToggle={this.onEditToggle} 
          /> 
        }
      </div>
    );
  }
}

ChannelsList.propTypes = {
  source: PropTypes.string,
  sources: PropTypes.arrayOf( 
    PropTypes.object
  ).isRequired,
  className: PropTypes.any,
}

export default ChannelsList;