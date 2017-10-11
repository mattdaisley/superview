import React     from 'react';
import PropTypes from 'prop-types';

import Grid           from 'material-ui/Grid';
// import IconButton     from 'material-ui/IconButton';
// import SettingsIcon   from 'material-ui-icons/Settings';

import ToggleFullscreenButton from '../Buttons/ToggleFullscreenButton/ToggleFullscreenButton';

const MainControls = (props) => {

  return (
    <div className="controls-container right-controls flex-item">
      <Grid className="controls-grid" container spacing={0} direction="row" align="center" justify="center">
        <Grid item>
          {/* <IconButton color="accent" aria-label="Menu">
            <SettingsIcon/>
          </IconButton> */}
          <ToggleFullscreenButton color="accent" fullscreenContainer={props.fullscreenContainer} isFullscreen={props.isFullscreen} toggleFullScreen={props.toggleFullScreen}/>
        </Grid>
      </Grid>
    </div>
  )

}

MainControls.propTypes = {
  isFullscreen: PropTypes.bool,
  toggleFullScreen: PropTypes.func.isRequired,
  fullscreenContainer: PropTypes.string,
}

export default MainControls