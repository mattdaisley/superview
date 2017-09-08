import React from 'react';
import PropTypes from 'prop-types';

import YouTube from 'react-youtube';

import TwitchPlayer from '../Components/TwitchPlayer'

class EmbedPlayer extends React.Component {
  
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

    let {source, id} = this.props;

    return (
      <div className="Player flex-item">
        { !!(source === 'yt') &&
          <YouTube
            videoId={id}
            opts={opts}
            onReady={this._onReady}
          />
        }

        { !!(source === 'tw') &&
          <TwitchPlayer
            id={id}
          />
        }
      </div>
    );
  }
  
   _onReady(event) {
     // access to player in all event handlers via event.target 
    //  event.target.pauseVideo();
   }
}

EmbedPlayer.propTypes = {
  source: PropTypes.oneOf(['tw', 'yt']).isRequired,
  id: PropTypes.string.isRequired
}

export default EmbedPlayer;
