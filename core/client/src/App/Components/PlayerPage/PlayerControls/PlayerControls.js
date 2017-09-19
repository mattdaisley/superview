import React     from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppBar         from 'material-ui/AppBar';
import Toolbar        from 'material-ui/Toolbar';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';
import common from 'material-ui/colors/common';

import MainControls   from './MainControls';
import RightControls  from './RightControls';

import { play, pause } from '../../../Redux/Player/PlayerActionCreators';

class PlayerControls extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log('PlayerControls props', props);

    this.state = {
      isFullscreen: false
    }

    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  togglePlayPause() {
    if ( this.props.playing ) this.props.pause();
    if ( !this.props.playing ) this.props.play();
  }

  toggleFullScreen() {
    this.setState((prevState, props) => {
      return {
        isFullscreen: !prevState.isFullscreen
      };
    });
    this.props.onFullScreenChange();
  }

  render() {
    
    const lightTheme = createMuiTheme({
      palette: {
        primary: { ...grey, 500: grey[50] },
        secondary: blue
      },
    });
    const darkTheme = createMuiTheme({
      palette: {
        primary: { ...grey, 500: common.transparent },
        secondary: { ...grey, 500: grey[50] }
      },
    })

    const theme = (this.state.isFullscreen) ? darkTheme : lightTheme;

    return (
      <div className={['player-controls', this.props.className].join(' ')}>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary" className="player-controls-nav" >
            <Toolbar>

              {/* left controls */}
              <div className="controls-container left-controls flex-item">
              </div>
              {/* left controls */}

              <MainControls playing={this.props.playing} togglePlayPause={this.togglePlayPause}/>
              <RightControls fullscreenContainer={this.props.fullscreenContainer} isFullscreen={this.state.isFullscreen} toggleFullScreen={this.toggleFullScreen}/>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playing: state.player.playing,
  }
}

const mapDispatchToProps = dispatch => ({
  play:  () => dispatch(play()),
  pause: () => dispatch(pause()),
})

PlayerControls.propTypes = {
  onFullScreenChange: PropTypes.func,
  fullscreenContainer: PropTypes.string,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerControls);