import React, { Component } from 'react'
import { BrowserRouter }    from 'react-router-dom'
import { connect }          from 'react-redux'
import { bindActionCreators } from 'redux'
// import PropTypes            from 'prop-types'
// import querystring          from 'query-string'
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme       from 'material-ui/styles/createMuiTheme'
import blue                 from 'material-ui/colors/blue'

import Main      from './Main/Main'
import Header    from './Header/Header'

import { windowActionCreators } from './store/modules/window'

class App extends Component {

  componentDidMount() {
    this.updateWindowDimensions()
    this.props.handleHash( window.location.hash )
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.props.setWidth(window.innerWidth)
    this.props.setHeight(window.innerHeight)
  }

  render() { 

    const theme = createMuiTheme({
      palette: {
        primary: {
          ...blue,
          A700: '#3A93F1',
        },
      },
    })

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Main />
            {/* <PersistentPlayer /> */}
            <Header />
            {/* <SideNav /> */}
            {/* <SourceList/> */}
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    windowWidth: state.window.width,
  }
}
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...windowActionCreators,
  }, dispatch)
)

// const AppWithStyles = withStyles(styles)(App)
export default connect(mapStateToProps, mapDispatchToProps)(App)
 
// export default App