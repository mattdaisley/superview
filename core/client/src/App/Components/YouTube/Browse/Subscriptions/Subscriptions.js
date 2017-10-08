import React       from 'react';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import YoutubeRecentGrid   from '../../YoutubeRecentGrid/YoutubeRecentGrid';

const styles = theme => ({ 
  text: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    padding: '0 10px'
  }
})


class YtSubscriptions extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('Home props', props);
  // }

  render() {
    const { youtubeRecentResults, classes } = this.props

    return (
      <Grid item xs={12}>
        <Grid container spacing={24} >
        
          <Grid item xs={12}>
            <YoutubeRecentGrid></YoutubeRecentGrid>
          </Grid>

          {(!!youtubeRecentResults && youtubeRecentResults.length > 0) && (
            <p className={classes.text}>If you are new to SuperView, this list may only show the last 10 uploads from each of your subscriptions. This is due to limitations from YouTube. We're working on getting around this and thank you for your patience!</p>
          )}

        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { 
    youtubeRecentResults: state.youtubeBrowse.youtubeRecentResults,
  }
}
const mapDispatchToProps = dispatch => ({ })

const YtSubscriptionsWithStyles = withStyles(styles)(YtSubscriptions);
export default connect(mapStateToProps, mapDispatchToProps)(YtSubscriptionsWithStyles);