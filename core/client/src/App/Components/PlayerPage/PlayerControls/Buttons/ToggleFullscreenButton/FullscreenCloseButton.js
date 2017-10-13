import React     from 'react';
import PropTypes from 'prop-types';

import Tooltip        from 'material-ui/Tooltip';
import IconButton         from 'material-ui/IconButton';
import FullscreenExitIcon from 'material-ui-icons/FullscreenExit';

const FullscreenCloseBotton = (props) => {

  return (
    <Tooltip id="tooltip-icon" title="Exit full screen" placement="top">
      <IconButton color={props.color} aria-label="Toggle Fullscreen" onClick={props.toggleFullScreen}>
        <FullscreenExitIcon/>
      </IconButton>
    </Tooltip>
  )

}

FullscreenCloseBotton.propTypes = {
  toggleFullScreen: PropTypes.func,
  color: PropTypes.oneOf(['accent', 'primary','inherit','default']),
}

export default FullscreenCloseBotton;
