import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header  from './Components/Header';
import Main    from './Components/Main';
import SideNav from './Components/SideNav';

import './App.css';
import 'typeface-roboto';

const App = props => {
  
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

export default App;
