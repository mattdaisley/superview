import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Input from 'material-ui/Input';

import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';
import SearchIcon from 'material-ui-icons/Search';


const ChannelListEdit = (props) => {

  let parentClassName = '';
  if( props.className !== undefined ){
    parentClassName = props.className
  }


  const channelAvatars = props.channels.map( channel => {
    const title = channel.title.length > 50 ? channel.title.slice(0,50) + '...' : channel.title;
    return (
      <ListItem key={channel.title}>
        <Avatar alt={channel.title} className="channel-avatar" src={channel.logo}></Avatar>
        <ListItemText primary={title} secondary={channel.name} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    // <Button fab aria-label={channel.title} key={channel.id} className="action">
      //   <Avatar />
      // </Button>
    )
  })

  console.log(props);

  let searchPlaceholderText = 'Twitch Channel or YouTube Video ID'
  if ( props.source === 'tw' ) searchPlaceholderText = 'Twitch channel';
  if ( props.source === 'yt' ) searchPlaceholderText = 'YouTube Video ID';

  return (
    <div className={'player-channel-list-container edit ' + parentClassName}>
      { props.channels.length > 0 &&
        <List>
          {channelAvatars}
          <Divider />
        </List>
      }
      <List>
        <ListItem>
          <div className="search-icon"><SearchIcon /></div>
          <Input
            placeholder={searchPlaceholderText}
            fullWidth
            inputProps={{
              'aria-label': 'Search Channel',
            }}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <Button color="primary" aria-label="edit" className="action" onClick={props.onEditToggle}>
          Done
        </Button>
      </List>
    </div>
  );
}

ChannelListEdit.propTypes = {
  source: PropTypes.string,
  channels: PropTypes.arrayOf( PropTypes.object ).isRequired,
  className: PropTypes.any,
  onEditToggle: PropTypes.func,
}

export default ChannelListEdit;