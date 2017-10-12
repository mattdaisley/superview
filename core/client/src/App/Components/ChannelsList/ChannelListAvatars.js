import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import PlayerArrowIcon from 'material-ui-icons/PlayArrow';
import ChatIcon from 'material-ui-icons/Chat';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  channelListAvatarsWrapper: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row-reverse'
    },
  },
  channelAvatarItem: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      margin: '0 auto 10px',
    },
    [theme.breakpoints.down('md')]: {
      width: 40,
      height: 40,
      margin: '8px 4px',
    },
  },
  avatar: {
    [theme.breakpoints.up('md')]: {
      width: 56,
      height: 56,
    },
    [theme.breakpoints.down('md')]: {
      width: 40,
      height: 40,
    },
  },
  progress: {
    [theme.breakpoints.up('md')]: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  chat: {
    color: '#448aff',
    position: 'absolute',
    top: -6,
    right: -12,
  },
  editButton: {
    minWidth: 50,
    lineHeight: '1.5em'
  }
})

const ChannelListAvatars = (props) => {

  const classes = props.classes;

  let channelListAvatarsWrapper = [ 'player-channel-list-container', classes.channelListAvatarsWrapper ];
  if ( props.className !== undefined ) channelListAvatarsWrapper.push(props.className)


  const sourcesList = props.channels.map( (source, index) => {  
    // if ( index === 0 ) return <CircularProgress style={{width: 40, height: 40}} key={source.id} className={[classes.channelAvatarItem, classes.progress].join(' ')} />
    if ( !!source.state && source.state === 'loading' ) {
      return <CircularProgress style={{width: 40, height: 40}} key={source.id} className={[classes.channelAvatarItem, classes.progress].join(' ')} />
    } else {
      return (
        <Button fab aria-label={source.channel.title} key={source.id} className={classes.channelAvatarItem} onClick={() => props.setChatChannel(source)}>
          <Avatar alt={source.channel.title} className={classes.avatar} src={source.channel.logo} />
          { (!!props.chatChannel && props.chatChannel.id === source.id && props.chatChannel.source_type === 'tw' ) && <ChatIcon className={classes.chat}/> }
        </Button>
      )
    }
  })

  let playButton = null
  if ( (props.openState === 'closed' || props.openState === 'minimized') && props.channels.length > 0 ) {
    const channelIds = props.channels.map( (source, index) => source.id )
    const route = '/' + props.channels[0].source_type + '/' + channelIds.join('/');
    playButton = (
      <Link to={route}>
        <Button fab color="accent" aria-label="edit" className={classes.channelAvatarItem} >
          <PlayerArrowIcon />
        </Button>
      </Link>
    )
  }

  return (
    <div className={channelListAvatarsWrapper.join(' ')}>
      { props.channels.length > 0 && <Button className={classes.editButton} color="primary" onClick={props.onEditToggle}>Edit Channels</Button> }
      { sourcesList }
      { playButton }
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

const mapStateToProps = state => {
  return {
    openState: state.player.openState
  }
}
const mapDispatchToProps = dispatch => ({
  // playerOpen:  () => dispatch(playerOpen()),
  // playerClose: () => dispatch(playerClose()),
})


const ChannelListAvatarsWithStyles = withStyles(styles)(ChannelListAvatars);
export default connect(mapStateToProps, mapDispatchToProps)(ChannelListAvatarsWithStyles);