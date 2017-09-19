import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home    from '../Components/HomePage/Home';
import Recents from '../Components/RecentsPage/Recents';
// import Player  from '../Components/PlayerPage/Player';
import PlayerOpener  from '../Components/PlayerPage/PlayerOpener';


class Main extends React.Component {

  render() {    
  
    return (
      <div className="main-container">
        <Switch>
          <Route exact path='/recents' component={Recents}/>

          {/* <Route path='/:source/:id1/:id2?/:id3?/:id4?/:id5?/:id6?' component={Player}/> */}
          <Route path='/:source/:id1/:id2?/:id3?/:id4?/:id5?/:id6?' component={PlayerOpener}/>
          <Route exact path='/' component={Home}/>
          <Redirect from='/' to='/'/>
        </Switch>
      </div>
    );
  }
}

export default Main;
