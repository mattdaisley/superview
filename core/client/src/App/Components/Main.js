import React from 'react';
// import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Grid         from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import Home    from '../Components/HomePage/Home';
import Recents from '../Components/RecentsPage/Recents';
import YtSubscriptions from '../Components/YouTube/Browse/Subscriptions/Subscriptions';
import TwFollowing   from '../Components/Twitch/Browse/Following/Following';
// import Player  from '../Components/PlayerPage/Player';
import PlayerOpener  from '../Components/PlayerPage/PlayerOpener';


const styles = theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
    },
    [theme.breakpoints.down('md')]: {
    },
    marginBottom: 100
  },
  homeGridWrapper: {
    [theme.breakpoints.up('sm')]: {
      width: 600
    },
    [theme.breakpoints.up('md')]: {
      width: 960 - 200
    },
    [theme.breakpoints.up('lg')]: {
      width: 1280 - 200
    },
    [theme.breakpoints.up('xl')]: {
      width: 1920 - 300
    },
  }
})

class Main extends React.Component {

  render() {    
    const classes = this.props.classes;
  
    return (
      <div className="main-container">
        <div className={classes.root}>
          <Grid container spacing={0} justify="center">
            <div className={classes.homeGridWrapper}>
              <Switch>
                <Route exact path='/browse/recents' component={Recents}/>
                <Route exact path='/browse/yt/subscriptions' component={YtSubscriptions}/>
                <Route exact path='/browse/tw/following' component={TwFollowing}/>

                {/* <Route path='/:source/:id1/:id2?/:id3?/:id4?/:id5?/:id6?' component={Player}/> */}
                <Route path='/:source/:id1/:id2?/:id3?/:id4?/:id5?/:id6?' component={PlayerOpener}/>
                <Route exact path='/' component={Home}/>
                <Redirect from='/' to='/'/>
              </Switch>
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => { return { } }
// const mapDispatchToProps = dispatch => ({ })

const MainWithStyles = withStyles(styles)(Main);
// export default connect(mapStateToProps, mapDispatchToProps)(MainWithStyles);
export default MainWithStyles;
