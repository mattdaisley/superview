import React     from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import StandardPage from './StandardPage';
import FeaturedPage from './FeaturedPage';

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

class PrevPage extends React.Component {

  getPage( videoItems, featuredItem, page, pages, pageSize, offset = 0 ) {
    if ( page === 0 ) return null;
    if ( page === 1 && !!featuredItem ) return (<FeaturedPage videoItems={videoItems} featuredItem={featuredItem} pageSize={pageSize}></FeaturedPage>)
    
    return (<StandardPage videoItems={videoItems} page={page - 1} pages={pages} pageSize={pageSize} offset={offset}></StandardPage>)
  }

  render() {
    const { 
      videoItems, 
      featuredItem, 
      page, 
      pages, 
      pageSize, 
      transition,
    } = this.props

    const classes = this.props.classes

    let pageClass = classes.prevPage,
        element
      
    if ( transition === 'prev' ) {
      pageClass += ' ' + classes.prevPageCenter
    }

    if ( !!featuredItem ) {
      element = this.getPage( videoItems, featuredItem, page, pages, pageSize, 4 )
    } else {
      element = this.getPage( videoItems, featuredItem, page, pages, pageSize )
    }

    return (
      <div className={pageClass}>
        {element}
      </div>
    )

  }
} 

PrevPage.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired, 
  featuredItem: PropTypes.object, 
  page: PropTypes.number, 
  pages: PropTypes.number, 
  pageSize: PropTypes.number, 
  transition: PropTypes.string,
}

PrevPage.defaultProps = {
  videoItems: [],
  page: 1,
  pages: 1,
  pageSize: 6,
  transition: 'none',
}


const PrevPageWithStyles = withStyles(styles)(PrevPage);

export default PrevPageWithStyles;

