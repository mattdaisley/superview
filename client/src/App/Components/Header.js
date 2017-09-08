import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLoginStatus, twitchLogin, twitchLogout } from '../Redux/ActionCreators';

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

  componentWillMount() {
    this.props.getLoginStatus();
    console.log(this.props.loggedIn);
  }
  
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

          { !this.props.loggedIn && <Button className="twitch-login-logout" onClick={this.props.twitchLogin}>Login to Twitch</Button> }
          { !!this.props.loggedIn && <Button className="twitch-login-logout" onClick={this.props.twitchLogout}>Logout of Twitch</Button> }
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

const mapStateToProps = state => {
  return {
    loggedIn: state.twitchOauth.loggedIn
  }
}
const mapDispatchToProps = dispatch => ({
  twitchLogin: () => dispatch(twitchLogin()),
  twitchLogout: () => dispatch(twitchLogout()),
  getLoginStatus: () => dispatch(getLoginStatus())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);