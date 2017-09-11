import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import AddIcon from 'material-ui-icons/Add';


class ChannelsList extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   console.log('ChannelsList props', props);
  // }

  render() {
    let parentClassName = '';
    if(this.props.className !== undefined){
      parentClassName = this.props.className
    }

    const channelAvatars = this.props.channels.map( channel => {
      return (
        <Button fab aria-label={channel.title} key={channel.id} className="action">
          <Avatar alt={channel.title} className="channel-avatar" src={channel.logo} />
        </Button>
      )
    })

    return (
      <div className={'player-channel-list-container ' + parentClassName}>
        {channelAvatars}
        <Button fab color="accent" aria-label="edit" className="action">
          { this.props.channels.length > 0 && <ModeEditIcon /> }
          { this.props.channels.length === 0 && <AddIcon /> }
        </Button>
      </div>
    );
  }
}

ChannelsList.propTypes = {
  channels: PropTypes.arrayOf( 
    PropTypes.object
  ).isRequired,
  className: PropTypes.any
}

export default ChannelsList;