import React       from 'react'
import PropTypes   from 'prop-types'

import { withStyles } from 'material-ui/styles'

// import TwitchSearchResults    from '../../../Components/ChannelsList/TwitchSearchResults'
import YoutubeSearchResults   from './YoutubeSearchResults/YoutubeSearchResults'
import YoutubeChannelSearchResult from './YoutubeChannelSearchResult/YoutubeChannelSearchResult'

import styles from './SearchResults.styles'

class SearchResults extends React.Component {

  render = () => {

    const { hidden, videoSources, channelSources, gotoSource, addSource, gotoChannel, classes } = this.props

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
            gotoSource={gotoChannel}
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
  gotoChannel: PropTypes.func,
}

export default withStyles(styles)(SearchResults)