import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

// import PlayItemButton from '../../Components/VideoGrid/VideoGridItem/PlayItemButton'
import AddItemButton  from '../../Components/VideoGrid/VideoGridItem/AddItemButton'

import { truncateText } from '../../Util/utils';

const styles = theme => ({
  container: {
    display: 'flex'
  },
  channelAvatar: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 246
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 100
    },
  },
  link: {
    textDecoration: 'none'
  },
  listItemSecondaryAction: {
    [theme.breakpoints.up('md')]: {
      paddingRight: 102
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: 80
    },
  },
  secondaryActionRoot: {
    [theme.breakpoints.down('md')]: {
      right: -12
    },
  }
})

class YoutubeSearchResults extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleAddClick = this.handleAddClick.bind(this);
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
        console.log(video)
        return (
          <ListItem button 
            key={video.id + index} 
            title={video.title}
            classes={{secondaryAction: classes.listItemSecondaryAction}}
            onClick={() => this.handleItemClick(video)} >

            <img alt={video.title} className={classes.channelAvatar} src={video.thumbnail} />

            <ListItemText primary={title} secondary={(
              // <div>Views etc.</div>
              <div>{description}</div>
            )} />

            <ListItemSecondaryAction
              classes={{root: classes.secondaryActionRoot}}>
              <AddItemButton onClick={() => this.handleAddClick(video)} />
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }

    return (
      <div className={parentClassName}>
        <List dense className="youtube-search-list" subheader={<ListSubheader disableSticky={true}>YouTube videos based on your search</ListSubheader>}>
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