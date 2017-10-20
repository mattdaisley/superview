import React       from 'react'
import PropTypes   from 'prop-types'

import { withStyles } from 'material-ui/styles'

// import TwitchSearchResults    from '../../../Components/ChannelsList/TwitchSearchResults'
import YoutubeSearchResults   from './YoutubeSearchResults/YoutubeSearchResults'
import YoutubeChannelSearchResult from './YoutubeChannelSearchResult/YoutubeChannelSearchResult'

const styles = theme => ({
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
})

class SearchResults extends React.Component {

  render = () => {

    const { hidden, videoSources, channelSources, gotoSource, addSource, classes } = this.props

    let searchResultsClasses = [ classes.searchResults ]
    if ( hidden ) searchResultsClasses.push(classes.hidden)

    return (
      <div className={searchResultsClasses.join(' ')}>
        {/* <TwitchSearchResults 
          searchSources={twitchSearchResults} 
          addSource={() => console.log('added twitch')} 
        /> */}
        { channelSources.length > 0 && (
          <YoutubeChannelSearchResult 
            sources={channelSources} 
            gotoSource={gotoSource}
            addSource={addSource} />
        )}

        { videoSources.length > 0 && (
          <YoutubeSearchResults 
            sources={videoSources} 
            gotoSource={gotoSource}
            addSource={addSource} />
        )}
      </div>
    )
  }
}

SearchResults.propTypes = {
  hidden: PropTypes.bool,
  videoSources: PropTypes.array,
  channelSources: PropTypes.array,
  gotoSource: PropTypes.func,
  addSource: PropTypes.func,
}

export default withStyles(styles)(SearchResults)