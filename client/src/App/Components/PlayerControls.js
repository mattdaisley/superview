import React from 'react';

import Grid          from 'material-ui/Grid';
// import BottomNavigation from 'material-ui/BottomNavigation';
import Toolbar       from 'material-ui/Toolbar';
// import Typography    from 'material-ui/Typography';
// import Button        from 'material-ui/Button';
import IconButton    from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import PauseIcon     from 'material-ui-icons/Pause';
import FullscreenIcon from 'material-ui-icons/Fullscreen';
import SettingsIcon  from 'material-ui-icons/Settings';


class PlayerControls extends React.Component {
  
  constructor(props) {
    super(props);
    console.log('PlayerControls props', props);

    this.state = {
      playing: true
    }

    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  togglePlayPause() {
    this.setState((prevState, props) => {
      return {
        playing: !prevState.playing
      };
    });
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
      let element = document.getElementById('player-wrapper');
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
    this.props.onFullScreenChange();
  }

  render() {

    return (
      <div className="player-controls">
        <Toolbar className="player-controls-nav">
          <div className="controls-container left-controls flex-item">
          </div>

          <div className="controls-container main-controls flex-item-grow">
            <Grid className="controls-grid" container spacing={0} direction="row" align="center" justify="center">
              <Grid item>
                { !!(this.state.playing === false) &&
                  <IconButton className="player-controls-pause" aria-label="Play" onClick={this.togglePlayPause}>
                    <PlayArrowIcon className="play-arrow"/>
                  </IconButton>
                }
                { !!(this.state.playing === true) &&
                  <IconButton className="player-controls-pause" aria-label="Pause" onClick={this.togglePlayPause}>
                    <PauseIcon className="pause"/>
                  </IconButton>
                }
              </Grid>
            </Grid>
          </div>

          <div className="controls-container right-controls flex-item">
            <Grid className="controls-grid" container spacing={0} direction="row" align="center" justify="center">
              <Grid item>
                <IconButton aria-label="Menu">
                  <SettingsIcon/>
                </IconButton>
                <IconButton aria-label="Menu" onClick={this.toggleFullScreen}>
                  <FullscreenIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </div>
    );
  }
}

export default PlayerControls;