import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home    from './Home';
import SideNav from './SideNav';
import Recents from './Recents';
import Player  from './Player';

class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <SideNav/>

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/recents' component={Recents}/>

          <Route path='/:source/:id/:id2/:id3/:id4' component={Player}/>
          <Route path='/:source/:id/:id2/:id3' component={Player}/>
          <Route path='/:source/:id/:id2' component={Player}/>
          <Route path='/:source/:id' component={Player}/>
        </Switch>
      </div>
    );
  }
}

export default Main;
