import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import HomeIcon from 'material-ui-icons/Home';
import RestoreIcon from 'material-ui-icons/Restore';
import SubscriptionsIcon from 'material-ui-icons/Subscriptions';
import FavoriteIcon from 'material-ui-icons/Favorite';
import blue from 'material-ui/colors/blue';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import LoginActions from './LoginActions/LoginActions';

const drawerWidth = 280;

const styles = theme => ({
  sideNavDrawer: {
    position: 'fixed',
    width: drawerWidth,
    zIndex: 10000,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sideNavDrawerOpen: {
    boxShadow: theme.shadows[3],
    backgroundColor: 'white',
    borderRight: '#ccc',
    height: '100%',
  },
  sideNavDrawerClose: {
    [theme.breakpoints.up('md')]: {
      width: 98,
    },
    [theme.breakpoints.down('md')]: {
      width: 0,
    },
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
    display: 'flex',
    flexDirection: 'column'
  },
  sideNavList: {
    marginTop: 82,
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
      { name: 'Recents', route: '/browse/recents', icon: (<RestoreIcon />) },
      { name: 'YouTube', route: '/browse/yt/subscriptions', icon: (<SubscriptionsIcon />), guard: this.props.youtubeLoggedIn },
      { name: 'Twitch', route: '/browse/tw/following', icon: (<FavoriteIcon />), guard: this.props.twitchLoggedIn }
    ]

    const navLinksElements = navLinks.map( link => {
      const linkClass = ( this.context.router.route.location.pathname === link.route ) ? classes.selected : '';
      if ( ( link.guard === undefined ) || ( link.guard && link.guard === true ) ) {
        return (
          <Link to={link.route} onClick={this.props.handleSideNavClose} key={link.name}>
            <ListItem button>
              <ListItemIcon className={classes.sideNavIcon + ' ' + linkClass}>
                { link.icon }
              </ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          </Link>
        )
      }
      return null;
    })
    
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

    const sideNavOverRides = [ 'sideNavOverRide' ]
    if ( !!this.props.isSideNavOpen ) {
      sideNavOverRides.push(classes.sideNavDrawerOpen)
    } else { 
      sideNavOverRides.push(classes.sideNavDrawerClose)
    }

    return (
      <Drawer
        type="permanent"
        open={this.props.isSideNavOpen}
        classes={{
          docked: classNames(classes.sideNavDrawer),
          paper: classNames(...sideNavOverRides)
        }}>
        <div className={classes.sideNavInner}>
          <List className={classes.sideNavList}>
            { navLinksElements }
          </List>

          <div className={loginActionsWrapperClasses.join(' ')} >
            <LoginActions />
          </div>

          <div className={footerWrapperClasses.join(' ')} >
            <Divider />
            <div className={classes.footer}>&copy; 2017 SuperView</div>
          </div>
        </div>
      </Drawer>
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