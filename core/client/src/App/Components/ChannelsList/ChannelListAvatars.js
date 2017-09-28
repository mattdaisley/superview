import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import AddIcon from 'material-ui-icons/Add';
import ChatIcon from 'material-ui-icons/Chat';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  action: {
    display: 'block',
    margin: '0 auto 10px',
  },
  progress: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  chat: {
    color: '#448aff',
    position: 'absolute',
    top: -6,
    right: -12,
  }
})

const ChannelListAvatars = (props) => {
  let parentClassName = '';
  if( props.className !== undefined ){
    parentClassName = props.className
  }

  const sourcesList = props.channels.map( (source, index) => {  
    if ( !!source.state && source.state === 'loading' ) {
      return <CircularProgress key={source.id} className={[props.classes.action, props.classes.progress].join(' ')} />
    } else {
      return (
        <Button fab aria-label={source.channel.title} key={source.id} className={props.classes.action} onClick={() => props.setChatChannel(source)}>
          <Avatar alt={source.channel.title} className="channel-avatar" src={source.channel.logo} />
          { (!!props.chatChannel && props.chatChannel.id === source.id && props.chatChannel.source_type === 'tw' ) && <ChatIcon className={props.classes.chat}/> }
        </Button>
      )
    }
  })

  return (
    <div className={'player-channel-list-container ' + parentClassName}>
      {sourcesList}
      <Button fab color="accent" aria-label="edit" className={props.classes.action} onClick={props.onEditToggle}>
        { props.channels.length > 0 && <ModeEditIcon /> }
        { props.channels.length === 0 && <AddIcon /> }
      </Button>
    </div>
  );
}

ChannelListAvatars.propTypes = {
  channels: PropTypes.arrayOf( PropTypes.object ).isRequired,
  chatChannel: PropTypes.object,
  className: PropTypes.any,
  onEditToggle: PropTypes.func,
  setChatChannel: PropTypes.func,
}


const ChannelListAvatarsWithStyles = withStyles(styles)(ChannelListAvatars);

export default ChannelListAvatarsWithStyles;