import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
// import RestoreIcon from 'material-ui-icons/Restore';
import SubscriptionsIcon from 'material-ui-icons/Subscriptions';
import FavoriteIcon from 'material-ui-icons/Favorite';
import blue from 'material-ui/colors/blue';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import SideNavLinks    from './SideNavLinks/SideNavLinks';
import SideNavBackdrop from './SideNavBackdrop/SideNavBackdrop';
import LoginActions    from '../LoginActions/LoginActions';

const drawerWidth = 280;

const styles = theme => ({
  sideNavDrawer: {
    position: 'fixed',
    width: 100,
    top: 64,
    zIndex: 11000,
  },
  sideNavOverRide: {
    boxSizing: 'border-box',
  },
  sideNavDrawerOpen: {
    boxShadow: theme.shadows[3],
    backgroundColor: 'white',
    borderRight: '#ccc',
    // height: '100%',
    // position: 'relative',
    top: 0,
    bottom: 0,
    // paddingTop: 64,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.complex,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sideNavDrawerClose: {
    [theme.breakpoints.up('md')]: {
      width: 98,
    },
    [theme.breakpoints.down('md')]: {
      width: 0,
    },
    position: 'relative',
    // top: 64,
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'auto',
  },
  sideNavInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
    height: '100%',
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column'
  },

  menuButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginLeft: 25,
      marginRight: 25,
      height: 64,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      marginRight: 10,
      height: 56,
    },
  },
  appLogoText: {
    marginLeft: 25,
  },

  sideNavList: {
    marginTop: 18,
  },
  sideNavIcon: {
    marginLeft: 20,
    marginRight: 25,
  },
  selected: {
    fill: blue[500],
  },
  loginActionsWrapper: {
    display: 'block',
  },
  loginActionsWrapperHidden: {
    display: 'none',
  },
  footerWrapper: {
    flex: 'none',
    alignSelf: 'flex-end',
    width: '100%',
  },
  footerWrapperHidden: {
    display: 'none',
  },
  footer: {
    boxSizing: 'border-box',
    padding: 25,
    fontSize: 14,
    color: '#444444'
  }
})

class SideNav extends React.Component {

  // constructor(props) {
  //   super(props);
  //   // console.log('SideNav props', props);
  // }
  
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    
    const classes = this.props.classes;

    const navLinks = [
      { name: 'Home', route: '/', icon: (<HomeIcon />) },
      // { name: 'Recents', route: '/browse/recents', icon: (<RestoreIcon />) },
      { name: 'YouTube', route: '/browse/yt/subscriptions', icon: (<SubscriptionsIcon />), guard: this.props.youtubeLoggedIn },
      { name: 'Twitch', route: '/browse/tw/following', icon: (<FavoriteIcon />), guard: this.props.twitchLoggedIn }
    ]
    
    const loginActionsWrapperClasses = [ classes.loginActionsWrapper ];
    if ( !this.props.isSideNavOpen ) {
      loginActionsWrapperClasses.push(classes.loginActionsWrapperHidden)
    }
    
    const footerWrapperClasses = [ classes.footerWrapper ];
    if ( !this.props.isSideNavOpen ) {
      footerWrapperClasses.push(classes.footerWrapperHidden)
    }

    // if ( !this.props.isSideNavOpen ) {
    //   drawerClasses
    // }

    const sideNavOverRides = [ 'sideNavOverRide', classes.sideNavOverRide ]
    if ( !!this.props.isSideNavOpen ) {
      sideNavOverRides.push(classes.sideNavDrawerOpen)
    } else { 
      sideNavOverRides.push(classes.sideNavDrawerClose)
    }

    let drawerType = 'permanent'
    if ( !!this.props.isSideNavOpen ) {
      // drawerType = null
    } 

    return (
      [
        <SideNavBackdrop isSideNavOpen={this.props.isSideNavOpen} onClick={this.props.handleSideNavClose} />,
        <Drawer
          type={drawerType}
          open={this.props.isSideNavOpen}
          onClick={this.props.handleSideNavClose}
          classes={{
            modal: classNames(classes.sideNavDrawer),
            docked: classNames(classes.sideNavDrawer),
            // docked: classNames(...sideNavOverRides),
            paper: classNames(...sideNavOverRides)
          }}>
          <div className={classes.sideNavInner}>
          
            { !!this.props.isSideNavOpen && (
              <div className={classes.menuButtonWrapper}>
                <IconButton className="menu-button">
                  <ChevronLeftIcon />
                </IconButton>

                <Typography type="title" className={[classes.appLogoText, "App-logo-text","flex-item-grow"].join(' ')}>
                  SuperView
                </Typography>
              </div>
            )}

            <SideNavLinks navLinks={navLinks} />

            <div className={loginActionsWrapperClasses.join(' ')} >
              <LoginActions />
            </div>

            <div className={footerWrapperClasses.join(' ')} >
              <Divider />
              <div className={classes.footer}>&copy; 2017 SuperView</div>
            </div>
          </div>
        </Drawer>
      ]
    );
  }
}

const mapStateToProps = state => {
  return {
    twitchLoggedIn:  state.twitchOauth.loggedIn,
    youtubeLoggedIn: state.youtubeOauth.loggedIn,
  }
}

const SideNavWithStyles = withStyles(styles)(SideNav);

export default connect(mapStateToProps)(SideNavWithStyles);