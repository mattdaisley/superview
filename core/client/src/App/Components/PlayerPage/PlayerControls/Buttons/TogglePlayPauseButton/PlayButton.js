import React     from 'react';
import PropTypes from 'prop-types';

import Tooltip        from 'material-ui/Tooltip';
import IconButton    from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';

const PlayButton = (props) => {
  return (
    <Tooltip id="tooltip-icon" title="Play" placement="top">
      <IconButton color={props.color} className="player-controls-play" aria-label="Play" onClick={props.togglePlayPause}>
        <PlayArrowIcon className="play-arrow"/>
      </IconButton>
    </Tooltip>
  )

}

PlayButton.propTypes = {
  togglePlayPause: PropTypes.func,
  color: PropTypes.oneOf(['accent', 'primary','inherit','default']),
}

export default PlayButton;
