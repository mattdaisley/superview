import React       from 'react';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import TwitchFollowingGrid   from '../../TwitchFollowingGrid/TwitchFollowingGrid';

const styles = theme => ({ })


class TwFollowing extends React.Component {

  render() {
    return (
      <Grid item xs={12}>
        <Grid container spacing={24} >
        
          <Grid item xs={12}>
            <TwitchFollowingGrid></TwitchFollowingGrid>
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

const TwFollowingWithStyles = withStyles(styles)(TwFollowing);
export default connect(mapStateToProps, mapDispatchToProps)(TwFollowingWithStyles);