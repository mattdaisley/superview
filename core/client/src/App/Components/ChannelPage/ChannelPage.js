import React        from 'react'
import { connect }  from 'react-redux'
import NumberFormat from 'react-number-format'

import Avatar         from 'material-ui/Avatar'
import Grid           from 'material-ui/Grid'
import Typography     from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import { getYoutubeChannel, getYoutubePlaylistItems } from '../../Redux/Youtube/YoutubeActionCreators'

import { compareArrays } from '../../Util/utils'

import YoutubePlaylistGrid from '../YouTube/YoutubePlaylistGrid/YoutubePlaylistGrid'

const styles = theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
    boxSizing: 'border-box',
  },
  channelAvatar: {
    width: 100,
    height: 'auto',
    marginRight: 20,
  },
  details: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {

  }
})

class ChannelPage extends React.Component {
  
  // constructor(props) {
  //   super(props)
  //   // console.log('Home props', props)
  // }

  componentDidMount() {
    this.loadChannel(this.props)
  }

  loadChannel(props) {
    const { sourceType, channelId } = props.match.params
    console.log(sourceType, channelId)
    if ( sourceType === 'yt' ) props.getYoutubeChannel(channelId)
  }

  componentWillReceiveProps(nextProps) {
    if ( !compareArrays(this.props.youtubeChannel, nextProps.youtubeChannel) ) {
      nextProps.getYoutubePlaylistItems(nextProps.youtubeChannel.uploadsPlaylist)
    }
  }

  render() {
    const { windowWidth, youtubeChannel, youtubePlaylistItems, classes } = this.props
    console.log(youtubeChannel)

    let playlistGrids
    console.log(youtubePlaylistItems)
    if ( youtubePlaylistItems.length > 0 ) {
      playlistGrids = youtubePlaylistItems.map( (playlistItems, index) => (
        <YoutubePlaylistGrid key={index} playlistItems={playlistItems} />
      ))
    }

    return (
      <Grid item xs={12}>
        <Grid container spacing={0} >
          { Object.keys(youtubeChannel).length > 0 && (
            <Grid item xs={12}>
              <div key="channelHeader" className={classes.wrapper}>
                <Avatar
                  alt={youtubeChannel.title}
                  src={youtubeChannel.logo}
                  className={classes.channelAvatar}
                />

                <div className={classes.details}>
                  <Typography type="title">
                    {youtubeChannel.title}
                  </Typography>
                  <Typography type="subheading">
                    <NumberFormat value={parseInt(youtubeChannel.subscriberCount || 0, 10)} thousandSeparator={true} displayType={'text'} /> subscribers
                  </Typography>
                </div>
              </div>
              {playlistGrids}
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    windowWidth: state.window.width,
    youtubeChannel: state.youtubeDetails.channel,
    youtubePlaylistItems: state.youtubeDetails.playlistItems,
  }
}
const mapDispatchToProps = dispatch => ({
  getYoutubeChannel: (channelId) => dispatch(getYoutubeChannel(channelId)),
  getYoutubePlaylistItems: (playlistId) => dispatch(getYoutubePlaylistItems(playlistId)),
})


const ChannelPageWithStyles = withStyles(styles)(ChannelPage)
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPageWithStyles)