import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import classNames  from 'classnames';

// import { getTwitchLoginStatus, twitchLogin, twitchLogout }    from '../Redux/Twitch/TwitchActionCreators';
// import { getYoutubeLoginStatus, youtubeLogin, youtubeLogout } from '../Redux/Youtube/YoutubeActionCreators';

import AppBar     from 'material-ui/AppBar';
import Toolbar    from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon   from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';

import HeaderLogo from './HeaderLogo/HeaderLogo'
// import Search from '../Components/Search/Search'

import LoginActions from '../LoginActions/LoginActions';

import { openSideNav } from '../store/modules/leftSideNav'


import styles from './styles'

class Header extends React.Component {
  
  // constructor(props) {
  //   super(props);

  //   this.twitchLogin  = this.twitchLogin.bind(this);
  //   this.youtubeLogin = this.youtubeLogin.bind(this);
  // }

  componentWillMount() {
    // this.props.getTwitchLoginStatus();
    // this.props.getYoutubeLoginStatus();
  }

  // twitchLogin() {
  //   switch (process.env.NODE_ENV) {
  //     case 'development':
  //       window.location.replace('http://127.0.0.1:3000/oauth2/twitch');
  //       break;
  //     case 'production':
  //     default:
  //       window.location.replace('https://auth.superview.tv/oauth2/twitch');
  //       break;
  //   }
  // }
  
  // youtubeLogin() {
  //   switch (process.env.NODE_ENV) {
  //     case 'development':
  //       window.location.replace('http://127.0.0.1:3000/oauth2/google');
  //       break;
  //     case 'production':
  //     default:
  //       window.location.replace('https://auth.superview.tv/oauth2/google');
  //       break;
  //   }
  // }

  render() {

    const { isSideNavOpen, openSideNav, classes } = this.props

    return (
      <AppBar position="fixed" className={classNames(classes.topNavAppBar, isSideNavOpen && classes.topNavAppBarShift)}>
        <Toolbar disableGutters className="flex">
          <div className={classes.menuButtonWrapper}>
            <IconButton className="menu-button" aria-label="Menu" onClick={openSideNav}>
              <MenuIcon />
            </IconButton>
          </div>

          <HeaderLogo />

          {/* <Search /> */}

          <LoginActions isInHeader={true}/>

        </Toolbar>
        {/* 
        { messages.length > 0 && (
          <div className="messages-container">
            <div className={messages[0].type + '-message'}>{messages[0].message}</div>
          </div>
        )}
         */}
      </AppBar>
      
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  openSideNav: PropTypes.func,
  isSideNavOpen: PropTypes.bool,
}

Header.defaultProps = {
  title: 'SuperView'
}

const mapStateToProps = state => {
  return {
    // messages: state.messages.messages,
    isSideNavOpen: state.sideNav.isOpen,
  }
}
const mapDispatchToProps = dispatch => ({
  openSideNav: () => dispatch(openSideNav()),
  // twitchLogin: (referrer)   => dispatch(twitchLogin(referrer)),
  // twitchLogout: ()          => dispatch(twitchLogout()),
  // getTwitchLoginStatus: ()  => dispatch(getTwitchLoginStatus()),
  // youtubeLogin: (referrer)  => dispatch(youtubeLogin(referrer)),
  // youtubeLogout: ()         => dispatch(youtubeLogout()),
  // getYoutubeLoginStatus: () => dispatch(getYoutubeLoginStatus()),
})

const HeaderWithStyles = withStyles(styles)(Header);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithStyles);