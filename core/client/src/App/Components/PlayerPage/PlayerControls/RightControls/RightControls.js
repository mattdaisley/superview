import React     from 'react';
import PropTypes from 'prop-types';

import Grid           from 'material-ui/Grid';
import Tooltip        from 'material-ui/Tooltip';
import IconButton     from 'material-ui/IconButton';
import ViewModuleIcon from 'material-ui-icons/ViewModule';

import ToggleFullscreenButton from '../Buttons/ToggleFullscreenButton/ToggleFullscreenButton';

const MainControls = (props) => {
  console.log(props)
  return (
    <div className="controls-container right-controls flex-item">
      <Grid className="controls-grid" container spacing={0} direction="row" align="center" justify="center">
        <Grid item>
          { (!!props.onLayoutChange) && (
            <Tooltip id="tooltip-icon" title="Change Layout" placement="top">
              <IconButton color="accent" aria-label="Menu" onClick={() => props.onLayoutChange()}>
                <ViewModuleIcon/>
              </IconButton>
            </Tooltip>
          )}
          <ToggleFullscreenButton color="accent" fullscreenContainer={props.fullscreenContainer} isFullscreen={props.isFullscreen} toggleFullScreen={props.toggleFullScreen}/>
        </Grid>
      </Grid>
    </div>
  )

}

MainControls.propTypes = {
  fullscreenContainer: PropTypes.string,
  isFullscreen: PropTypes.bool,
  toggleFullScreen: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func,
}

export default MainControls
