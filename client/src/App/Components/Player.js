import React from 'react';
import Grid from 'material-ui/Grid';

import EmbedPlayer from '../Components/EmbedPlayer';

class Player extends React.Component {
  
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {

    return (
      <div className="Player-wrapper">
        <Grid container spacing={0} direction="row" className="Player-container">
          
          <Grid item xs={12}>
            <Grid container spacing={0} justify="center" direction="row" className="Player-container">
              
              { !!(this.props.match.params.id && !this.props.match.params.id2) &&
                <Grid item xs={12}>
                  <div className="Player flex-item">
                    <EmbedPlayer
                      source={this.props.match.params.source}
                      id={this.props.match.params.id}
                    />
                  </div>
                </Grid>
              }
              
              { !!(this.props.match.params.id && this.props.match.params.id2) &&
                <Grid item xs={12} md={6}>
                  <div className="Player flex-item">
                    <EmbedPlayer
                      source={this.props.match.params.source}
                      id={this.props.match.params.id}
                    />
                  </div>
                </Grid>
              }
              { !!(this.props.match.params.id2) &&
                <Grid item xs={12} md={6}>
                  <div className="Player flex-item">
                  <EmbedPlayer
                    source={this.props.match.params.source}
                    id={this.props.match.params.id2}
                  />
                  </div>
                </Grid>
              }
            </Grid>
          </Grid>

          { !!(this.props.match.params.id3 || this.props.match.params.id4 ) &&
              <Grid item xs={12}>

                <Grid container spacing={0} justify="center" direction="row" className="Player-container">
                  { !!(this.props.match.params.id3 && !this.props.match.params.id4) &&
                    <Grid item xs={12}>
                      <div className="Player flex-item">
                      <EmbedPlayer
                        source={this.props.match.params.source}
                        id={this.props.match.params.id3}
                      />
                      </div>
                    </Grid>
                  }
                  { !!(this.props.match.params.id3 && this.props.match.params.id4 ) &&
                    <Grid item xs={12} md={6}>
                      <div className="Player flex-item">
                      <EmbedPlayer
                        source={this.props.match.params.source}
                        id={this.props.match.params.id3}
                      />
                      </div>
                    </Grid>
                  }
                  { !!(this.props.match.params.id4) &&
                    <Grid item xs={12} md={6}>
                      <div className="Player flex-item">
                      <EmbedPlayer
                        source={this.props.match.params.source}
                        id={this.props.match.params.id4}
                      />
                      </div>
                    </Grid>
                  }
                </Grid>

              </Grid>
            }

        </Grid>
      </div>
    );
  }
  
   _onReady(event) {
     // access to player in all event handlers via event.target 
    //  event.target.pauseVideo();
   }
}

export default Player;
