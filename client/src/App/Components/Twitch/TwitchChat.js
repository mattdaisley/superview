import React from 'react';
import PropTypes from 'prop-types';

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

    let {id} = this.props;
    
    let colors = ['red', 'green', 'cyan', 'yellow', 'maroon', 'purple', 'olive', 'navy', 'teal', 'aqua', 'fuchsia']
    let color = colors[Math.floor(Math.random()*colors.length)]
    // let color = '#ccc';

    return (
      <div style={{width: '400px', height:'100%', backgroundColor: color, border: '1px solid #ccc', boxSizing: 'border-box'}} className={'flex-item hidden-'+this.props.hideChannelsList}>
        {/* <iframe frameBorder="0"
          scrolling="yes"
          id={id}
          title={id}
          src={'http://www.twitch.tv/'+id+'/chat'}
          height={opts.height}
          width={opts.width}>
        </iframe> */}
      </div>
    );
  }
}

TwitchChat.propTypes = {
  id: PropTypes.string.isRequired,
  hideChannelsList: PropTypes.bool.isRequired
}

export default TwitchChat;
