import React       from 'react'
import ReactDOM    from 'react-dom';
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import List, { ListItem } from 'material-ui/List'
import TextField  from 'material-ui/TextField'
import SearchIcon from 'material-ui-icons/Search'
import { withStyles } from 'material-ui/styles'

// import TwitchSearchResults    from '../../Components/ChannelsList/TwitchSearchResults'
import YoutubeSearchResults   from '../../Components/ChannelsList/YoutubeSearchResults'

import { twitchSearch, resetTwitchSearch } from '../../Redux/Twitch/TwitchActionCreators'
import { youtubeSearch, resetYoutubeSearch } from '../../Redux/Youtube/YoutubeActionCreators'
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
  icon: {
    color: '#3A93F1',
    margin: '0 15px 0 0',
  },
  searchResults: {
    position: 'fixed',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    maxHeight: 'calc(100vh - 120px)',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100vw - 200px)',
      top: 64,
      left: 100,
      padding: '0 16px 10px 16px',
      border: '1px solid #ccc',
      borderTop: 0,
    },
    [theme.breakpoints.down('md')]: {
      width: 'calc(100vw)',
      top: 56,
      left: 0,
      borderBottom: '1px solid #ccc',
    },
  },
  hidden: {
    display: 'none',
  },
  listItemGutters: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
    },
  }
})

class Search extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      searchValue: '',
      open: false
    }

    this.onSearchChange   = this.onSearchChange.bind(this)
    this.clearSearch      = this.clearSearch.bind(this)
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
    
    if (!domNode || !domNode.contains(e.target)) {
      this.setState({
        open : false
      });
    }
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

    const searchValue = event.target.value.trim()
    const timeoutId = setTimeout( () => {
      // this.props.twitchSearch(searchValue)
      this.props.youtubeSearch(searchValue)
    }, 300)
    this.setState( {timeoutId, searchValue} )
  }

  clearSearch = (event) => {
    this.setState({searchValue:''})
    this.props.resetYoutubeSearch()
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

    const { youtubeSearchResults, classes } = this.props

    let searchResultsClasses = [ classes.searchResults ]
    if ( !this.state.open || this.state.searchValue === '' ) searchResultsClasses.push(classes.hidden)

    return (
      <List dense className={classes.searchContainer}>
        <ListItem classes={{gutters: classes.listItemGutters}}>
          <SearchIcon className={classes.icon} onClick={this.open}/>
          <TextField
            type="search"
            value={this.state.searchValue}
            onFocus={ this.open }
            onChange={this.onSearchChange}
            fullWidth
            InputProps={{ placeholder: 'Search' }}
          />
        </ListItem>

        <div className={searchResultsClasses.join(' ')}>
            {/* <TwitchSearchResults 
              searchSources={twitchSearchResults} 
              addSource={() => console.log('added twitch')} 
            /> */}
            <YoutubeSearchResults 
              sources={youtubeSearchResults} 
              gotoSource={this.handleItemClicked}
              addSource={this.handleAddClicked} />
        </div>
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
  }
}
const mapDispatchToProps = dispatch => ({
  twitchSearch: (query) => dispatch(twitchSearch(query)),
  resetTwitchSearch: () => dispatch(resetTwitchSearch()),
  youtubeSearch: (query) => dispatch(youtubeSearch(query)),
  resetYoutubeSearch: (query) => dispatch(resetYoutubeSearch(query)),
  addChannelId: (sourceType, channelIds) => dispatch(addChannelId(sourceType, channelIds)),
})

const SearchWithStyles = withStyles(styles)(Search)

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithStyles)