import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

class Header extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }
  
  render() {

    const HeaderStyle = {
      backgroundColor: 'white'
    }

    return (
      <AppBar position="fixed" className="top-nav-app-bar" style={HeaderStyle}>
        <Toolbar disableGutters className="flex">
          <div className="menu-button-wrapper">
            <IconButton className="menu-button" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </div>

          <Typography type="title" className="App-logo-text flex-item-grow">
            SuperView
          </Typography>

          <Button>Login</Button>
        </Toolbar>
      </AppBar>
      
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

Header.defaultProps = {
  title: 'SuperView'
}


export default withStyles()(Header);