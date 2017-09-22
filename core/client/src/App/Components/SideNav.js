import React from 'react';
import { Link } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
// import Button from 'material-ui/Button';
import HomeIcon from 'material-ui-icons/Home';
import RestoreIcon from 'material-ui-icons/Restore';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import classNames from 'classnames';

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
    width: 98,
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
  },
  sideNavList: {
    marginTop: 82,
  },
  sideNavIcon: {
    marginLeft: 20,
    marginRight: 25,
  }
})

class SideNav extends React.Component {

  // constructor(props) {
  //   super(props);
  //   // console.log('SideNav props', props);
  // }

  render() {
    
    const classes = this.props.classes;

    return (
      <Drawer
        type="permanent"
        open={this.props.isSideNavOpen}
        classes={{
          docked: classNames(classes.sideNavDrawer),
          paper: classNames('sideNavOverRide', !!this.props.isSideNavOpen && classes.sideNavDrawerOpen, !this.props.isSideNavOpen && classes.sideNavDrawerClose)
        }}>
        <div className={classes.sideNavInner}>
          <List className={classes.sideNavList}>
            <Link to='/' onClick={this.props.handleSideNavClose}>
              <ListItem button>
                <ListItemIcon className={classes.sideNavIcon}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to='/recents' onClick={this.props.handleSideNavClose}>
              <ListItem button>
                <ListItemIcon className={classes.sideNavIcon}>
                  <RestoreIcon />
                </ListItemIcon>
                <ListItemText primary="Recent" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    );
  }
}

const SideNavWithStyles = withStyles(styles)(SideNav);

export default SideNavWithStyles;