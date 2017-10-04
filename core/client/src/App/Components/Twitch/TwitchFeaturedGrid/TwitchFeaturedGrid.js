import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';

import VideoGrid       from '../../../Components/VideoGrid/VideoGrid';
import VideoGridPage   from '../../../Components/VideoGrid/VideoGridPage';
import VideoGridHeader from '../../../Components/VideoGrid/VideoGridHeader';

import { getTwitchFeatured } from '../../../Redux/Twitch/TwitchActionCreators';

class TwitchFeaturedGrid extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log('TwitchFeaturedGrid props', props);

    this.state = {
      twitchFeaturedLoaded: false
    }
  }

  componentWillMount() {
    this.props.getTwitchFeatured();

    var intervalId = setInterval(this.props.getTwitchFeatured, 15000);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.twitchFeatured !== nextProps.twitchFeatured ) {
      this.setState({twitchFeaturedLoaded: true}) 
    }
  }

  featuredFilterFunction(item, index) {
    return index === 0
    // console.log(item);
    // return true;
  }

  render() {
    let element = null;
    let gridElement = null;

    const width = window.innerWidth

    if ( !!this.state.twitchFeaturedLoaded ) {

      if ( width <= 960 ) { 
        gridElement = <VideoGridPage videoItems={this.props.twitchFeatured} limit={6}></VideoGridPage>
      } else if ( width <= 1280 ) {
        gridElement = <VideoGrid videoItems={this.props.twitchFeatured}></VideoGrid>
      } else if ( width > 1280 ) {
        if ( !!this.props.paginate ) {
          gridElement = <VideoGrid videoItems={this.props.twitchFeatured} featuredItemFilter={this.featuredFilterFunction}></VideoGrid>
        } else {
          gridElement = <VideoGridPage videoItems={this.props.twitchFeatured}></VideoGridPage>
        }
      }
    }

    if ( !!this.props.twitchFeatured && this.props.twitchFeatured.length > 0 ) {
      element = (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <VideoGridHeader route="/browse/tw/featured" title="Featured Channels on Twitch" sourceType="tw" />
            {gridElement}
          </Grid>
        </Grid>
      )
    }

    return element;

  }
}

TwitchFeaturedGrid.propTypes = {
  className: PropTypes.any,
  paginate: PropTypes.bool
}

TwitchFeaturedGrid.defaultProps = {
  paginate: false
}

const mapStateToProps = state => {
  return {
    twitchFeatured: state.twitchBrowse.twitchFeatured,
  }
}

const mapDispatchToProps = dispatch => ({
  getTwitchFeatured: () => dispatch(getTwitchFeatured()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitchFeaturedGrid);
