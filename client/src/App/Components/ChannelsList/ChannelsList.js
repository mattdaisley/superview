import React from 'react';
import PropTypes from 'prop-types';

import ChannelListAvatars from './ChannelListAvatars';
import ChannelListEdit    from './ChannelListEdit';


class ChannelsList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      mode: 'edit',
    }

    this.onEditToggle = this.onEditToggle.bind(this);
  }

  onEditToggle() {
    console.log('toggle');
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