import React     from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import StandardPage from './StandardPage';

const styles = theme => ({
  nextPage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 'calc(-100% - 12px)'
  },
  nextPageCenter: {
    right: 0,
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
})

class NextPage extends React.Component {

  getPage( videoItems, page, pages, pageSize, offset = 0 ) {
    if ( page === pages - 1 ) return null;
    return (<StandardPage videoItems={videoItems} page={page + 1} pages={pages} pageSize={pageSize} offset={offset}></StandardPage>)
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

    let pageClass = classes.nextPage,
        element

    if ( transition === 'next' ) {
      pageClass += ' ' + classes.nextPageCenter
    }

    if ( !!featuredItem ) {
      element = this.getPage( videoItems, page, pages, pageSize, 4 )
    } else {
      element = this.getPage( videoItems, page, pages, pageSize )
    }

    return (
      <div className={pageClass}>
        {element}
      </div>
    )

  }
} 

NextPage.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired, 
  featuredItem: PropTypes.object,
  page: PropTypes.number, 
  pages: PropTypes.number, 
  pageSize: PropTypes.number, 
  transition: PropTypes.string,
}

NextPage.defaultProps = {
  videoItems: [],
  featuredItem: {},
  page: 1,
  pages: 1,
  pageSize: 6,
  transition: 'none',
}


const NextPageWithStyles = withStyles(styles)(NextPage);

export default NextPageWithStyles;

