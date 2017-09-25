import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// import { Switch, Route, Redirect } from 'react-router-dom';
import querystring from 'query-string';
import { connect } from 'react-redux';

import { twitchLoginSuccess }  from './Redux/Twitch/TwitchActionCreators';
import { youtubeLoginSuccess } from './Redux/Youtube/YoutubeActionCreators';
import { playerOpen, playerClose } from './Redux/Player/PlayerActionCreators';

import Header  from './Components/Header';
import Main    from './Components/Main';
import SideNav from './Components/SideNav';
import ChannelsList from './Components/ChannelsList/ChannelsList';
import Player  from './Components/PlayerPage/Player';

// import Dialog from 'material-ui/Dialog';
// import Slide  from 'material-ui/transitions/Slide';
import blue   from 'material-ui/colors/blue';
import green  from 'material-ui/colors/green';
import red    from 'material-ui/colors/red';
// import Icon       from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import CloseIcon  from 'material-ui-icons/Close';
import InputIcon  from 'material-ui-icons/Input';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';

import './App.css';
import 'typeface-roboto';

const playerSmallWidth = 400;
const playerTitleHeight = 40;

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
  playerPersitent: {
    position: 'fixed',
    zIndex: 9000,
  },
  minimized: {
    top: 86,
    right: 100,
    width: playerSmallWidth,
    height: ( playerSmallWidth * 9/16 + playerTitleHeight ),
    transition: [
      theme.transitions.create('top', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      }),
      theme.transitions.create('right', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      }),
      theme.transitions.create('width', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      }),
      theme.transitions.create('height', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      }),
    ].join(', ')
  },
  open: {
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    transition: [
      theme.transitions.create('top', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      }),
      theme.transitions.create('right', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      }),
      theme.transitions.create('width', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      }),
      theme.transitions.create('height', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      }),
    ].join(', ')
  },
  title: {
    position: 'relative',
    height: playerTitleHeight,
    border: '1px solid #ccc',
    backgroundColor: '#efefef'
  },
  titleButton: {
    height: playerTitleHeight,
    width: playerTitleHeight
  },
  player: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  placeholderContainer: {
    position: 'absolute',
    overflowY: 'auto',
    right: 0,
  },
  placeholderCtrOpen: {
    width: '100%',
    height: 'calc(100% - 70px)',
    top: '70px',
    bottom: 0,
  },
  placeholderCtrMinimized: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: '#444',
  },
  placeholderOpen: {
    width: 'calc(100% - 200px)',
    margin: '20px auto',
    height: 'calc(100vh - 220px)',
  },
  placeholderMinimized: {
    width: '100%',
    margin: '0',
    height: '100%',
  }

})

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleClickOpen    = this.handleClickOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSideNavOpen  = this.handleSideNavOpen.bind(this);
    this.handleSideNavClose = this.handleSideNavClose.bind(this);

    this.state = {
      open: false,
      isSideNavOpen: false,
    }
  }
  
  handleClickOpen = () => {
    // this.setState({ open: true });
    this.props.playerOpen()
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSideNavOpen = () => {
    this.setState({ isSideNavOpen: true })
  }

  handleSideNavClose = () => {
    this.setState({ isSideNavOpen: false })
  }

// const App = props => {

  //http://localhost:7768/#twitch_access_token=o365yyboxcwfh1ev8p4f4rcq6brix1&twitch_refresh_token=8hhb2azd9t71j1j8m8oehyxq77c5iqu7lnc067d1gkwuftriz4&expiry_date=14602&state=twitchLoggedIn
  componentDidMount() {
    // this.props.updateTime();
    const hash = window.location.hash;

    if ( hash ) {
      const response = querystring.parse(hash.substr(1))
      const expiresIn = response.expiry_date ? parseInt(response.expiry_date, 10) : NaN
      const state = ( response.state ) ? response.state.split(',') : []
      const referrer = state[1] || '/'

      if (response.twitch_access_token) {
        let result = {
          token: response.twitch_access_token,
          refresh: response.twitch_refresh_token,
          expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null,
          referrer,
        }
        if ( state.length > 0 && state[0] === 'twitchLoggedIn' ) {
          this.props.twitchLoginSuccess(result);
        }
        // resolve(result)
      } 
      
      if (response.google_access_token) {
        let result = {
          google_user_id: response.google_user_id,
          token: response.google_access_token,
          refresh: response.google_refresh_token,
          expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null,
          referrer,
        }
        if ( state.length > 0 && state[0] === 'googleLoggedIn' ) {
          this.props.youtubeLoginSuccess(result);
        }
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
          ...blue,
          A400: '#00e677',
        },
        accent: green,
        secondary: blue,
        error: red,
      },
    });

    const classes = this.props.classes;

    let playerPersistentOpenClass, placeholderCtrOpenClass, placeholderOpenClass;
    switch( this.props.openState ) {
      case 'open':
        playerPersistentOpenClass = classes.open;
        placeholderCtrOpenClass = classes.placeholderCtrOpen;
        placeholderOpenClass = classes.placeholderOpen;
        break;
      case 'minimized':
      default:
        playerPersistentOpenClass = classes.minimized;
        placeholderCtrOpenClass = classes.placeholderCtrMinimized;
        placeholderOpenClass = classes.placeholderMinimized;
        break;
    }
    // const playerRouteOpenClass = ( !this.props.isPlayerOpen ) ? classes.closed : classes.open;
    // const placeholderCtrOpenClass = ( !this.props.isPlayerOpen ) ? classes.placeholderCtrClosed : classes.placeholderCtrOpen;
    // const placeholderOpenClass = ( !this.props.isPlayerOpen ) ? classes.placeholderClosed : classes.placeholderOpen;
    // const playerRouteOpenClass = classes.closed;
    // const placeholderCtrOpenClass =  classes.placeholderCtrClosed;
    // const placeholderOpenClass = classes.placeholderClosed;

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="router-container">
            <Header isSideNavOpen={this.state.isSideNavOpen} handleSideNavOpen={this.handleSideNavOpen} handleSideNavClose={this.handleSideNavClose}/>

            <Main />

            {/* <Player /> */}
            {/* <Dialog
              fullScreen
              open={this.props.isPlayerOpen}
              onRequestClose={this.handleRequestClose}
              transition={<Slide direction="up" />}
            > */}
            { this.props.openState !== 'closed' && (
              <div className={[classes.playerPersitent, playerPersistentOpenClass].join(' ')}>
                { this.props.openState === 'minimized' && (
                  <div className={classes.title}>
                    <IconButton className={classes.titleButton} aria-label="Close" onClick={() => this.props.playerClose()}>
                      <CloseIcon />
                    </IconButton>
                    <Link to={'/'+this.props.sourceType + '/' + this.props.playerSources.join('/')}>
                      <IconButton className={classes.titleButton} aria-label="Open">
                        <InputIcon /> 
                      </IconButton>
                    </Link>
                  </div> 
                )}
                <div className={classes.player}>

                  <div className={[classes.placeholderContainer, placeholderCtrOpenClass].join(' ')}>
                    <div className={[classes.placeholder, placeholderOpenClass].join(' ')}></div>
                  </div>

                  <Player />
                </div>
              </div>
            )}
            {/* </Dialog> */}

            {/* <div className={classes.sideNav}><SideNav isSideNavOpen={this.state.isSideNavOpen}/></div> */}
            <SideNav isSideNavOpen={this.state.isSideNavOpen} handleSideNavClose={this.handleSideNavClose}/>

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
    openState: state.player.openState,
    sourceType: state.player.sourceType,
    playerSources: state.player.sources
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
