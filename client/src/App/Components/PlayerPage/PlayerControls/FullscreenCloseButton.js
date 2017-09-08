import React     from 'react';
import PropTypes from 'prop-types';

import IconButton         from 'material-ui/IconButton';
import FullscreenExitIcon from 'material-ui-icons/FullscreenExit';

const FullscreenCloseBotton = (props) => {

  return (
    <IconButton aria-label="Toggle Fullscreen" onClick={props.toggleFullScreen}>
      <FullscreenExitIcon/>
    </IconButton>
  )

}

FullscreenCloseBotton.propTypes = {
  toggleFullScreen: PropTypes.func
}

export default FullscreenCloseBotton;
