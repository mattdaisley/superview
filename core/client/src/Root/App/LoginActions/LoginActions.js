import React       from 'react';
import PropTypes   from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import LoginActionsButton from './LoginActionsButton/LoginActionsButton.js';

// import { getTwitchProfile, getTwitchLoginStatus, twitchLogout }    from '../../Redux/Twitch/TwitchActionCreators';
// import { getGoogleProfile, getYoutubeLoginStatus, youtubeLogout }  from '../../Redux/Youtube/YoutubeActionCreators';
import { twitchAuthActionCreators } from '../store/modules/twitch/twitchAuth'
import { twitchApiActionCreators }  from '../store/modules/twitch/twitchApi'
import { googleAuthActionCreators } from '../store/modules/google/googleAuth'
import { googleApiActionCreators }  from '../store/modules/google/googleApi'

const styles = theme => ({
  loginActionsHeader: {
    height: 64,
    // flex: 1,
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  loginActions: {
    width: '100%',
    padding: 25,
    boxSizing: 'border-box'
  },
})

class LoginActions extends React.Component {
  
  constructor(props) {
    super(props);

    this.twitchLogin  = this.twitchLogin.bind(this);
    this.youtubeLogin = this.youtubeLogin.bind(this);
    this.state = {
      twitchLoadingProfile: true,
      googleLoadingProfile: true,
    }
  }

  componentWillMount() {
    this.props.getTwitchLoginStatus();
    this.props.getGoogleLoginStatus();
  }

  componentDidMount() {
    if ( !!this.props.isInHeader ) {
      this.props.getTwitchProfile();
      this.props.getGoogleProfile();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( !!nextProps.twitchProfile ) {
      this.setState({twitchLoadingProfile:false, twitchProfile: nextProps.twitchProfile})
    } 
    if ( !!nextProps.googleProfile ) {
      this.setState({googleLoadingProfile:false, googleProfile: nextProps.googleProfile})
    } 
  }

  twitchLogin() {
    switch (process.env.NODE_ENV) {
      case 'development':
        window.location.replace('http://127.0.0.1:3000/oauth2/twitch');
        break;
      case 'production':
      default:
        // window.location.replace('http://127.0.0.1:3000/oauth2/twitch');
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
        // window.location.replace('http://127.0.0.1:3000/oauth2/google');
        window.location.replace('https://auth.superview.tv/oauth2/google');
        break;
    }
  }

  render() {
    const { isInHeader, twitchLoggedIn, twitchLogout, googleLoggedIn, googleLogout, classes } = this.props;

    return (
      <div className={ (!!isInHeader) ? classes.loginActionsHeader : classes.loginActions }>
        <LoginActionsButton 
          sourceType="tw"
          sourceLoggedIn={twitchLoggedIn}
          onLoginClick={this.twitchLogin}
          onLogoutClick={twitchLogout}
          profile={this.state.twitchProfile}
          isInHeader={isInHeader}
          />
        
        <LoginActionsButton 
          sourceType="yt"
          sourceLoggedIn={googleLoggedIn}
          onLoginClick={this.youtubeLogin}
          onLogoutClick={googleLogout}
          profile={this.state.googleProfile}
          isInHeader={isInHeader}
          /> 
      </div>
    );
  }
}

LoginActions.propTypes = {
  isInHeader: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    twitchLoggedIn:  state.twitchAuth.loggedIn,
    twitchProfile: state.twitchApi.profile,
    googleLoggedIn: state.googleAuth.loggedIn,
    googleProfile: state.googleApi.profile,
  }
}
// const mapDispatchToProps = dispatch => ({
//   twitchLogout: ()          => dispatch(twitchLogout()),
//   getTwitchLoginStatus: ()  => dispatch(getTwitchLoginStatus()),
//   // youtubeLogout: ()         => dispatch(youtubeLogout()),
//   // getYoutubeLoginStatus: () => dispatch(getYoutubeLoginStatus()),
//   // getTwitchProfile: ()      => dispatch(getTwitchProfile()),
//   // getGoogleProfile: ()      => dispatch(getGoogleProfile()),
// })

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...twitchAuthActionCreators,
    ...twitchApiActionCreators,
    ...googleAuthActionCreators,
    ...googleApiActionCreators,
  }, dispatch)
)

const LoginActionsWithStyles = withStyles(styles)(LoginActions);

export default connect(mapStateToProps, mapDispatchToProps)(LoginActionsWithStyles);

