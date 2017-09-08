import React     from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import TogglePlayPauseButton from './TogglePlayPauseButton';

const MainControls = (props) => {

  return (
    <div className="controls-container main-controls flex-item-grow">
      <Grid className="controls-grid" container spacing={0} direction="row" align="center" justify="center">
        <Grid item>
          <TogglePlayPauseButton playing={props.playing} togglePlayPause={props.togglePlayPause}/>
        </Grid>
      </Grid>
    </div>
  )

}

MainControls.propTypes = {
  playing: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired
}

export default MainControls
