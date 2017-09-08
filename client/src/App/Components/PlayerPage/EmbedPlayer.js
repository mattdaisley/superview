import React from 'react';
import PropTypes from 'prop-types';

import YouTube from 'react-youtube';

import TwitchPlayer from '../../Components/Twitch/TwitchPlayer'

class EmbedPlayer extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }

  render() {
    
    let parentClassName = '';
    if(this.props.className !== undefined){
      parentClassName = this.props.className
    }
    
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1
      }
    };

    let {source, id} = this.props;

    let colors = ['red', 'green', 'cyan', 'yellow', 'maroon', 'purple', 'olive', 'navy', 'teal', 'aqua', 'fuchsia']
    let color = colors[Math.floor(Math.random()*colors.length)]

    return (
      <div className={"Player flex-item " + parentClassName} style={{backgroundColor:color}}>
      {/* <div className={"Player flex-item " + parentClassName}> */}
        {/* { !!(source === 'yt') &&
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
        } */}
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
