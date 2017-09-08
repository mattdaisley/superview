import React     from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import PauseIcon  from 'material-ui-icons/Pause';

const PlayButton = (props) => {

  return (
    <IconButton className="player-controls-pause" aria-label="Pause" onClick={props.togglePlayPause}>
      <PauseIcon className="pause"/>
    </IconButton>
  )

}

PlayButton.propTypes = {
  togglePlayPause: PropTypes.func
}

export default PlayButton
