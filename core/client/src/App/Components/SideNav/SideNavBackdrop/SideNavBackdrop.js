import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  backdrop: {
    width:'100%', 
    height:'100%', 
    position: 'fixed', 
    zIndex: 11000, 
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  hidden: {
    display: 'none'
  }
})

class SideNavBackdrop extends React.Component {
  
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    
    const { isSideNavOpen, onClick, classes} = this.props
    
    const backdropClasses = [ classes.backdrop ];
    if ( !isSideNavOpen ) {
      backdropClasses.push(classes.hidden)
    }

    return (
      <div className={backdropClasses.join(' ')} onClick={onClick} ></div>
    );
  }
}

SideNavBackdrop.propTypes = {
  isSideNavOpen: PropTypes.func,
  onClick: PropTypes.func,
}

export default withStyles(styles)(SideNavBackdrop);