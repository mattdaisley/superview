import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';

import VideoGrid       from '../../../Components/VideoGrid/VideoGrid';
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

    const { twitchFeaturedLoaded } = this.state;
    const { twitchFeatured, limit, paginate, windowWidth } = this.props


    let gridElement = null

    if ( !!twitchFeaturedLoaded ) {
      if ( windowWidth <= 960 ) { 
        gridElement = <VideoGrid videoItems={twitchFeatured} limit={limit} />
      } else if ( windowWidth <= 1280 ) {
        gridElement = <VideoGrid videoItems={twitchFeatured} />
      } else if ( windowWidth > 1280 ) {
        if ( paginate ) {
          gridElement = <VideoGrid paginate videoItems={twitchFeatured} />
          // gridElement = <VideoGrid paginate videoItems={twitchFeatured} featuredItemFilter={this.featuredFilterFunction} />
        } else {
          gridElement = <VideoGrid videoItems={twitchFeatured} />
        }
      }
    }

    if ( !!twitchFeatured && twitchFeatured.length > 0 ) {
      return (
        <Grid container spacing={24} >
          <Grid item xs={12}>

            <VideoGridHeader 
              route="/browse/tw/featured" 
              title="Featured Channels on Twitch" 
              sourceType="tw" />

            {gridElement}

          </Grid>
        </Grid>
      )
    }

    return null;

  }
}

TwitchFeaturedGrid.propTypes = {
  className: PropTypes.any,
  paginate: PropTypes.bool,
  limit: PropTypes.number,
}

TwitchFeaturedGrid.defaultProps = {
  paginate: false
}

const mapStateToProps = state => {
  return {
    twitchFeatured: state.twitchBrowse.twitchFeatured,
    windowWidth: state.window.width
  }
}

const mapDispatchToProps = dispatch => ({
  getTwitchFeatured: () => dispatch(getTwitchFeatured()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitchFeaturedGrid);
