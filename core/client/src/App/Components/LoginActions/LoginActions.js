import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import { getTwitchProfile, getTwitchLoginStatus, twitchLogout }    from '../../Redux/Twitch/TwitchActionCreators';
import { getYoutubeLoginStatus, youtubeLogout } from '../../Redux/Youtube/YoutubeActionCreators';

import Button     from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  loginActionsHeader: {
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  inSideNav: {
    width: '100%',
    marginTop: 15
  },
  isInHeader: {
    position: 'absolute',
    top: 15,
  },
  loginActions: {
    width: '100%',
    padding: 25,
    boxSizing: 'border-box'
  },
  loginActionsButton: {
    minWidth: 175,
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
  loginActionsButtonOut: {
    top: -100,
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
  twitchLoginLogout: {
    color: '#fff',
    backgroundColor: '#653F99',
  },
  twitchLoginLogoutInHeader: {
    right: 225,
  },
  twitchProfile: {
    position: 'absolute',
    right: 200,
    top: 9,
    display: 'inline-block',
    padding: '15px 25px',
    color: '#444',
    fontSize: 14,
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.standard,
    }),
  },
  twitchProfileOut: {
    top: 100,
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.standard,
    }),
  },
  youtubeLoginLogout: {
    color: '#fff',
    backgroundColor: '#FB0013',
  },
  youtubeLoginLogoutInHeader: {
    right: 25,
  },
})

class LoginActions extends React.Component {
  
  constructor(props) {
    super(props);

    this.twitchLogin  = this.twitchLogin.bind(this);
    this.youtubeLogin = this.youtubeLogin.bind(this);
    this.state = {
      twitchLoadingProfile: true
    }
  }

  componentWillMount() {
    this.props.getTwitchLoginStatus();
    this.props.getYoutubeLoginStatus();
  }

  componentDidMount() {
    if ( !!this.props.isInHeader ) {
      this.props.getTwitchProfile();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if ( !!nextProps.twitchProfile ) {
      this.setState({twitchLoadingProfile:false, twitchProfile: nextProps.twitchProfile})
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
        window.location.replace('https://auth.superview.tv/oauth2/google');
        break;
    }
  }

  render() {

    const classes = this.props.classes;

    const twitchButtonClasses = [ classes.loginActionsButton, classes.twitchLoginLogout ]
    if ( !this.props.isInHeader ) {
      twitchButtonClasses.push( classes.inSideNav )
    } else if ( !!this.props.isInHeader ) {
      twitchButtonClasses.push( classes.twitchLoginLogoutInHeader, classes.isInHeader )
      if ( !!this.props.twitchLoggedIn || this.state.twitchLoadingProfile ) {
        twitchButtonClasses.push( classes.loginActionsButtonOut )
      }
    }
    
    const twitchProfileClass = [ classes.twitchProfile ]
    if ( !this.props.twitchProfile ) {
      twitchProfileClass.push( classes.twitchProfileOut )
    }
    console.log(this.props, this.state)
    
    const youtubeButtonClasses = [ classes.loginActionsButton, classes.youtubeLoginLogout ]
    if ( !this.props.isInHeader ) {
      youtubeButtonClasses.push( classes.inSideNav )
    } else {
      youtubeButtonClasses.push( classes.youtubeLoginLogoutInHeader, classes.isInHeader )
    }

    return (
      <div className={ (!!this.props.isInHeader) ? classes.loginActionsHeader : classes.loginActions }>
        { (!this.props.twitchLoggedIn || !!this.props.isInHeader) && <Button className={twitchButtonClasses.join(' ')} onClick={this.twitchLogin}>Login to Twitch</Button> }
        { (!!this.props.twitchLoggedIn && !this.props.isInHeader) && <Button className={twitchButtonClasses.join(' ')} onClick={this.props.twitchLogout}>Logout of Twitch</Button> }
        { (!!this.props.isInHeader) && <div className={twitchProfileClass.join(' ')}>{ ((this.state.twitchProfile) ? this.state.twitchProfile.display_name:null) }</div> } 
        
        { !this.props.youtubeLoggedIn && <Button className={youtubeButtonClasses.join(' ')} onClick={this.youtubeLogin}>Login to YouTube</Button> }
        { (!!this.props.youtubeLoggedIn && !this.props.isInHeader) && <Button className={youtubeButtonClasses.join(' ')} onClick={this.props.youtubeLogout}>Logout of YouTube</Button> }
      </div>
    );
  }
}

LoginActions.propTypes = {
  isInHeader: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    twitchLoggedIn:  state.twitchOauth.loggedIn,
    youtubeLoggedIn: state.youtubeOauth.loggedIn,
    twitchProfile: state.twitchBrowse.twitchProfile,
  }
}
const mapDispatchToProps = dispatch => ({
  twitchLogout: ()          => dispatch(twitchLogout()),
  getTwitchLoginStatus: ()  => dispatch(getTwitchLoginStatus()),
  youtubeLogout: ()         => dispatch(youtubeLogout()),
  getYoutubeLoginStatus: () => dispatch(getYoutubeLoginStatus()),
  getTwitchProfile: ()      => dispatch(getTwitchProfile()),
})

const LoginActionsWithStyles = withStyles(styles)(LoginActions);

export default connect(mapStateToProps, mapDispatchToProps)(LoginActionsWithStyles);

