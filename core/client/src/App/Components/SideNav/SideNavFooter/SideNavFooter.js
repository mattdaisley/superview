import React from 'react';
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  footerWrapper: {
    flex: 'none',
    alignSelf: 'flex-end',
    width: '100%',
  },
  footerWrapperHidden: {
    display: 'none',
  },
  footer: {
    boxSizing: 'border-box',
    padding: 25,
    fontSize: 14,
    color: '#444444'
  }
})

class SideNavActions extends React.Component {
  
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    
    const { isSideNavOpen, classes} = this.props
    
    const footerWrapperClasses = [ classes.footerWrapper ];
    if ( !isSideNavOpen ) footerWrapperClasses.push(classes.footerWrapperHidden)

    return (
      <div className={footerWrapperClasses.join(' ')} >
        <Divider />
        <div className={classes.footer}>&copy; 2017 SuperView</div>
      </div>
    );
  }
}

SideNavActions.propTypes = {
  isSideNavOpen: PropTypes.bool,
}

export default withStyles(styles)(SideNavActions);