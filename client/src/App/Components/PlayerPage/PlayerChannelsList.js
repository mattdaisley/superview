import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';


class PlayerChannelsList extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   console.log('PlayerChannelsList props', props);
  // }

  render() {

    let parentClassName = '';
    if(this.props.className !== undefined){
      parentClassName = this.props.className
    }

    const channelAvatars = this.props.channels.map( channel => {
      return (
        <Button aria-label={channel.name} key={channel.name}>
          <Avatar alt={channel.name} className="channel-avatar" src={channel.logo} />
        </Button>
      )
    })

    return (
      <div className={'player-channel-list-container ' + parentClassName}>
        {channelAvatars}
        <Button aria-label="edit">
          <ModeEditIcon />
        </Button>
      </div>
    );
  }
}

PlayerChannelsList.propTypes = {
  channels: PropTypes.arrayOf( 
    PropTypes.object
  ).isRequired,
  className: PropTypes.any
}

export default PlayerChannelsList;