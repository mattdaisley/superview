import React     from 'react';
import PropTypes from 'prop-types';

import Toolbar        from 'material-ui/Toolbar';

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

    return (
      <div className="player-controls">
        <Toolbar className="player-controls-nav">

          {/* left controls */}
          <div className="controls-container left-controls flex-item">
          </div>
          {/* left controls */}

          <MainControls playing={this.state.playing} togglePlayPause={this.togglePlayPause}/>
          <RightControls isFullscreen={this.state.isFullscreen} toggleFullScreen={this.toggleFullScreen}/>
        </Toolbar>
      </div>
    );
  }
}

PlayerControls.propTypes = {
  onFullScreenChange: PropTypes.func
}

export default PlayerControls;