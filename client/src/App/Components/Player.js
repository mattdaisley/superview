import React from 'react';
import YouTube from 'react-youtube';
import Grid from 'material-ui/Grid';

class Player extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1
      }
    };

    return (
      <div className="Player-wrapper">
        <Grid container spacing={0} direction="row" className="Player-wrapper">
          
          <Grid item xs={12}>
            <Grid container spacing={0} justify="center" direction="row" className="Player-wrapper">
              {(() => { if ( this.props.match.params.id && !this.props.match.params.id2 ) {
                return (
                  <Grid item xs={12}>
                    <div className="Player flex-item">
                      <YouTube
                        videoId={this.props.match.params.id}
                        opts={opts}
                        onReady={this._onReady}
                      />
                    </div>
                  </Grid>
                )
              } })()}
              {(() => { if ( this.props.match.params.id && this.props.match.params.id2 ) {
                return (
                  <Grid item xs={12} md={6}>
                    <div className="Player flex-item">
                      <YouTube
                        videoId={this.props.match.params.id}
                        opts={opts}
                        onReady={this._onReady}
                      />
                    </div>
                  </Grid>
                )
              } })()}
              {(() => { if ( this.props.match.params.id2 ) {
                return (
                  <Grid item xs={12} md={6}>
                    <div className="Player flex-item">
                      <YouTube
                        videoId={this.props.match.params.id2}
                        opts={opts}
                        onReady={this._onReady}
                      />
                    </div>
                  </Grid>
                )
              } })()}
            </Grid>
          </Grid>

          {(() => { if ( this.props.match.params.id3 || this.props.match.params.id4 ) {
            return (
              <Grid item xs={12}>

                <Grid container spacing={0} justify="center" direction="row" className="Player-wrapper">
                  {(() => { if ( this.props.match.params.id3 && !this.props.match.params.id4 ) {
                    return (
                      <Grid item xs={12}>
                        <div className="Player flex-item">
                          <YouTube
                            videoId={this.props.match.params.id3}
                            opts={opts}
                            onReady={this._onReady}
                          />
                        </div>
                      </Grid>
                    )
                  } })()}
                  {(() => { if ( this.props.match.params.id3 && this.props.match.params.id4  ) {
                    return (
                      <Grid item xs={12} md={6}>
                        <div className="Player flex-item">
                          <YouTube
                            videoId={this.props.match.params.id3}
                            opts={opts}
                            onReady={this._onReady}
                          />
                        </div>
                      </Grid>
                    )
                  } })()}
                  {(() => { if ( this.props.match.params.id4 ) {
                    return (
                      <Grid item xs={12} md={6}>
                        <div className="Player flex-item">
                          <YouTube
                            videoId={this.props.match.params.id4}
                            opts={opts}
                            onReady={this._onReady}
                          />
                        </div>
                      </Grid>
                    )
                  } })()}
                </Grid>

              </Grid>
            )
          } })()}

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
