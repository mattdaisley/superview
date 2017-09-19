import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { registerPlayer, deRegisterPlayer } from '../../Redux/Player/PlayerActionCreators';

class TwitchPlayer extends React.Component {
  
  constructor(props) {
    super(props);

    this.onTwitchReady = this.onTwitchReady.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
  }

  componentWillMount() {
    if ( !window.Twitch ) {
      let twitchEmbed = document.createElement('script');
      twitchEmbed.src='http://player.twitch.tv/js/embed/v1.js';
      
      document.getElementsByTagName('head')[0].appendChild(twitchEmbed);
    }
    console.log('calling register player');
    this.props.registerPlayer('tw', this.props.id, {});
  }
  
  componentDidMount() {
    let intervalId = setInterval( this.onTwitchReady , 100 );
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount() {
    console.log('calling deregister player');
    this.props.deRegisterPlayer('tw', this.props.id);
    if ( !window.Twitch ) {
      this.Player.removeEventListener(window.Twitch.Player.READY);
    }
  }

  onTwitchReady() {
    if (window.Twitch && window.Twitch.Player && window.Twitch.Player instanceof Function) {
      clearInterval(this.state.intervalId)

      var options = {
        width: '100%',
        height: '100%',
        channel: this.props.id,
        playsinline: true,
      };
      this.Player = new window.Twitch.Player("player-"+this.props.id, options);
      this.Player.addEventListener(window.Twitch.Player.READY, this.onPlayerReady);
    }
  }

  onPlayerReady() {
    console.log('calling register player');
    this.props.registerPlayer('tw', this.props.id, this.Player);
  }

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
    // let playerUrl;

    // if (process.env.NODE_ENV === 'development') {
    //   playerUrl = 'http://player.twitch.tv/?channel='+id;
    // } else if (process.env.NODE_ENV === 'production') {
    //   playerUrl = 'https://player.twitch.tv/?channel='+id;
    // }

    return (
      // <iframe
      //   src={playerUrl}
      //   title={id}
      //   height="100%"
      //   width="100%"
      //   frameBorder="0"
      //   scrolling="no"
      //   allowFullScreen="true">
      // </iframe>
      <div id={"player-"+id} style={{width: '100%', height: '100%'}}></div>
    );
  }
}

const mapStateToProps = state => {
  return { }
}

const mapDispatchToProps = dispatch => ({
  registerPlayer: (sourceType, sourceId, playerObject) => dispatch(registerPlayer(sourceType, sourceId, playerObject)),
  deRegisterPlayer: (sourceType, sourceId) => dispatch(deRegisterPlayer(sourceType, sourceId)),
})

TwitchPlayer.propTypes = {
  id: PropTypes.string.isRequired
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitchPlayer);
