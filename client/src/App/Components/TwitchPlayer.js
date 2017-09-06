import React from 'react';

class TwitchPlayer extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1
      }
    };

    return (
      <iframe
        src={'http://player.twitch.tv/?channel='+this.props.id}
        title={this.props.id}
        height={opts.height}
        width={opts.width}
        frameBorder="0"
        scrolling="no"
        allowFullScreen="true">
      </iframe>
    );
  }
}

export default TwitchPlayer;