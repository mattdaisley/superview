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
      if (process.env.NODE_ENV === 'development') {
        twitchEmbed.src='http://player.twitch.tv/js/embed/v1.js';
      } else if (process.env.NODE_ENV === 'production') {
        twitchEmbed.src='https://player.twitch.tv/js/embed/v1.js';
      }
      
      document.getElementsByTagName('head')[0].appendChild(twitchEmbed);
    }
    this.props.registerPlayer('tw', this.props.id, {});
  }
  
  componentDidMount() {
    let intervalId = setInterval( this.onTwitchReady , 100 );
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount() {
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
    this.props.registerPlayer('tw', this.props.id, this.Player);
  }

  render() {

    let {id} = this.props;
    return (
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
