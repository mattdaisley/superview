import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import LoginActions from '../../LoginActions/LoginActions'


const styles = theme => ({
  loginActionsWrapper: {
    display: 'block',
  },
  loginActionsWrapperHidden: {
    display: 'none',
  },
})

class SideNavLoginActions extends React.Component {
  
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    
    const { isSideNavOpen, classes} = this.props
    
    const loginActionsWrapperClasses = [ classes.loginActionsWrapper ];
    if ( !isSideNavOpen ) {
      loginActionsWrapperClasses.push(classes.loginActionsWrapperHidden)
    }

    return (
      <div className={loginActionsWrapperClasses.join(' ')} >
        <LoginActions />
      </div>
    );
  }
}

SideNavLoginActions.propTypes = {
  isSideNavOpen: PropTypes.bool,
}

export default withStyles(styles)(SideNavLoginActions);