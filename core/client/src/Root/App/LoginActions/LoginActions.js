import React       from 'react';
import PropTypes   from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import LoginActionsButton from './LoginActionsButton/LoginActionsButton.js';

// import { getTwitchProfile, getTwitchLoginStatus, twitchLogout }    from '../../Redux/Twitch/TwitchActionCreators';
// import { getGoogleProfile, getYoutubeLoginStatus, youtubeLogout }  from '../../Redux/Youtube/YoutubeActionCreators';
import { twitchAuthActionCreators } from '../store/modules/twitch/twitchAuth'
console.log(twitchAuthActionCreators)

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
    // this.youtubeLogin = this.youtubeLogin.bind(this);
    this.state = {
      twitchLoadingProfile: true,
      // googleLoadingProfile: true
    }
  }

  componentWillMount() {
    this.props.getTwitchLoginStatus();
    // this.props.getYoutubeLoginStatus();
  }

  componentDidMount() {
    if ( !!this.props.isInHeader ) {
      // this.props.getTwitchProfile();
      // this.props.getGoogleProfile();
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
    console.log(this.props)

    const { isInHeader, twitchLoggedIn, twitchLogout, classes } = this.props;

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
        
        {/* 
        <LoginActionsButton 
          sourceType="yt"
          sourceLoggedIn={this.props.youtubeLoggedIn}
          onLoginClick={this.youtubeLogin}
          onLogoutClick={() => this.props.youtubeLogout()}
          profile={this.state.googleProfile}
          isInHeader={this.props.isInHeader}
          /> 
        */}
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
    // youtubeLoggedIn: state.youtubeOauth.loggedIn,
    // twitchProfile: state.twitchBrowse.twitchProfile,
    // googleProfile: state.youtubeBrowse.googleProfile,
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
  }, dispatch)
)

const LoginActionsWithStyles = withStyles(styles)(LoginActions);

export default connect(mapStateToProps, mapDispatchToProps)(LoginActionsWithStyles);

