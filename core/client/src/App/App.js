import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { Switch, Route, Redirect } from 'react-router-dom'
import querystring from 'query-string'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import { twitchLoginSuccess }  from './Redux/Twitch/TwitchActionCreators'
import { youtubeLoginSuccess } from './Redux/Youtube/YoutubeActionCreators'
import { playerOpen, playerClose } from './Redux/Player/PlayerActionCreators'
import { setWindowWidth, setWindowHeight } from './Redux/Window/WindowActionCreators'

import Header  from './Components/Header'
import Main    from './Components/Main'
import SideNav from './Components/SideNav'
import ChannelsList from './Components/ChannelsList/ChannelsList'
import Player  from './Components/PlayerPage/Player'
import PlayerMinimizedHeader from './Components/PlayerPage/PlayerMinimizedHeader'

// import Dialog from 'material-ui/Dialog'
// import Slide  from 'material-ui/transitions/Slide'
import blue   from 'material-ui/colors/blue'
import green  from 'material-ui/colors/green'
import red    from 'material-ui/colors/red'
// import Icon       from 'material-ui/Icon'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'

import './App.css'
import 'typeface-roboto'

const playerSmallWidth = 400
const playerTitleHeight = 40

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
  playerPersistent: {
    position: 'fixed',
    zIndex: 9000,
  },
  minimized: {
    [theme.breakpoints.up('md')]: {
      bottom: 100,
      right: 20,
      width: playerSmallWidth,
      height: ( playerSmallWidth * 9/16 + playerTitleHeight ),
    },
    [theme.breakpoints.down('md')]: {
      bottom: 86,
      right: 10,
      width: 250,
      height: ( 250 * 9/16 + playerTitleHeight ),
    },
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
  playerPersistentMobile: {
    zIndex: 9000,
  },
  playerPersistentMobileMinimized: {
    bottom: 120
  },
  playerPersistentMobileOpen: {
    // top: 56,
    // bottom: 50,
    // height: 'auto'
    height: '100%',
    paddingBottom: 50,
    paddingTop: 56,
    position: 'relative',
    boxSizing: 'border-box',
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
    height: 'calc(100% - 50px)',
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
  },
  hidden: {
    display: 'none'
  }

})

class App extends React.Component {
  
  constructor(props) {
    super(props)

    this.handleClickOpen    = this.handleClickOpen.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleSideNavOpen  = this.handleSideNavOpen.bind(this)
    this.handleSideNavClose = this.handleSideNavClose.bind(this)

    this.state = {
      open: false,
      isSideNavOpen: false,
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

// const App = props => {

  //http://localhost:7768/#twitch_access_token=o365yyboxcwfh1ev8p4f4rcq6brix1&twitch_refresh_token=8hhb2azd9t71j1j8m8oehyxq77c5iqu7lnc067d1gkwuftriz4&expiry_date=14602&state=twitchLoggedIn
  componentDidMount() {
    // this.props.updateTime()
    const hash = window.location.hash

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
          this.props.twitchLoginSuccess(result)
        }
      }
    }
  
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = debounce(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    console.log('updateWindowDimensions', width, height)
    
    this.props.setWindowWidth(width)
    this.props.setWindowHeight(height)
  })
  
  handleClickOpen = () => {
    // this.setState({ open: true })
    this.props.playerOpen()
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleSideNavOpen = () => {
    this.setState({ isSideNavOpen: true })
  }

  handleSideNavClose = () => {
    this.setState({ isSideNavOpen: false })
  }

  render() {
    let source = ''
    let placeholderHidden = false

    if ( this.props.channelDetails.length > 0 ) { 
      placeholderHidden = true
      source = 'tw'
    }
    if ( this.props.youtubeChannelDetails.length > 0 ) { 
      placeholderHidden = true
      source = 'yt'
    }
    
    const theme = createMuiTheme({
      palette: {
        primary: {
          ...blue,
          A700: '#3A93F1',
        },
        // primary: {
        //   ...blue,
        //   A400: '#00e677',
        // },
        accent: green,
        secondary: blue,
        error: red,
      },
    })

    const classes = this.props.classes

    let playerClass = [ classes.playerPersistent ]
    if ( this.props.windowWidth <= 1280 ) playerClass.push(classes.playerPersistentMobile)

    let placeholderCtrOpenClass, placeholderOpenClass, placeholderCtrHiddenClass
    switch( this.props.openState ) {
      case 'open':
        playerClass.push(classes.open)
        placeholderCtrOpenClass = classes.placeholderCtrOpen
        placeholderOpenClass = classes.placeholderOpen
        if ( placeholderHidden ) placeholderCtrHiddenClass = classes.hidden
        if ( this.props.windowWidth <= 1280 ) playerClass.push(classes.playerPersistentMobileOpen)
        break
      case 'minimized':
      default:
        playerClass.push(classes.minimized)
        placeholderCtrOpenClass = classes.placeholderCtrMinimized
        placeholderOpenClass = classes.placeholderMinimized
        if ( this.props.windowWidth <= 1280 ) playerClass.push(classes.playerPersistentMobileMinimized)
        break
    }
    // const playerRouteOpenClass = ( !this.props.isPlayerOpen ) ? classes.closed : classes.open
    // const placeholderCtrOpenClass = ( !this.props.isPlayerOpen ) ? classes.placeholderCtrClosed : classes.placeholderCtrOpen
    // const placeholderOpenClass = ( !this.props.isPlayerOpen ) ? classes.placeholderClosed : classes.placeholderOpen
    // const playerRouteOpenClass = classes.closed
    // const placeholderCtrOpenClass =  classes.placeholderCtrClosed
    // const placeholderOpenClass = classes.placeholderClosed

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
              <div className={playerClass.join(' ')}>
                { this.props.openState === 'minimized' && (
                  <PlayerMinimizedHeader 
                    sourceType={this.props.sourceType} 
                    playerClose={() => this.props.playerClose()} />
                )}
                <div className={classes.player}>

                  <div className={[classes.placeholderContainer, placeholderCtrOpenClass, placeholderCtrHiddenClass].join(' ')}>
                    <div className={[classes.placeholder, placeholderOpenClass].join(' ')}></div>
                  </div>

                  <Player />
                </div>
              </div>
            )}
            {/* </Dialog> */}

            {/* <div className={classes.sideNav}><SideNav isSideNavOpen={this.state.isSideNavOpen}/></div> */}
            <SideNav isSideNavOpen={this.state.isSideNavOpen} handleSideNavClose={this.handleSideNavClose}/>

            <ChannelsList source={source}/>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }

}


const mapStateToProps = state => {
  return {
    twitchLoggedIn: state.twitchOauth.loggedIn,
    channelDetails: state.twitchDetails.channelDetails,
    youtubeChannelDetails: state.youtubeDetails.channelDetails,
    openState: state.player.openState,
    sourceType: state.player.sourceType,
    windowWidth: state.window.width,
  }
}
const mapDispatchToProps = dispatch => ({
  twitchLoginSuccess:  (result) => dispatch(twitchLoginSuccess(result)),
  youtubeLoginSuccess: (result) => dispatch(youtubeLoginSuccess(result)),
  playerOpen:  () => dispatch(playerOpen()),
  playerClose: () => dispatch(playerClose()),
  setWindowWidth: (width) => dispatch(setWindowWidth(width)),
  setWindowHeight: (height) => dispatch(setWindowHeight(height)),
})

const AppWithStyles = withStyles(styles)(App)
export default connect(mapStateToProps, mapDispatchToProps)(AppWithStyles)
