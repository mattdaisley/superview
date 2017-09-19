import React from 'react';
import PropTypes from 'prop-types';

import TwitchPlayer from '../../Components/Twitch/TwitchPlayer'
import YouTubePlayer from '../../Components/YouTube/YouTubePlayer'

class EmbedPlayer extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }

  shouldComponentUpdate(nextProps) {
    if ( nextProps.className !== this.props.className ) return true;
    if ( nextProps.id === this.props.id ) return false;
    return true;
  }

  render() {
    
    let parentClassName = '';
    if(this.props.className !== undefined){
      parentClassName = this.props.className
    }

    let {source, id} = this.props;

    // let colors = ['red', 'green', 'cyan', 'yellow', 'maroon', 'purple', 'olive', 'navy', 'teal', 'aqua', 'fuchsia']
    // let color = colors[Math.floor(Math.random()*colors.length)]

    return (
      // <div className={"Player flex-item " + parentClassName} style={{backgroundColor:color}}>
      <div className={"flex-item " + parentClassName}>
        {/* {id} */}
        { !!(source === 'yt') &&
          <YouTubePlayer id={id} />
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
  id: PropTypes.string.isRequired,
}

export default EmbedPlayer;
