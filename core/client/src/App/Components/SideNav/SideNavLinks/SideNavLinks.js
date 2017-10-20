import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import blue from 'material-ui/colors/blue';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
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
    
    const { navLinks, handleSideNavClose, classes } = this.props;

    const navLinksElements = navLinks.map( (link, index) => {
      const linkClass = ( this.context.router.history.location.pathname === link.route ) ? classes.selected : '';
      if ( ( link.guard === undefined ) || ( link.guard && link.guard === true ) ) {
        return (
          <Link to={link.route} onClick={handleSideNavClose} key={link.name}>
            <ListItem>
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

    return (
      <List className={classes.sideNavList}>
        { navLinksElements }
      </List>
    )
  }
}

SideNav.propTypes = {
  navLinks: PropTypes.array,
  handleSideNavClose: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    twitchLoggedIn:  state.twitchOauth.loggedIn,
    youtubeLoggedIn: state.youtubeOauth.loggedIn,
  }
}

const SideNavWithStyles = withStyles(styles)(SideNav);

export default connect(mapStateToProps)(SideNavWithStyles);