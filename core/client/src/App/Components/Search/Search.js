import React       from 'react'
import ReactDOM    from 'react-dom';
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import List from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

import SearchBox            from './SearchBox/SearchBox'
import SearchResults        from './SearchResults/SearchResults'
// import ChannelSearchResults from './ChannelSearchResults/ChannelSearchResults'

import { twitchSearch, resetTwitchSearch } from '../../Redux/Twitch/TwitchActionCreators'
import { youtubeSearch, youtubeChannelSearch } from '../../Redux/Youtube/YoutubeActionCreators'
import { addChannelId } from '../../Redux/ChannelsList/ChannelsListActionCreators'

const styles = theme => ({
  searchContainer: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 100,
      marginRight: 100,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 20
    },
  },
  hidden: {
    display: 'none',
  },
})

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

  handleItemClicked = ( video ) => {
    this.setState({open: false})
    const route = '/' + video.source_type + '/' + video.id
    this.context.router.history.push(route)
  }
  
  handleAddClicked = ( video ) => {
    this.props.addChannelId( video.source_type, video.id )
  }

  render = () => {

    const { youtubeSearchResults, youtubeChannelSearchResults, classes } = this.props
    const { open, searchValue } = this.state

    console.log(youtubeChannelSearchResults)

    return (
      <List dense className={classes.searchContainer}>

        <SearchBox open={this.open} searchValue={searchValue} onSearchChange={this.onSearchChange} />

        <SearchResults 
          hidden={!open || searchValue === ''} 
          videoSources={youtubeSearchResults} 
          channelSources={youtubeChannelSearchResults}
          gotoSource={this.handleItemClicked} 
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
    twitchLoggedIn:  state.twitchOauth.loggedIn,
    youtubeLoggedIn: state.youtubeOauth.loggedIn,
    twitchSearchResults: state.twitchBrowse.twitchSearchResults,
    youtubeSearchResults: state.youtubeBrowse.youtubeSearchResults,
    youtubeChannelSearchResults: state.youtubeBrowse.youtubeChannelSearchResults,
  }
}
const mapDispatchToProps = dispatch => ({
  twitchSearch: (query) => dispatch(twitchSearch(query)),
  resetTwitchSearch: () => dispatch(resetTwitchSearch()),
  youtubeSearch: (query) => dispatch(youtubeSearch(query)),
  // resetYoutubeSearch: (query) => dispatch(resetYoutubeSearch(query)),
  youtubeChannelSearch: (query) => dispatch(youtubeChannelSearch(query)),
  // resetYoutubeChannelSearch: (query) => dispatch(resetYoutubeChannelSearch(query)),
  addChannelId: (sourceType, channelIds) => dispatch(addChannelId(sourceType, channelIds)),
})

const SearchWithStyles = withStyles(styles)(Search)

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithStyles)