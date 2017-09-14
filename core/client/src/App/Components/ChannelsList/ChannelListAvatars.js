import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import AddIcon from 'material-ui-icons/Add';

const ChannelListAvatars = (props) => {

  let parentClassName = '';
  if( props.className !== undefined ){
    parentClassName = props.className
  }

  const sourcesList = props.sources.map( source => {
    return (
      <Button fab aria-label={source.channel.title} key={source.id} className="action">
        <Avatar alt={source.channel.title} className="channel-avatar" src={source.channel.logo} />
      </Button>
    )
  })

  return (
    <div className={'player-channel-list-container ' + parentClassName}>
      {sourcesList}
      <Button fab color="accent" aria-label="edit" className="action" onClick={props.onEditToggle}>
        { props.sources.length > 0 && <ModeEditIcon /> }
        { props.sources.length === 0 && <AddIcon /> }
      </Button>
    </div>
  );
}

ChannelListAvatars.propTypes = {
  sources: PropTypes.arrayOf( PropTypes.object ).isRequired,
  className: PropTypes.any,
  onEditToggle: PropTypes.func,
}

export default ChannelListAvatars;