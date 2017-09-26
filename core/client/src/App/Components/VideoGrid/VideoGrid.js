import React     from 'react';
import PropTypes from 'prop-types';

import Grid      from 'material-ui/Grid';
import Button from 'material-ui/Button';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon  from 'material-ui-icons/KeyboardArrowLeft';
import { withStyles } from 'material-ui/styles';

import VideoGridPage from './VideoGridPage';

import './VideoGrid.css';

const styles = theme => ({
  videoGridWrapper: {
    position: 'relative',
    marginBottom: 40
  },
  videoGridPageWrapper: {
    overflow: 'hidden',
    width: '100%',
    position: 'relative'
  },
  prevPage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 'calc(-100% - 12px)'
  },
  currPage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  nextPage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 'calc(-100% - 12px)'
  },
  currPageLeft: {
    left: 'calc(-100% - 12px)',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  nextPageCenter: {
    right: 0,
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  prevPageCenter: {
    left: 0,
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
  pageButtons: {
    position: 'absolute',
    right: 0,
    top: -84
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class VideoGrid extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      page: 0,
      transition: 'none',
      width: '0', 
      height: '0',
      pageSize: 0,
      featuredPageOffset: 0,
      wrapperHeight: 0
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const width = window.innerWidth
    const height = window.innerHeight
    const { videoItems, featuredItemFilter } = this.props
    let pageSize, featuredPageOffset, wrapperHeight

    if ( width >= 1920 ) { 
      pageSize = 8; 
      featuredPageOffset = 6; 
      wrapperHeight = ( videoItems.length > pageSize/2 ) ? 450 : 217
    }
    if ( width <  1920 ) { 
      pageSize = 6; 
      featuredPageOffset = 4; 
      wrapperHeight = ( videoItems.length > pageSize/2 ) ? 410 : 197
    }
    if ( width <= 1280 ) { 
      pageSize = 4; 
      featuredPageOffset = 2; 
      wrapperHeight = ( videoItems.length > pageSize/2 ) ? 410 : 197
    }
    
    this.setState({ width, height, page: 0, pageSize, featuredPageOffset, wrapperHeight });

    if ( typeof this.props.featuredItemFilter === "function" ) {
      let featuredItem = videoItems.filter( featuredItemFilter )[0];
      let remainingItems = videoItems.filter( item => item.id !== featuredItem.id );

      this.setState( { 
        videoItems: [ ...remainingItems ], 
        featuredItem: featuredItem,
        pages: Math.ceil( (remainingItems.length + 4) / pageSize ),
        /*
          ft  rest  pSize  pages
          1   2     6      1
          1   3     6      2
          1   8     6      2
          1   9     6      3
          1   14    6      3
          rest + 4 = total, ceil(total/pSize) = pages
          2+4 = 6, ceil(6/6) = 1 pages
          3+4 = 7, ceil(7/6) = 2 pages
          8+4 = 12, ceil(12/6) = 2 pages
          9+4 = 13, ceil(13/6) = 3 pages

        */
      } )
      // console.log(featuredItem, remainingItems)
    } else {
      this.setState( { 
        videoItems: [ ...videoItems ],
        featuredItem: undefined,
        pages: Math.ceil( videoItems.length / pageSize ),
      } )
    }
  }

  prevPage() {
    const { page, pages } = this.state;
    console.log('prevPage', page, pages);
    if ( page > 0 ) { 
      this.setState( {transition: 'prev'} )
      setTimeout( () => {
        this.setState( { page: page-1, transition: 'none' } )
       }, 300 )
      // this.setState( { page: page - 1 } )
    }
  }
  
  nextPage() {
    const { page, pages } = this.state;
    console.log('nextPage', page, pages);
    if ( page < pages - 1 ) { 
      this.setState( {transition: 'next'} )
      setTimeout( () => {
        this.setState( { page: page+1, transition: 'none' } )
      }, 300 )
      // this.setState( { page: page + 1 } )
    }
  }

  getFeaturedPage( videoItems, featuredItem, pageSize ) {
    console.log('in getFeaturedPage featuredItem:', !!featuredItem, 'pageSize:', pageSize)
    let pageItems = videoItems.slice(0, pageSize - 4 )
    console.log('pageItems', pageItems, pageSize - 4 );
    return (<Grid container spacing={16}><Grid item xs={12}><VideoGridPage videoItems={pageItems} featuredItem={featuredItem}></VideoGridPage></Grid></Grid>)
  }

  getStandardPage( videoItems, page, pages, pageSize, offset = 0 ) {
    console.log('in getStandardPage page:', page, 'pages:', pages, 'pageSize:', pageSize, 'offset', offset)
    let pageStart = ( page * pageSize ) - offset
    let pageEnd   = ( pageStart + pageSize < videoItems.length - 1 ) ? pageStart + pageSize : videoItems.length
    let pageItems = videoItems.slice( pageStart, pageEnd )
    console.log('in getStandardPage pageStart:', pageStart, 'pageEnd:', pageEnd, 'pageItems:', pageItems.map( a => a.id ))
    return (<Grid container spacing={16}><Grid item xs={12}><VideoGridPage videoItems={pageItems}></VideoGridPage></Grid></Grid>)
  }

  getPrevPage( videoItems, featuredItem, page, pages, pageSize, offset = 0 ) {
    // console.log('in getPrevPage featuredItem:', !!featuredItem, 'page:', page, 'pages:', pages, 'pageSize:', pageSize, 'offset', offset)
    if ( page === 0 ) return null;
    if ( page === 1 && !!featuredItem ) return this.getFeaturedPage( videoItems, featuredItem, pageSize )
    return this.getStandardPage( videoItems, page - 1, pages, pageSize, offset )
  }

  getCurrentPage( videoItems, featuredItem, page, pages, pageSize, offset = 0 ) {
    console.log('in getCurrentPage featuredItem:', !!featuredItem, 'page:', page, 'pages:', pages, 'pageSize:', pageSize, 'offset', offset)
    switch ( page ) {
      case 0:
        if ( !!featuredItem ) return this.getFeaturedPage( videoItems, featuredItem, pageSize )
        return this.getStandardPage( videoItems, page, pages, pageSize, offset)
      default: 
        if ( !!featuredItem ) return this.getStandardPage( videoItems, page, pages, pageSize, offset )
        return this.getStandardPage( videoItems, page, pages, pageSize )
    }
  }

  getNextPage( videoItems, page, pages, pageSize, offset = 0 ) {
    // console.log('in getNextPage page:', page, 'pages:', pages, 'pageSize:', pageSize, 'offset', offset)
    if ( page === pages - 1 ) return null;
    return this.getStandardPage( videoItems, page + 1, pages, pageSize, offset )
  }

  render() {
    const classes = this.props.classes

    const { page, pages, pageSize, featuredItem, videoItems, transition, wrapperHeight } = this.state
    let prevPageElement, element, nextPageElement

    console.log('in render videoItems:', videoItems.map( a => a.id ), 'featuredItem:', !!featuredItem )
    if ( !!featuredItem ) {
      prevPageElement = this.getPrevPage( videoItems, featuredItem, page, pages, pageSize, 4 )
      element = this.getCurrentPage( videoItems, featuredItem, page, pages, pageSize, 4 )
      nextPageElement = this.getNextPage( videoItems, page, pages, pageSize, 4 )
    } else {
      prevPageElement = this.getPrevPage( videoItems, featuredItem, page, pages, pageSize )
      element = this.getCurrentPage( videoItems, featuredItem, page, pages, pageSize )
      nextPageElement = this.getNextPage( videoItems, page, pages, pageSize )
    }
    

    let prevPageClass, currPageClass, nextPageClass;

    switch( this.state.transition ) {
      case 'next':
        prevPageClass = classes.prevPage
        currPageClass = classes.currPageLeft + ' ' + classes.currPage
        nextPageClass = classes.nextPageCenter + ' ' + classes.nextPage
        break;
      case 'prev':
        prevPageClass = classes.prevPageCenter + ' ' + classes.prevPage
        currPageClass = classes.currPageRight + ' ' + classes.currPage
        nextPageClass = classes.nextPage
        break;
      case 'none':
      default:
        prevPageClass = classes.prevPage
        currPageClass = classes.currPage
        nextPageClass = classes.nextPage
        break;
    }
    
    console.log('end of render logic');

    return ( 
      <div className={classes.videoGridWrapper}>
        <div className={classes.videoGridPageWrapper} style={{height:wrapperHeight}}>
          <div className={prevPageClass}>
            {prevPageElement}
          </div>
          <div className={currPageClass}>
            {element}
          </div>
          <div className={nextPageClass}>
            {nextPageElement}
          </div>
        </div>
        { pages !== 1 && (
          <div className={classes.pageButtons}>
            <Button fab aria-label="add" className={classes.button} disabled={ page === 0 && transition !== 'next' } onClick={() => this.prevPage()}>
              <KeyboardArrowLeftIcon />
            </Button>
            <Button fab aria-label="add" className={classes.button} disabled={ page === pages-1 && transition !== 'prev' } onClick={() => this.nextPage()}>
              <KeyboardArrowRightIcon />
            </Button>
          </div>
        )}
      </div> 
    );
  }
} 

VideoGrid.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired,
  featuredItemFilter: PropTypes.func,
}


const VideoGridWithStyles = withStyles(styles)(VideoGrid);

export default VideoGridWithStyles;

