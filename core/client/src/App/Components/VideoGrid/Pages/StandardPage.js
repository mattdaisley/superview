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

class StandardPage extends React.Component {

  render() {
    const { videoItems, page, pageSize, offset } = this.props
    
    const pageStart = ( page * pageSize ) - offset
    const pageEnd   = ( pageStart + pageSize < videoItems.length - 1 ) ? pageStart + pageSize : videoItems.length
    const pageItems = videoItems.slice( pageStart, pageEnd )

    return (<Grid container spacing={16}><Grid item xs={12}><VideoGridPage videoItems={pageItems}></VideoGridPage></Grid></Grid>)
  }
} 

StandardPage.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired, 
  page: PropTypes.number, 
  pageSize: PropTypes.number, 
  offset: PropTypes.number
}

StandardPage.defaultProps = {
  videoItems: [],
  page: 1,
  pageSize: 6,
  offset: 0
}

const StandardPageWithStyles = withStyles(styles)(StandardPage);

export default StandardPageWithStyles;

