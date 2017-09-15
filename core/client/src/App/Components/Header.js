import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import { getTwitchLoginStatus, twitchLogin, twitchLogout }    from '../Redux/Twitch/TwitchActionCreators';
import { getYoutubeLoginStatus, youtubeLogin, youtubeLogout } from '../Redux/Youtube/YoutubeActionCreators';

import AppBar     from 'material-ui/AppBar';
import Toolbar    from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button     from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon   from 'material-ui-icons/Menu';

class Header extends React.Component {
  
  constructor(props) {
    super(props);

    this.twitchLogin  = this.twitchLogin.bind(this);
    this.youtubeLogin = this.youtubeLogin.bind(this);
  }

  componentWillMount() {
    this.props.getTwitchLoginStatus();
    this.props.getYoutubeLoginStatus();
    // console.log(this.props.loggedIn);
  }

  twitchLogin() {
    this.props.twitchLogin( window.location.href );
  }
  
  youtubeLogin() {
    this.props.youtubeLogin( window.location.href );
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
            - SuperView
          </Typography>

          { !this.props.twitchLoggedIn && <Button className="twitch-login-logout" onClick={this.twitchLogin}>Login to Twitch</Button> }
          { !this.props.youtubeLoggedIn && <Button className="youtube-login-logout" onClick={this.youtubeLogin}>Login to YouTube</Button> }
          {/* { !!this.props.loggedIn && <Button className="twitch-login-logout" onClick={this.props.twitchLogout}>Logout of Twitch</Button> } */}
        </Toolbar>
        { this.props.messages.length > 0 && (
          <div className="messages-container">
            <div className={this.props.messages[0].type + '-message'}>{this.props.messages[0].message}</div>
          </div>
        )}
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
    twitchLoggedIn:  state.twitchOauth.loggedIn,
    youtubeLoggedIn: state.youtubeOauth.loggedIn,
    messages: state.messages.messages,
  }
}
const mapDispatchToProps = dispatch => ({
  twitchLogin: (referrer)           => dispatch(twitchLogin(referrer)),
  twitchLogout: ()          => dispatch(twitchLogout()),
  getTwitchLoginStatus: ()  => dispatch(getTwitchLoginStatus()),
  youtubeLogin: (referrer)  => dispatch(youtubeLogin(referrer)),
  youtubeLogout: ()         => dispatch(youtubeLogout()),
  getYoutubeLoginStatus: () => dispatch(getYoutubeLoginStatus()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);