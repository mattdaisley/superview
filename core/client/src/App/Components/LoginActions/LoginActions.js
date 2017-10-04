import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import { getTwitchLoginStatus, twitchLogout }    from '../../Redux/Twitch/TwitchActionCreators';
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
  loginActions: {
    width: '100%',
    padding: 25,
    boxSizing: 'border-box'
  },
  loginActionsButton: {
    marginRight: 25
  },
  inSideNav: {
    width: '100%',
    marginTop: 15
  },
  twitchLoginLogout: {
    color: '#fff',
    backgroundColor: '#653F99',
  },
  youtubeLoginLogout: {
    color: '#fff',
    backgroundColor: '#FB0013',
  }
})

class LoginActions extends React.Component {
  
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

    const twitchButtonClasses = [ classes.loginActionsButton, classes.twitchLoginLogout ]
    if ( !this.props.isInHeader ) {
      twitchButtonClasses.push( classes.inSideNav )
    }
    const youtubeButtonClasses = [ classes.loginActionsButton, classes.youtubeLoginLogout ]
    if ( !this.props.isInHeader ) {
      youtubeButtonClasses.push( classes.inSideNav )
    }

    return (
      <div className={ (!!this.props.isInHeader) ? classes.loginActionsHeader : classes.loginActions }>
        <span>{ (!!this.props.isInHeader).toString() } { (!!this.props.twitchLoggedIn).toString() } { (!!this.props.youtubeLoggedIn).toString() }</span>
        { !this.props.twitchLoggedIn && <Button className={twitchButtonClasses.join(' ')} onClick={this.twitchLogin}>Login to Twitch</Button> }
        { (!!this.props.twitchLoggedIn && !this.props.isInHeader) && <Button className={twitchButtonClasses.join(' ')} onClick={this.props.twitchLogout}>Logout of Twitch</Button> }
        
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
  }
}
const mapDispatchToProps = dispatch => ({
  twitchLogout: ()          => dispatch(twitchLogout()),
  getTwitchLoginStatus: ()  => dispatch(getTwitchLoginStatus()),
  youtubeLogout: ()         => dispatch(youtubeLogout()),
  getYoutubeLoginStatus: () => dispatch(getYoutubeLoginStatus()),
})

const LoginActionsWithStyles = withStyles(styles)(LoginActions);

export default connect(mapStateToProps, mapDispatchToProps)(LoginActionsWithStyles);

