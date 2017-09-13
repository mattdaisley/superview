import React     from 'react';
import PropTypes from 'prop-types';

import AppBar         from 'material-ui/AppBar';
import Toolbar        from 'material-ui/Toolbar';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';

import MainControls   from './MainControls';
import RightControls  from './RightControls';

class PlayerControls extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log('PlayerControls props', props);

    this.state = {
      playing: true,
      isFullscreen: false
    }

    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  togglePlayPause() {
    console.log('toggle play pause');
    this.setState((prevState, props) => {
      return {
        playing: !prevState.playing
      };
    });
  }

  toggleFullScreen() {
    console.log('PlayerControls got toggleFullscreen');
    this.setState((prevState, props) => {
      return {
        isFullscreen: !prevState.isFullscreen
      };
    });
    this.props.onFullScreenChange();
  }

  render() {
    
    const theme = createMuiTheme({
      palette: {
        primary: { ...grey, 500: grey[50] },
        accent: grey,
        secondary: blue,
        background: {
          dark: '#000000'
        }
      },
    });

    return (
      <div className={['player-controls', this.props.className].join(' ')}>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary" className="player-controls-nav" >
            <Toolbar>

              {/* left controls */}
              <div className="controls-container left-controls flex-item">
              </div>
              {/* left controls */}

              <MainControls playing={this.state.playing} togglePlayPause={this.togglePlayPause}/>
              <RightControls fullscreenContainer={this.props.fullscreenContainer} isFullscreen={this.state.isFullscreen} toggleFullScreen={this.toggleFullScreen}/>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

PlayerControls.propTypes = {
  onFullScreenChange: PropTypes.func,
  fullscreenContainer: PropTypes.string,
}

export default PlayerControls;