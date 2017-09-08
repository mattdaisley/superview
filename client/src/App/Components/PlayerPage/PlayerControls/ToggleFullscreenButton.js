import React     from 'react';
import PropTypes from 'prop-types';

import FullscreenOpenButton  from './FullscreenOpenButton';
import FullscreenCloseButton from './FullscreenCloseButton';

const ToggleFullscreenButton = (props) => {

  return (
    <span>
      { !!(props.isFullscreen === false) &&
        <FullscreenOpenButton toggleFullScreen={props.toggleFullScreen}/>
      }
      { !!(props.isFullscreen === true) &&
        <FullscreenCloseButton toggleFullScreen={props.toggleFullScreen}/>
      }
    </span>
  )

}

ToggleFullscreenButton.propTypes = {
  isFullscreen:       PropTypes.bool,
  toggleFullScreen: PropTypes.func
}

export default ToggleFullscreenButton;
