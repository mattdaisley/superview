import React from 'react'
// import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Grid         from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

import ChannelPage     from './ChannelPage/ChannelPage'
import HomePage        from './HomePage/HomePage'
import PlayerPage      from './PlayerPage/PlayerPage'
import Recents         from './RecentsPage/Recents'
import TwFollowing     from './Twitch/Browse/Following/Following'
import TwFeatured      from './Twitch/Browse/Featured/Featured'
import YtSubscriptions from './YouTube/Browse/Subscriptions/Subscriptions'
import YtPopular       from './YouTube/Browse/Popular/Popular'


const styles = theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
    },
    [theme.breakpoints.down('md')]: {
    },
    marginBottom: 90
  },
  homeGridWrapper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: 10,
      boxSizing: 'border-box',
    },
    [theme.breakpoints.up('sm')]: {
      width: 600,
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
  },
})

class Main extends React.Component {

  render() {    
    const classes = this.props.classes
  
    return (
      <div className="main-container">
        <div className={classes.root}>
          <Grid container spacing={0} justify="center">
            <div className={classes.homeGridWrapper}>
              <Switch>
                <Route exact path='/browse/recents' component={Recents}/>
                <Route exact path='/browse/yt/subscriptions' component={YtSubscriptions}/>
                <Route exact path='/browse/yt/popular' component={YtPopular}/>
                <Route exact path='/browse/tw/following' component={TwFollowing}/>
                <Route exact path='/browse/tw/featured' component={TwFeatured}/>
                <Route exact path='/channel/:sourceType/:channelId' component={ChannelPage}/>
                <Route exact path='/channel/:sourceType/:channelId' component={ChannelPage}/>
                <Route path='/:sourceType/:id1/:id2?/:id3?/:id4?/:id5?/:id6?' component={PlayerPage}/>
                <Route exact path='/' component={HomePage}/>
                <Redirect from='/' to='/'/>
              </Switch>
            </div>
          </Grid>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => { return { } }
// const mapDispatchToProps = dispatch => ({ })

const MainWithStyles = withStyles(styles)(Main)
// export default connect(mapStateToProps, mapDispatchToProps)(MainWithStyles)
export default MainWithStyles
