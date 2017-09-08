import React     from 'react';
import PropTypes from 'prop-types';

import FullscreenOpenButton  from './FullscreenOpenButton';
import FullscreenCloseButton from './FullscreenCloseButton';


class ToggleFullscreenButton extends React.Component {
  
  constructor(props) {
    super(props);

    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.fullScreenChangeListener = this.fullScreenChangeListener.bind(this);
    
    if (document.addEventListener) {
      document.addEventListener('webkitfullscreenchange', this.fullScreenChangeListener, false);
      document.addEventListener('mozfullscreenchange', this.fullScreenChangeListener, false);
      document.addEventListener('fullscreenchange', this.fullScreenChangeListener, false);
      document.addEventListener('MSFullscreenChange', this.fullScreenChangeListener, false);
    }
  }

  toggleFullScreen() {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      let element = document.getElementById(this.props.fullscreenContainer);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }

  fullScreenChangeListener() {
    this.props.toggleFullScreen();
  }

  render() {
    return (
      <span>
        { !!(this.props.isFullscreen === false) &&
          <FullscreenOpenButton toggleFullScreen={this.toggleFullScreen}/>
        }
        { !!(this.props.isFullscreen === true) &&
          <FullscreenCloseButton toggleFullScreen={this.toggleFullScreen}/>
        }
      </span>
    )
  }
}

ToggleFullscreenButton.propTypes = {
  fullscreenContainer: PropTypes.string,
  isFullscreen:     PropTypes.bool,
  toggleFullScreen: PropTypes.func,
}

export default ToggleFullscreenButton;
