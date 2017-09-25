import React       from 'react';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import YoutubeRecentGrid   from '../../YoutubeRecentGrid/YoutubeRecentGrid';

const styles = theme => ({ })


class YtSubscriptions extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('Home props', props);
  // }

  render() {
    // const classes = this.props.classes;

    return (
      <Grid item xs={12}>
        <Grid container spacing={24} >
        
          <Grid item xs={12}>
            <YoutubeRecentGrid></YoutubeRecentGrid>
          </Grid>

        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { }
}
const mapDispatchToProps = dispatch => ({ })

const YtSubscriptionsWithStyles = withStyles(styles)(YtSubscriptions);
export default connect(mapStateToProps, mapDispatchToProps)(YtSubscriptionsWithStyles);