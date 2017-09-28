import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({ })

class TwitchChatItem extends React.Component {
  
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

    let {id} = this.props,
      chatUrl;

    if (process.env.NODE_ENV === 'development') {
      chatUrl = 'http://www.twitch.tv/'+id+'/chat';
    } else if (process.env.NODE_ENV === 'production') {
      chatUrl = 'https://www.twitch.tv/'+id+'/chat';
    }

    return (
      <iframe frameBorder="0"
        scrolling="yes"
        id={id}
        title={id}
        src={chatUrl}
        height={opts.height}
        width={opts.width}
        className={this.props.className}>
      </iframe>
    );
  }
}

TwitchChatItem.propTypes = {
  id: PropTypes.string.isRequired
}

const TwitchChatItemWithStyles = withStyles(styles)(TwitchChatItem);
// export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithStyles);
export default TwitchChatItemWithStyles;
