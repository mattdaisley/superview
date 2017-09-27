import React     from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import StandardPage from './StandardPage';
import FeaturedPage from './FeaturedPage';

const styles = theme => ({
  currPage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  currPageLeft: {
    left: 'calc(-100% - 12px)',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  currPageRight: {
    left: 'calc(100% + 12px)',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
})

class CurrentPage extends React.Component {

  getPage( videoItems, featuredItem, page, pages, pageSize, offset = 0 ) {
    switch ( page ) {
      case 0:
        if ( !!featuredItem ) return (<FeaturedPage videoItems={videoItems} featuredItem={featuredItem} pageSize={pageSize}></FeaturedPage>)
        return (<StandardPage videoItems={videoItems} page={page} pages={pages} pageSize={pageSize} offset={offset}></StandardPage>)
      default: 
        if ( !!featuredItem ) return (<StandardPage videoItems={videoItems} page={page} pages={pages} pageSize={pageSize} offset={offset}></StandardPage>)
        return (<StandardPage videoItems={videoItems} page={page} pages={pages} pageSize={pageSize}></StandardPage>)
    }
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

    let pageClass = classes.currPage,
        element
        
    switch( transition ) {
      case 'next':
        pageClass += ' ' + classes.currPageLeft
        break
      case 'prev':
        pageClass += ' ' + classes.currPageRight
        break;
      case 'none':
      default:
        break;
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

CurrentPage.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired, 
  featuredItem: PropTypes.object,
  page: PropTypes.number, 
  pages: PropTypes.number, 
  pageSize: PropTypes.number, 
  transition: PropTypes.string,
}

CurrentPage.defaultProps = {
  videoItems: [],
  page: 1,
  pages: 1,
  pageSize: 6,
  transition: 'none',
}


const CurrentPageWithStyles = withStyles(styles)(CurrentPage);

export default CurrentPageWithStyles;

