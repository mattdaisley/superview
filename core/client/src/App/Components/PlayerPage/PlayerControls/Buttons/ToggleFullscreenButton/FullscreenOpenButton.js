import React     from 'react';
import PropTypes from 'prop-types';

import IconButton     from 'material-ui/IconButton';
import FullscreenIcon from 'material-ui-icons/Fullscreen';

const FullscreenOpenButton = (props) => {

  return (
    <IconButton color={props.color} aria-label="Toggle Fullscreen" onClick={props.toggleFullScreen}>
      <FullscreenIcon/>
    </IconButton>
  )

}

FullscreenOpenButton.propTypes = {
  toggleFullScreen: PropTypes.func,
  color: PropTypes.oneOf(['accent', 'primary','inherit','default']),
}

export default FullscreenOpenButton;
