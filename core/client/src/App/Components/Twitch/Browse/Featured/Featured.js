import React       from 'react';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import TwitchFeaturedGrid   from '../../TwitchFeaturedGrid/TwitchFeaturedGrid';

const styles = theme => ({ })


class TwFeatured extends React.Component {

  render() {
    return (
      <Grid item xs={12}>
        <Grid container spacing={24} >
        
          <Grid item xs={12}>
            <TwitchFeaturedGrid></TwitchFeaturedGrid>
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

const TwFeaturedWithStyles = withStyles(styles)(TwFeatured);
export default connect(mapStateToProps, mapDispatchToProps)(TwFeaturedWithStyles);