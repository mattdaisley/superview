import React     from 'react';
import PropTypes from 'prop-types';

import Grid      from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import VideoGridPage from '../VideoGridPage';

const styles = theme => ({
  prevPage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 'calc(-100% - 12px)'
  },
  prevPageCenter: {
    left: 0,
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
})

class FeaturedPage extends React.Component {

  render() {
    const { videoItems, featuredItem, pageSize } = this.props
    const pageItems = videoItems.slice(0, pageSize - 4 )

    return (<Grid container spacing={16}><Grid item xs={12}><VideoGridPage videoItems={pageItems} featuredItem={featuredItem}></VideoGridPage></Grid></Grid>)
  }
} 

FeaturedPage.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired, 
  featuredItem: PropTypes.object.isRequired, 
  pageSize: PropTypes.number,
}

FeaturedPage.defaultProps = {
  pageSize: 6,
}

const FeaturedPageWithStyles = withStyles(styles)(FeaturedPage);

export default FeaturedPageWithStyles;

