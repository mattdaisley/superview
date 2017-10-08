import React     from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import VideoGridButtons from './VideoGridButtons';
import VideoGridPage    from './VideoGridPage';
import PrevPage         from './Pages/PrevPage';
import NextPage         from './Pages/NextPage';
import CurrentPage      from './Pages/CurrentPage';

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
      pageSize: 0,
      featuredPageOffset: 0,
      wrapperHeight: 0
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillMount() {
    this.updateWindowDimensions(this.props)
  }
  
  componentWillUnmount() {
  }

  componenetWillReceiveProps(nextProps) {
    this.updateWindowDimensions(nextProps)
  }

  updateWindowDimensions(props) {
    const { windowWidth, windowHeight } = props;
    const { videoItems, featuredItemFilter } = props
    let pageSize, featuredPageOffset, wrapperHeight


    if ( windowWidth <= 1280 ) { 
      pageSize = 4; 
      featuredPageOffset = 2; 
      wrapperHeight = ( videoItems.length > pageSize/2 ) ? 435 : 197
    } else if ( windowWidth <  1920 ) { 
      pageSize = 6; 
      featuredPageOffset = 4; 
      wrapperHeight = ( videoItems.length > pageSize/2 ) ? 435 : 197
    } else if ( windowWidth >= 1920 ) { 
      pageSize = 8; 
      featuredPageOffset = 6; 
      wrapperHeight = ( videoItems.length > pageSize/2 ) ? 460 : 225
    }
    
    this.setState({ windowWidth, windowHeight, page: 0, pageSize, featuredPageOffset, wrapperHeight });

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
    const page = this.state.page;
    if ( page > 0 ) { 
      this.setState( {transition: 'prev'} )
      setTimeout( () => { this.setState( { page: page - 1, transition: 'none' } ) }, 300 )
    }
  }
  
  nextPage() {
    const { page, pages } = this.state;
    if ( page < pages - 1 ) { 
      this.setState( {transition: 'next'} )
      setTimeout( () => { this.setState( { page: page + 1, transition: 'none' } ) }, 300 )
    }
  }
  
  render() {
    const { page, pages, pageSize, featuredItem, videoItems, transition, wrapperHeight } = this.state
    const { paginate, limit, classes } = this.props

    if ( !!paginate ) {
      return (
        <div className={classes.videoGridWrapper}>
          <div className={classes.videoGridPageWrapper} style={{height:wrapperHeight}}>
            <PrevPage videoItems={videoItems} featuredItem={featuredItem} page={page} pages={pages} pageSize={pageSize} transition={transition}></PrevPage>
            <CurrentPage videoItems={videoItems} featuredItem={featuredItem} page={page} pages={pages} pageSize={pageSize} transition={transition}></CurrentPage>
            <NextPage videoItems={videoItems} featuredItem={featuredItem} page={page} pages={pages} pageSize={pageSize} transition={transition}></NextPage>
          </div>
          <VideoGridButtons page={page} pages={pages} transition={transition} goPrevPage={() => this.prevPage()} goNextPage={() => this.nextPage()} />
        </div> 
      )
    } else {
      return <VideoGridPage videoItems={videoItems} limit={limit} />
    }
  }
} 

VideoGrid.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired,
  featuredItemFilter: PropTypes.func,
  paginate: PropTypes.bool,
  limit: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    windowWidth: state.window.width,
    windowHeight: state.window.height,
  }
}
const mapDispatchToProps = dispatch => ({

})


const VideoGridWithStyles = withStyles(styles)(VideoGrid);

export default connect(mapStateToProps, mapDispatchToProps)(VideoGridWithStyles);

