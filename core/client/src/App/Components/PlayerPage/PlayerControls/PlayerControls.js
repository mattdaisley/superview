import React     from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import blue    from 'material-ui/colors/blue';
import grey    from 'material-ui/colors/grey';
import common  from 'material-ui/colors/common';
import AppBar  from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import MainControls   from './MainControls/MainControls';
import RightControls  from './RightControls/RightControls';

import { play, pause } from '../../../Redux/Player/PlayerActionCreators';

    
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

const styles = theme => ({
  playerControls: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
    boxShadow: '0px -2px 4px -1px rgba(0, 0, 0, 0.2), 0px -4px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12)',
    zIndex: 10000
  },
  fullscreen: {
    backgroundColor: 'transparent',
    borderTop: '2px solid #444',
  },
  nav: {
    height: '100%'
  },
  toolbarRoot: {
    minHeight: '100%'
  },
})

class PlayerControls extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log('PlayerControls props', props);

    this.state = {
      isFullscreen: false
    }

    this.togglePlayPause  = this.togglePlayPause.bind(this);
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

    const { fullscreenContainer, playing, classes } = this.props
    const { isFullscreen } = this.state
    const theme = (isFullscreen) ? darkTheme : lightTheme;

    let playerControlsClass = [classes.playerControls]
    if ( isFullscreen ) playerControlsClass.push(classes.fullscreen)

    return (
      <div className={playerControlsClass.join(' ')}>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary" className={classes.nav} >
            <Toolbar classes={{root: classes.toolbarRoot}}>

              {/* left controls */}
              <div className="controls-container left-controls flex-item">
              </div>
              {/* left controls */}

              <MainControls playing={playing} togglePlayPause={this.togglePlayPause}/>
              <RightControls 
                fullscreenContainer={fullscreenContainer} 
                isFullscreen={isFullscreen} 
                toggleFullScreen={this.toggleFullScreen}
                onLayoutChange={this.props.onLayoutChange}/>
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
  fullscreenContainer: PropTypes.string,
  onFullScreenChange: PropTypes.func,
  onLayoutChange: PropTypes.func,
}

const PlayerControlsStyles = withStyles(styles)(PlayerControls);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControlsStyles);