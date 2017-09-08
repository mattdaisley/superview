import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home    from '../Components/HomePage/Home';
import Recents from '../Components/RecentsPage/Recents';
import Player  from '../Components/PlayerPage/Player';

class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/recents' component={Recents}/>

          <Route path='/:source/:id/:id2?/:id3?/:id4?/:id5?/:id6?' component={Player}/>
        </Switch>
      </div>
    );
  }
}

export default Main;
