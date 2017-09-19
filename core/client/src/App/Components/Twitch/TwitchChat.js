import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

    
// let colors = ['red', 'green', 'cyan', 'yellow', 'maroon', 'purple', 'olive', 'navy', 'teal', 'aqua', 'fuchsia']
// let color = colors[Math.floor(Math.random()*colors.length)]
let color = '#ccc';

const styles = theme => ({
  root: {
    border: '1px solid #ccc', 
    boxSizing: 'border-box',
    backgroundColor: color,
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
})

class TwitchChat extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('TwitchChat props', props);
  // }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1
      }
    };

    let {id, classes} = this.props,
      chatUrl;

    if (process.env.NODE_ENV === 'development') {
      chatUrl = 'http://www.twitch.tv/'+id+'/chat';
    } else if (process.env.NODE_ENV === 'production') {
      chatUrl = 'https://www.twitch.tv/'+id+'/chat';
    }

    return (
      <div className={['flex-item','hidden-'+this.props.hideChannelsList, classes.root].join(' ')}>
        <iframe frameBorder="0"
          scrolling="yes"
          id={id}
          title={id}
          src={chatUrl}
          height={opts.height}
          width={opts.width}>
        </iframe>
      </div>
    );
  }
}

TwitchChat.propTypes = {
  id: PropTypes.string.isRequired,
  hideChannelsList: PropTypes.bool.isRequired
}

const TwitchChatWithStyles = withStyles(styles)(TwitchChat);
// export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithStyles);
export default TwitchChatWithStyles;
