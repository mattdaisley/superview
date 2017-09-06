import React from 'react';
// import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

// import logo from '../../logo.svg';

// import { white } from 'material-ui/colors';

// const primary = white[500]; // #F44336

class Header extends React.Component {
  render() {

    const HeaderStyle = {
      backgroundColor: 'white'
    }

    return (
      <AppBar position="static" className="top-nav-app-bar" style={HeaderStyle}>
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
      // <header>
      //   <nav>
      //     <ul className="flex flex-vertical">
      //       <li className="flex-item app-logo-wrapper"><img src={logo} className="App-logo" alt="logo" /></li>
      //       <li className="flex-item">
      //         <ul className="flex flex-vertical top-nav-items">
      //           <li className="flex-item"><Link to='/'>Home</Link></li>
      //           <li className="flex-item"><Link to='/recents'>Recents</Link></li>
      //           <li className="flex-item-grow"></li>
      //         </ul>
      //       </li>
      //     </ul>
      //   </nav>
      // </header>
    );
  }
}

export default withStyles()(Header);