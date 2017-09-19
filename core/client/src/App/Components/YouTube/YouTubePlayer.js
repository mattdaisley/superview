import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import YouTube from 'react-youtube';

import { registerPlayer, deRegisterPlayer } from '../../Redux/Player/PlayerActionCreators';

class YouTubePlayer extends React.Component {
  
  constructor(props) {
    super(props);

    this.onPlayerReady = this.onPlayerReady.bind(this);
  }


  componentWillMount() {
  }

  componentWillUnmount() {
    this.props.deRegisterPlayer('yt', this.props.id);
  }

  onPlayerReady(event) {
    this.Player = event.target;
    this.props.registerPlayer('yt', this.props.id, this.Player);
  }

  render() {
    
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1
      }
    };

    let {id} = this.props;

    return (
      <YouTube
        videoId={id}
        opts={opts}
        onReady={this.onPlayerReady}
      />
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

YouTubePlayer.propTypes = {
  id: PropTypes.string.isRequired
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(YouTubePlayer);
