import React     from 'react';
import PropTypes from 'prop-types';

import IconButton     from 'material-ui/IconButton';
import FullscreenIcon from 'material-ui-icons/Fullscreen';

const FullscreenOpenButton = (props) => {

  return (
    <IconButton aria-label="Toggle Fullscreen" onClick={props.toggleFullScreen}>
      <FullscreenIcon/>
    </IconButton>
  )

}

FullscreenOpenButton.propTypes = {
  toggleFullScreen: PropTypes.func
}

export default FullscreenOpenButton;
