import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import { getTwitchLoginStatus, twitchLogin, twitchLogout }    from '../Redux/Twitch/TwitchActionCreators';
import { getYoutubeLoginStatus, youtubeLogin, youtubeLogout } from '../Redux/Youtube/YoutubeActionCreators';

import AppBar     from 'material-ui/AppBar';
import Toolbar    from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon   from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import LoginActions from './LoginActions/LoginActions';


const styles = theme => ({
  loginActions: {
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  topNavAppBar: {
    backgroundColor: 'white',
    zIndex: 11000,
    position: 'fixed',
    overflow: 'hidden',
  },
  menuButtonWrapper: {
    marginLeft: 25,
    marginRight: 25,
  }
})

class Header extends React.Component {
  
  constructor(props) {
    super(props);

    this.twitchLogin  = this.twitchLogin.bind(this);
    this.youtubeLogin = this.youtubeLogin.bind(this);
  }

  componentWillMount() {
    this.props.getTwitchLoginStatus();
    this.props.getYoutubeLoginStatus();
  }

  twitchLogin() {
    switch (process.env.NODE_ENV) {
      case 'development':
        window.location.replace('http://127.0.0.1:3000/oauth2/twitch');
        break;
      case 'production':
      default:
        window.location.replace('https://auth.superview.tv/oauth2/twitch');
        break;
    }
  }
  
  youtubeLogin() {
    switch (process.env.NODE_ENV) {
      case 'development':
        window.location.replace('http://127.0.0.1:3000/oauth2/google');
        break;
      case 'production':
      default:
        window.location.replace('https://auth.superview.tv/oauth2/google');
        break;
    }
  }

  render() {

    const classes = this.props.classes;

    return (
      <AppBar position="fixed" className={classNames(classes.topNavAppBar, this.props.isSideNavOpen && classes.topNavAppBarShift)}>
        <Toolbar disableGutters className="flex">
          <div className={classes.menuButtonWrapper}>
            { !this.props.isSideNavOpen && (
              <IconButton className="menu-button" aria-label="Menu" onClick={this.props.handleSideNavOpen}>
                <MenuIcon />
              </IconButton>
            )}

            { !!this.props.isSideNavOpen && (
              <IconButton className="menu-button" onClick={this.props.handleSideNavClose}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </div>

          <Typography type="title" className="App-logo-text flex-item-grow">
            SuperView
          </Typography>

          <LoginActions isInHeader={true}/>

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
  title: PropTypes.string.isRequired,
  handleSideNavOpen: PropTypes.func,
  isSideNavOpen: PropTypes.bool,
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
  twitchLogin: (referrer)   => dispatch(twitchLogin(referrer)),
  twitchLogout: ()          => dispatch(twitchLogout()),
  getTwitchLoginStatus: ()  => dispatch(getTwitchLoginStatus()),
  youtubeLogin: (referrer)  => dispatch(youtubeLogin(referrer)),
  youtubeLogout: ()         => dispatch(youtubeLogout()),
  getYoutubeLoginStatus: () => dispatch(getYoutubeLoginStatus()),
})

const HeaderWithStyles = withStyles(styles)(Header);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithStyles);