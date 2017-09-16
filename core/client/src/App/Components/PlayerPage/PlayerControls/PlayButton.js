import React     from 'react';
import PropTypes from 'prop-types';

import IconButton    from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';

const PlayButton = (props) => {
  console.log('PlayButton', props.color)
  return (
    <IconButton color={props.color} className="player-controls-play" aria-label="Play" onClick={props.togglePlayPause}>
      <PlayArrowIcon className="play-arrow"/>
    </IconButton>
  )

}

PlayButton.propTypes = {
  togglePlayPause: PropTypes.func,
  color: PropTypes.oneOf(['accent', 'primary','inherit','default']),
}

export default PlayButton;
