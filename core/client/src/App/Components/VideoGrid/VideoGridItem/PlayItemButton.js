import React     from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IconButton    from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  playButton: {
    position: 'absolute',
    marginLeft: -40,
    marginBottom: -40,
    left: '50%',
    color: 'white',
    bottom: '67%'
  },
  playButtonOut: {
    opacity: 0,
    transition: [
      theme.transitions.create('opactiy', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
  playButtonHover: {
    opacity: 1,
    transition: [
      theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
  playHover: {
    color: '#448aff'
  },
  playHoverDim: {
    opacity: .2
  }
})

const overrideStyles = {
  playButton: {
    background: 'rgba(0,0,0,.6)',
    borderRadius: 50,
    border: '2px solid white',
    height: 80,
    width: 80,
  },
  playArrowIcon: {
    width: 50,
    height: 50,
  }
}

class PlayItemButton extends React.PureComponent {
  
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {
      hover,
      addHover,
      playHover,
      windowWidth
    } = this.props;
  
  
    const classes = this.props.classes
    
    let playButtonClass = [ classes.playButton ];


    if ( windowWidth <= 1280 ) { 
      playButtonClass.push(classes.playHover)
    } else {
      if ( !!hover ) { playButtonClass.push(classes.playButtonHover) } else { playButtonClass.push(classes.playButtonOut) };
      if ( !!addHover ) { 
        playButtonClass.push(classes.playHoverDim) 
      } else {
        if ( !!playHover ) { playButtonClass.push(classes.playHover) };
      }
    }
    
    // console.log(classes, addButtonClass)
    return (
      <IconButton style={overrideStyles.playButton} color="accent" aria-label="edit" className={playButtonClass.join(' ')}>
        <PlayArrowIcon style={overrideStyles.playArrowIcon} />
      </IconButton>
    );
  }
} 

PlayItemButton.propTypes = {
  hover: PropTypes.bool,
  addHover: PropTypes.bool,
  playHover: PropTypes.bool,
}

const mapStateToProps = state => {
  return {
    windowWidth: state.window.width,
    windowHeight: state.window.height,
  }
}
const mapDispatchToProps = dispatch => ({

})

const PlayItemButtonWithStyles = withStyles(styles)(PlayItemButton);

export default connect(mapStateToProps, mapDispatchToProps)(PlayItemButtonWithStyles);