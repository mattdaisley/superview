import React     from 'react';
import PropTypes from 'prop-types';

import Tooltip        from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import PauseIcon  from 'material-ui-icons/Pause';

const PlayButton = (props) => {

  return (
    <Tooltip id="tooltip-icon" title="Pause" placement="top">
      <IconButton color={props.color} className="player-controls-pause" aria-label="Pause" onClick={props.togglePlayPause}>
        <PauseIcon className="pause"/>
      </IconButton>
    </Tooltip>
  )

}

PlayButton.propTypes = {
  togglePlayPause: PropTypes.func,
  color: PropTypes.oneOf(['accent', 'primary','inherit','default']),
}

export default PlayButton
