import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import querystring from 'query-string';
import { connect } from 'react-redux';

import { twitchLoginSuccess }  from './Redux/Twitch/TwitchActionCreators';
import { youtubeLoginSuccess } from './Redux/Youtube/YoutubeActionCreators';

import Header  from './Components/Header';
import Main    from './Components/Main';
import SideNav from './Components/SideNav';
import ChannelsList from './Components/ChannelsList/ChannelsList';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import green  from 'material-ui/colors/green';
import red    from 'material-ui/colors/red';
import Button from 'material-ui/Button';

import './App.css';
import 'typeface-roboto';

class App extends React.Component {
// const App = props => {

  componentDidMount() {
    // this.props.updateTime();
    const hash = window.location.hash;

    if ( hash ) {
      const response = querystring.parse(hash.substr(1))
      const state = ( response.state ) ? response.state.split(',') : [];
      // if (response.state !== state) {
        // reject('Invalid state returned.')
      // }
  
      if (response.access_token) {
        const expiresIn = response.expires_in ? parseInt(response.expires_in, 10) : NaN
        const referrer = state[1]
        const result = {
          token: response.access_token,
          expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null,
          referrer,
        }
        console.log(result);
        if ( state.length > 0 && state[0] === 'youtubeLoggedIn' ) {
          this.props.youtubeLoginSuccess(result);
        }
        if ( state.length > 0 && state[0] === 'twitchLoggedIn' ) {
          this.props.twitchLoginSuccess(result);
        }
        // resolve(result)
      } else {
        // reject(response.error || 'Unknown error.')
      }
    }
  }

  render() {
    let playerChannelDetails = [];
    let source = '';
    if ( this.props.channelDetails.length > 0 ) { 
      playerChannelDetails = this.props.channelDetails;
      source = 'tw';
    }
    if ( this.props.youtubeChannelDetails.length > 0 ) { 
      playerChannelDetails = this.props.youtubeChannelDetails;
      source = 'yt';
    }
    
    const theme = createMuiTheme({
      palette: {
        primary: {
          ...green,
          A400: '#00e677',
        },
        secondary: blue,
        error: red,
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="router-container">
            <Header />
            <Main />
            <SideNav />
            <ChannelsList source={source} channels={playerChannelDetails}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }

}


const mapStateToProps = state => {
  return {
    twitchLoggedIn: state.twitchOauth.loggedIn,
    channelDetails: state.twitchDetails.channelDetails,
    youtubeChannelDetails: state.youtubeDetails.channelDetails,
  }
}
const mapDispatchToProps = dispatch => ({
  twitchLoginSuccess: (result) => dispatch(twitchLoginSuccess(result)),
  youtubeLoginSuccess: (result) => dispatch(youtubeLoginSuccess(result)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
