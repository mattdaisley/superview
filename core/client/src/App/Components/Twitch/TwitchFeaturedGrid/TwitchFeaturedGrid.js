import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import Grid         from 'material-ui/Grid';
import ChevronRight from 'material-ui-icons/ChevronRight';

import VideoGrid     from '../../../Components/VideoGrid/VideoGrid';
import VideoGridPage from '../../../Components/VideoGrid/VideoGridPage';

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

    if ( !!this.state.twitchFeaturedLoaded ) {
      if ( !!this.props.paginate ) {
        gridElement = <VideoGrid videoItems={this.props.twitchFeatured} featuredItemFilter={this.featuredFilterFunction}></VideoGrid>
      } else {
        gridElement = <VideoGridPage videoItems={this.props.twitchFeatured}></VideoGridPage>
      }
    }

    if ( !!this.props.twitchFeatured && this.props.twitchFeatured.length > 0 ) {
      element = (
        <Grid container spacing={24} >
          <Grid item xs={12}>
            <div className="grid-header"><h3><Link to='/tw/live'>Featured Channels on Twitch</Link> <ChevronRight/></h3></div>
            <div className="twitch-divider"></div>
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
