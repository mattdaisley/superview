import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Switch, Route, Redirect } from 'react-router-dom';
import querystring from 'query-string';
import { connect } from 'react-redux';

import { twitchLoginSuccess }  from './Redux/Twitch/TwitchActionCreators';
import { youtubeLoginSuccess } from './Redux/Youtube/YoutubeActionCreators';
import { playerOpen }  from './Redux/Player/PlayerActionCreators';
import { playerClose } from './Redux/Player/PlayerActionCreators';

import Header  from './Components/Header';
import Main    from './Components/Main';
import SideNav from './Components/SideNav';
import ChannelsList from './Components/ChannelsList/ChannelsList';
import Player  from './Components/PlayerPage/Player';

import Dialog from 'material-ui/Dialog';
import Slide  from 'material-ui/transitions/Slide';
import blue   from 'material-ui/colors/blue';
import green  from 'material-ui/colors/green';
import red    from 'material-ui/colors/red';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';

import './App.css';
import 'typeface-roboto';



const styles = theme => ({
  sideNav: {
    zIndex: 10000,
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
})

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleClickOpen    = this.handleClickOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    
    this.state = {
      open: false,
    }
  }
  
  handleClickOpen = () => {
    // this.setState({ open: true });
    this.props.playerOpen()
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

// const App = props => {

  //http://localhost:7768/#twitch_access_token=o365yyboxcwfh1ev8p4f4rcq6brix1&twitch_refresh_token=8hhb2azd9t71j1j8m8oehyxq77c5iqu7lnc067d1gkwuftriz4&expiry_date=14602&state=twitchLoggedIn
  componentDidMount() {
    // this.props.updateTime();
    const hash = window.location.hash;

    if ( hash ) {
      const response = querystring.parse(hash.substr(1))
      const state = ( response.state ) ? response.state.split(',') : [];
      // if (response.state !== state) {
        // reject('Invalid state returned.')
      // }
  
      if (response.twitch_access_token) {
        const expiresIn = response.expiry_date ? parseInt(response.expiry_date, 10) : NaN
        const referrer = state[1]
        const result = {
          token: response.twitch_access_token,
          refresh: response.twitch_refresh_token,
          expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null,
          referrer,
        }
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
    let playerSources = [];
    let source = '';
    if ( this.props.channelDetails.length > 0 ) { 
      playerSources = this.props.channelDetails;
      source = 'tw';
    }
    if ( this.props.youtubeChannelDetails.length > 0 ) { 
      playerSources = this.props.youtubeChannelDetails;
      source = 'yt';
    }
    
    const theme = createMuiTheme({
      palette: {
        primary: {
          ...green,
          A400: '#00e677',
        },
        accent: green,
        secondary: blue,
        error: red,
      },
    });
    const classes = this.props.classes;

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="router-container">
            <Header />
            <Main />
            {/* <Player /> */}
            <Dialog
              fullScreen
              open={this.props.isPlayerOpen}
              onRequestClose={this.handleRequestClose}
              transition={<Slide direction="up" />}
            >
              <Switch>
                <Route path='/:source/:id1/:id2?/:id3?/:id4?/:id5?/:id6?' component={Player}/>
              </Switch>
            </Dialog>
            <div className={classes.sideNav}><SideNav/></div>
            <ChannelsList source={source} sources={playerSources}/>
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
    isPlayerOpen: state.player.open,
  }
}
const mapDispatchToProps = dispatch => ({
  twitchLoginSuccess:  (result) => dispatch(twitchLoginSuccess(result)),
  youtubeLoginSuccess: (result) => dispatch(youtubeLoginSuccess(result)),
  playerOpen:  () => dispatch(playerOpen()),
  playerClose: () => dispatch(playerClose()),
})

const AppWithStyles = withStyles(styles)(App);
export default connect(mapStateToProps, mapDispatchToProps)(AppWithStyles);
