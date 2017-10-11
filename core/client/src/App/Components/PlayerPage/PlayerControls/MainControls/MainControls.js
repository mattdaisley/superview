import React     from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';

import TogglePlayPauseButton from '../Buttons/TogglePlayPauseButton/TogglePlayPauseButton';


const styles = theme => ({
  container: {
    height: '100%',
    flexGrow: 1
  },
  fullscreen: {
    backgroundColor: 'transparent',
    borderTop: '2px solid #444',
  },
  nav: {
    height: '100%'
  }
})

const MainControls = (props) => {

  const { classes } = props

  return (
    <Grid className={classes.container} container spacing={0} direction="row" align="center" justify="center">
      <Grid item>
        <TogglePlayPauseButton color="accent" playing={props.playing} togglePlayPause={props.togglePlayPause}/>
      </Grid>
    </Grid>
  )

}

MainControls.propTypes = {
  playing: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired
}


const MainControlsStyles = withStyles(styles)(MainControls);

export default MainControlsStyles
