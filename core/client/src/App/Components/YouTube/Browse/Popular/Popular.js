import React       from 'react';
import { connect } from 'react-redux';

import Grid         from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import YoutubePopularGrid   from '../../YoutubePopularGrid/YoutubePopularGrid';

const styles = theme => ({ })


class YtPopular extends React.Component {
  
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
            <YoutubePopularGrid></YoutubePopularGrid>
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

const YtPopularWithStyles = withStyles(styles)(YtPopular);
export default connect(mapStateToProps, mapDispatchToProps)(YtPopularWithStyles);