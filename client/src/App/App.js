import React, { Component } from 'react';

import './App.css';

import 'typeface-roboto';

import Header from './Components/Header';
import Main from './Components/Main';
import SideNav from './Components/SideNav';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <SideNav/>
      </div>
    );
  }
}

export default App;
