import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import TwitchChatItem from './TwitchChatItem';

    
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
      height: '100vh', 
      marginBottom: 124,
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
    const { chatChannels, selectedChannel, hideChannelsList, classes, chatHeight} = this.props

    let hiddenClass = ( !!hideChannelsList ) ? classes.hidden : '';

    // 414x736 device dimensions
    // 414x380
    // const chatHeight = windowHeight - 56 - 50 - ( windowWidth * 9/16 )
    const chatStyle = { minHeight: chatHeight }
    // 736 - 56 - 70 - ( 414 * 9/16 )
      
    return (
      <div className={['flex-item', hiddenClass, classes.root].join(' ')} style={chatStyle}>
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

const mapStateToProps = state => ({ })

const mapDispatchToProps = dispatch => ({ })

const TwitchChatWithStyles = withStyles(styles)(TwitchChat);

export default connect(mapStateToProps, mapDispatchToProps)(TwitchChatWithStyles);