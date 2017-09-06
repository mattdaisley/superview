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

    this.state = {
      playing: true
    }

    this.togglePlayPause = this.togglePlayPause.bind(this);
  }

  togglePlayPause() {
    this.setState((prevState, props) => {
      return {
        playing: !prevState.playing
      };
    });
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
                <IconButton aria-label="Menu">
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