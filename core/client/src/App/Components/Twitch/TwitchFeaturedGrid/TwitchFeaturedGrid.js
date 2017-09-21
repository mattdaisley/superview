import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import ChevronRight from 'material-ui-icons/ChevronRight';

import VideoGrid    from '../../../Components/VideoGrid/VideoGrid';

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

    var intervalId = setInterval(this.props.getTwitchFeatured, 5000);
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

  render() {

    return (
      <div>
        { (!!this.props.twitchFeatured && this.props.twitchFeatured.length > 0) && (
          <div className="grid-header"><h3><Link to='/tw/live'>Featured Channels on Twitch</Link> <ChevronRight/></h3></div>
        )}
        { !!this.state.twitchFeaturedLoaded && (
          <VideoGrid source="tw" videoItems={this.props.twitchFeatured}></VideoGrid>
        )}
      </div>
    );

  }
}

TwitchFeaturedGrid.propTypes = {
  className: PropTypes.any,
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
