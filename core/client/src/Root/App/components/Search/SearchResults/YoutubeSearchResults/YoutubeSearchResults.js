import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

// import PlayItemButton from '../../Components/VideoGrid/VideoGridItem/PlayItemButton'
import AddItemButton  from 'components/misc/AddItemButton/AddItemButton'

import { truncateText } from 'utils/utils'

import styles from './YoutubeSearchResults.styles'


class YoutubeSearchResults extends React.Component {
  
  constructor(props) {
    super(props)

    this.handleAddClick = this.handleAddClick.bind(this)
  }

  handleItemClick = (video) => {
    this.props.gotoSource(video)
  }
  
  handleAddClick = (video) => {
    this.props.addSource(video) 
  }

  render = () => {

    const { sources, windowWidth, className, classes } = this.props

    let parentClassName = ( className !== undefined ) ? className : ''

    let youtubeSearchList = null

    if ( sources.length > 0 && !!sources[0] && !sources[0].status ) {
      
      youtubeSearchList = sources.map( (video, index) => {

        const title = ( windowWidth > 960 ) ? video.title : truncateText(video.title, 47)
        const description = ( windowWidth > 960 ) ? video.description : null
        return (
          <ListItem button 
            key={video.id + index} 
            title={video.title}
            classes={{secondaryAction: classes.listItemSecondaryAction}}
            onClick={() => this.handleItemClick(video)} >

            <img alt={video.title} className={classes.channelAvatar} src={video.thumbnail} />

            <ListItemText primary={title} secondary={(
              // <div>Views etc.</div>
              <span>{description}</span>
            )} />

            <ListItemSecondaryAction
              classes={{root: classes.secondaryActionRoot}}>
              <AddItemButton onClick={(e) => { 
                e.preventDefault() 
                this.handleAddClick(video) 
              } } />
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }

    return (
      <div className={parentClassName}>
        <List dense className="youtube-search-list">
          <div className="youtube-search-wrapper">
              { sources.length > 0 && sources[0] && !sources[0].status &&
                youtubeSearchList
              }
            <Divider />
          </div>
        </List>
      </div>
    )
  }
}

YoutubeSearchResults.propTypes = {
  sources: PropTypes.arrayOf( PropTypes.object ).isRequired,
  gotoSource: PropTypes.func,
  addSource: PropTypes.func,
  className: PropTypes.any
}

const mapStateToProps = state => {
  return {
    windowWidth:  state.window.width,
  }
}
const mapDispatchToProps = dispatch => ({
})

const YoutubeSearchResultsStyles = withStyles(styles)(YoutubeSearchResults)

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeSearchResultsStyles)