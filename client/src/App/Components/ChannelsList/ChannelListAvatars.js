import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import AddIcon from 'material-ui-icons/Add';

const ChannelsListAvatars = (props) => {

  let parentClassName = '';
  if( props.className !== undefined ){
    parentClassName = props.className
  }

  const channelAvatars = props.channels.map( channel => {
    console.log(channel);
    return (
      <Button fab aria-label={channel.title} key={channel.id} className="action">
        <Avatar alt={channel.title} className="channel-avatar" src={channel.logo} />
      </Button>
    )
  })

  return (
    <div className={'player-channel-list-container ' + parentClassName}>
      {channelAvatars}
      <Button fab color="accent" aria-label="edit" className="action" onClick={props.onEditToggle}>
        { props.channels.length > 0 && <ModeEditIcon /> }
        { props.channels.length === 0 && <AddIcon /> }
      </Button>
    </div>
  );
}

ChannelsListAvatars.propTypes = {
  channels: PropTypes.arrayOf( PropTypes.object ).isRequired,
  className: PropTypes.any,
  onEditToggle: PropTypes.func,
}

export default ChannelsListAvatars;