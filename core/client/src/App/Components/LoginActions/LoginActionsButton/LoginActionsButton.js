import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Avatar     from 'material-ui/Avatar';
import Button     from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    height: 64,
    overflow: 'hidden'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create('margin-top', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.standard,
    }),
  },
  wrapperOut: {
    marginTop: 64

  },
  wrapperProfile: {
    marginTop: -64

  },
  wrapperLogin: {
    marginTop: 0
  },
  wrapperLogout: {
    marginTop: -128
  },
  actionStateWrapper: {
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
  },
  profile: {
    display: 'inline-flex',
    padding: '8px 25px',
    color: '#444',
    fontSize: 14,
    alignItems: 'center'
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  avatarTw: {
    border: '2px solid #653F99'
  },
  avatarYt: {
    border: '2px solid #FB0013'
  },
  inSideNav: {
    width: '100%',
  },
  tw: {
    color: '#fff',
    backgroundColor: '#653F99',
  },
  yt: {
    color: '#fff',
    backgroundColor: '#FB0013',
  },
})

class LoginActionsButton extends React.Component {
  
  constructor(props) {
    super(props);
    
    let source;

    if ( this.props.sourceType === 'yt' ) source = 'YouTube';
    if ( this.props.sourceType === 'tw' ) source = 'Twitch';

    this.state = {
      loadingProfile: true,
      isProfileSet: false,
      profile: {},
      source
    }
  }

  componentDidMount() {
    this.checkProfile(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkProfile(nextProps)
  }

  checkProfile( props ) {
    console.log('checkingProfile', props)
    const { sourceType, profile } = props;

    if ( !profile ) return;

    if ( Object.keys(profile).length > 0 ) {
      this.setState({loadingProfile:false, isProfileSet: true, profile: this.formatProfile(sourceType, profile)})
    } else {
      this.setState({loadingProfile:false, isProfileSet: false})
    }
  }

  formatProfile( sourceType, profile ) {
    if ( sourceType === 'yt' ) return { displayName: profile.displayName, avatar: profile.image.url }
    if ( sourceType === 'tw' ) return { displayName: profile.display_name, avatar: (profile.logo || 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png') }
  }

  getLoginActionsButtonWrapper() {
    const { classes, isInHeader, sourceLoggedIn } = this.props;
    const { loadingProfile, isProfileSet } = this.state;
    let result = [ classes.wrapper ]

    console.log('loadingProfle:', loadingProfile, sourceLoggedIn, isProfileSet, isInHeader)
    if ( loadingProfile ) return [ ...result, classes.wrapperOut ]
    if ( sourceLoggedIn  ) {
      if ( isProfileSet ) {
        if ( isInHeader ) {
          return [ ...result, classes.wrapperProfile ]
        } else {
          return [ ...result, classes.wrapperLogout ]
        }
      } 
    }
    
    return [ ...result, classes.actionWrapperLogin ]
  }

  render() {

    const { sourceType, onLoginClick, onLogoutClick, isInHeader, classes } = this.props;
    const { profile, source } = this.state;

    const wrapperClass = this.getLoginActionsButtonWrapper();
    console.log(wrapperClass)

    let loginWrapper   = [ classes.actionStateWrapper ]
    let loginButton    = [ classes[sourceType] ]
    if ( !isInHeader ) loginButton.push( classes.inSideNav )
    let logoutWrapper  = [ classes.actionStateWrapper ]
    let logoutButton   = [ classes[sourceType] ]
    if ( !isInHeader ) logoutButton.push( classes.inSideNav )
    let profileWrapper = [ classes.actionStateWrapper ]
    let profileClass   = [ classes.profile ]
    let avatarClass    = [ classes.avatar ]
    if ( sourceType === 'tw' ) avatarClass.push(classes.avatarTw)
    if ( sourceType === 'yt' ) avatarClass.push(classes.avatarYt)

    return (
      <div className={classes.container}>
        <div className={wrapperClass.join(' ')}>
          <div className={loginWrapper.join(' ')}><Button className={logoutButton.join(' ')} onClick={onLoginClick}>Login to {source}</Button></div>
          <div className={profileWrapper.join(' ')}>
            <div className={profileClass.join(' ')}>
              <Avatar alt={profile.displayName} src={profile.avatar} className={avatarClass.join(' ')}/>
              {profile.displayName}
            </div>
          </div>
          <div className={logoutWrapper.join(' ')}><Button className={logoutButton.join(' ')} onClick={onLogoutClick}>Logout of {source}</Button></div>
        </div>
      </div>
    );
  }
}

LoginActionsButton.propTypes = {
  sourceLoggedIn: PropTypes.bool,
  isInHeader: PropTypes.bool,
  displayName: PropTypes.string,
  getProfile: PropTypes.func,
  onLoginClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
}

const mapStateToProps = state => {
  return { }
}
const mapDispatchToProps = dispatch => ({ })

const LoginActionsButtonWithStyles = withStyles(styles)(LoginActionsButton);

export default connect(mapStateToProps, mapDispatchToProps)(LoginActionsButtonWithStyles);

