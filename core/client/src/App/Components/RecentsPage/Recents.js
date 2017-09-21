import React from 'react';
import Grid         from 'material-ui/Grid';

class Recents extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   // console.log('Recents props', props);
  // }

  render() {
    console.log('Recents');
    return (
      <div>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={9}>
            <Grid container spacing={0} >
              
              <Grid item xs={12}>
                <h3>Recents</h3>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Recents;
