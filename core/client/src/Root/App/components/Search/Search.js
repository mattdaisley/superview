import React       from 'react'
import ReactDOM    from 'react-dom';
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import List from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

import SearchBox            from './SearchBox/SearchBox'
import SearchResults        from './SearchResults/SearchResults'
// import ChannelSearchResults from './ChannelSearchResults/ChannelSearchResults'

// import { twitchSearch, resetTwitchSearch } from '../../Redux/Twitch/TwitchActionCreators'
// import { youtubeSearch, youtubeChannelSearch } from '../../Redux/Youtube/YoutubeActionCreators'
// import { addChannelId } from '../../Redux/Player/ChannelsList/ChannelsListActionCreators'
import { googleApiActionCreators } from 'store/modules/google/googleApi'

import styles from './Search.styles'

class Search extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      searchValue: '',
      open: false
    }

    this.onSearchChange   = this.onSearchChange.bind(this)
    this.handleAddClicked = this.handleAddClicked.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount = () => {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = (e) => {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target)) this.close()
  }

  open = () => {
    this.setState({open: true})
  }

  close = () => {
    this.setState({open: false})
  }
  
  onSearchChange = (event) => {
    if ( !this.state.open ) this.setState({open: true})
    if ( this.state.timeoutId ) clearInterval(this.state.timeoutId)

    const searchValue = event.target.value
    const timeoutId = setTimeout( () => {
      // this.props.twitchSearch(searchValue)
      this.props.youtubeSearch(searchValue.trim())
      this.props.youtubeChannelSearch(searchValue.trim())
    }, 300)
    this.setState( {timeoutId, searchValue} )
  }

  handleSourceClicked = ( video ) => {
    this.setState({open: false})
    const route = '/' + video.source_type + '/' + video.id
    this.context.router.history.push(route)
  }
  
  handleChannelClicked = ( channel ) => {
    this.setState({open: false})
    const route = '/channel/' + channel.source_type + '/' + channel.channel_id
    this.context.router.history.push(route)
  }
  
  handleAddClicked = ( video ) => {
    this.props.addChannelId( video.source_type, video.id )
  }

  render = () => {

    const { videos, channels, classes } = this.props
    const { open, searchValue } = this.state

    return (
      <List dense className={classes.searchContainer}>

        <SearchBox open={this.open} searchValue={searchValue} onSearchChange={this.onSearchChange} />

        <SearchResults 
          hidden={!open || searchValue === ''} 
          videoSources={videos} 
          channelSources={channels}
          gotoSource={this.handleSourceClicked} 
          gotoChannel={this.handleChannelClicked}
          addSource={this.handleAddClicked} />

      </List>
    )
  }
}

Search.propTypes = {
}

Search.defaultProps = {
}

const mapStateToProps = state => {
  return {
    twitchLoggedIn:  state.twitchAuth.loggedIn,
    youtubeLoggedIn: state.googleAuth.loggedIn,
    twitchSearchResults: state.twitchApi.twitchSearchResults,
    videos: state.googleApi.youtubeSearchResults.videos,
    channels: state.googleApi.youtubeSearchResults.channels,
  }
}
// const mapDispatchToProps = dispatch => ({
//   // twitchSearch: (query) => dispatch(twitchSearch(query)),
//   // resetTwitchSearch: () => dispatch(resetTwitchSearch()),
//   youtubeSearch: (query) => dispatch(youtubeSearch(query)),
//   // resetYoutubeSearch: (query) => dispatch(resetYoutubeSearch(query)),
//   youtubeChannelSearch: (query) => dispatch(youtubeChannelSearch(query)),
//   // resetYoutubeChannelSearch: (query) => dispatch(resetYoutubeChannelSearch(query)),
//   addChannelId: (sourceType, channelIds) => dispatch(addChannelId(sourceType, channelIds)),
// })
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...googleApiActionCreators,
  }, dispatch)
)


const SearchWithStyles = withStyles(styles)(Search)

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithStyles)