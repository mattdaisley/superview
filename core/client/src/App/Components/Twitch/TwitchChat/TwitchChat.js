import React from 'react';
import PropTypes from 'prop-types';

import TwitchChatItem from './TwitchChatItem';

import { withStyles } from 'material-ui/styles';

    
// let colors = ['red', 'green', 'cyan', 'yellow', 'maroon', 'purple', 'olive', 'navy', 'teal', 'aqua', 'fuchsia']
// let color = colors[Math.floor(Math.random()*colors.length)]
let color = '#ccc';

const styles = theme => ({
  root: {
    border: '1px solid #ccc', 
    boxSizing: 'border-box',
    backgroundColor: color,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      minWidth: '400px', 
      height:'100%', 
    },
    [theme.breakpoints.down('md')]: {
      width: '100%', 
      height: 'calc(100vw)', 
      marginBottom: '80px',
    },
  },
  hidden: {
    display: 'none'
  }
})

class TwitchChat extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('TwitchChat props', props);
  // }

  render() {
    const { chatChannels, selectedChannel, hideChannelsList, classes} = this.props

    let hiddenClass = ( !!hideChannelsList ) ? classes.hidden : '';
      
    return (
      <div className={['flex-item', hiddenClass, classes.root].join(' ')}>
        { !!selectedChannel && (
          chatChannels.map( channel => {
            return (
              <TwitchChatItem key={channel} id={channel} className={ (selectedChannel.id.toLowerCase() !== channel.toLowerCase() ) ? classes.hidden : '' }/> 
            )
          })
        )}
      </div>
    );
  }
}

TwitchChat.propTypes = {
  chatChannels: PropTypes.arrayOf(PropTypes.string),
  selectedChannel: PropTypes.object,
  hideChannelsList: PropTypes.bool.isRequired
}

const TwitchChatWithStyles = withStyles(styles)(TwitchChat);
export default TwitchChatWithStyles;
