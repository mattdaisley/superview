import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import querystring from 'query-string';
import { connect } from 'react-redux';

import { twitchLoginSuccess } from './Redux/ActionCreators';

import Header  from './Components/Header';
import Main    from './Components/Main';
import SideNav from './Components/SideNav';

import './App.css';
import 'typeface-roboto';

class App extends React.Component {
// const App = props => {

  componentDidMount() {
    // this.props.updateTime();
    const hash = window.location.hash;

    if ( hash ) {
      const response = querystring.parse(hash.substr(1))
      // if (response.state !== state) {
        // reject('Invalid state returned.')
      // }
  
      if (response.access_token) {
        const expiresIn = response.expires_in ? parseInt(response.expires_in, 10) : NaN
        const result = {
          token: response.access_token,
          expiresAt: !isNaN(expiresIn) ? new Date().getTime() + expiresIn * 1000 : null
        }
        this.props.twitchLoginSuccess(result);
        // resolve(result)
      } else {
        // reject(response.error || 'Unknown error.')
      }
    }
  }

  render() {
    return (
      <Router>
        <div className="router-container">
          <Header />
          <Main />
          <SideNav/>
        </div>
      </Router>
    );
  }

}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.twitchOauth.loggedIn
  }
}
const mapDispatchToProps = dispatch => ({
  twitchLoginSuccess: (result) => dispatch(twitchLoginSuccess(result))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
