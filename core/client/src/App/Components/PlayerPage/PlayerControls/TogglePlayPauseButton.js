import React from 'react';
import PropTypes from 'prop-types';

import PlayButton  from './PlayButton';
import PauseButton from './PauseButton';

const PlayPauseButton = (props) => {

  return (
    <span>
      { !!(props.playing === false) &&
        <PlayButton color={props.color} togglePlayPause={props.togglePlayPause}/>
      }
      { !!(props.playing === true) &&
        <PauseButton color={props.color} togglePlayPause={props.togglePlayPause}/>
      }
    </span>
  )
}

PlayPauseButton.propTypes = {
  playing:         PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  color: PropTypes.oneOf(['accent', 'primary','inherit','default'])
}

export default PlayPauseButton
