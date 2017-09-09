import React     from 'react';
import PropTypes from 'prop-types';

import Grid      from 'material-ui/Grid';

class VideoGrid extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('ChannelDetails props', props);
  // }

  render() {

    return (
      <Grid container spacing={8} >
        <Grid item xs={6} sm={3} className="list-grid-item">
          <div style={ {width: '100%'} }>
            <img src="https://static-cdn.jtvnw.net/previews-ttv/live_user_bdoubleo-320x180.jpg" alt="bdoubleo" style={ {width: '100%'} } />
          </div>
        </Grid>
        <Grid item xs={6} sm={3} className="list-grid-item">
          <div style={ {width: '100%'} }>
            <img src="https://static-cdn.jtvnw.net/previews-ttv/live_user_stockstream-320x180.jpg" alt="stockstream" style={ {width: '100%'} } />
          </div>
        </Grid>
      </Grid>
    );
  }
} 

VideoGrid.propTypes = {
  videoItems: PropTypes.arrayOf( PropTypes.object ).isRequired,
}

export default VideoGrid;
