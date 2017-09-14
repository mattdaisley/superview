import React from 'react';
import PropTypes from 'prop-types';

class TwitchPlayer extends React.Component {
  
  // constructor(props) {
    // super(props);
    // console.log('TwitchPlayer props', props);

    // this.onTwitchReady = this.onTwitchReady.bind(this);
  // }

  componentWillMount() {
    // if ( !window.Twitch ) {
    //   let twitchEmbed = document.createElement('script');
    //   twitchEmbed.src='http://player.twitch.tv/js/embed/v1.js';
      
    //   document.getElementsByTagName('head')[0].appendChild(twitchEmbed);
    // }
  }
  
  componentDidMount() {
    let intervalId = setInterval( this.onTwitchReady , 100 );
    this.setState({intervalId: intervalId})
  }

  // onTwitchReady() {
  //   if (window.Twitch && window.Twitch.Player && window.Twitch.Player instanceof Function) {
  //     clearInterval(this.state.intervalId)

  //     var options = {
  //       width: '100%',
  //       height: '100%',
  //       channel: this.props.id,
  //     };
  //     // this.Player = new window.Twitch.Player("player-"+this.props.id, options);
  //     // this.Player.setVolume(0.5);
  //   }
  // }

  pause() {}
  play() {}
  seek(timestamp) {}
  setChannel(channel) {}
  setCollection(collectionId, videoId) {}
  setQuality(quality) {}
  setVideo(videoId) {}
  
  getMuted() {}
  setMuted(muted) {}
  getVolume() {}
  setVolume(volumelevel) {}
  
  getChannel() {}
  getCurrentTime() {}
  getDuration() {}
  getEnded() {}
  getPlaybackStats() {}
  getQualities() {}
  getQuality() {}
  getVideo() {}
  isPaused() {}

  render() {
    let {id} = this.props;

    return (
      <iframe
        src={'http://player.twitch.tv/?channel='+id}
        title={id}
        height="100%"
        width="100%"
        frameBorder="0"
        scrolling="no"
        allowFullScreen="true">
      </iframe>
      // <div id={"player-"+id} style={{width: '100%', height: '100%'}}></div>
    );
  }
}

TwitchPlayer.propTypes = {
  id: PropTypes.string.isRequired
}

export default TwitchPlayer;
