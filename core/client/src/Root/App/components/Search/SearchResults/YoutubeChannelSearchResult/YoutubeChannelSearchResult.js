import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'

import Avatar  from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

import { truncateText } from 'utils/utils'

import styles from './YoutubeChannelSearchResult.styles'

class YoutubeChannelSearchResult extends React.Component {

  handleItemClick = (channel) => {
    this.props.gotoSource(channel)
  }

  render = () => {

    const { sources, windowWidth, className, classes } = this.props

    let parentClassName = ( className !== undefined ) ? className : ''

    let youtubeSearchList = null

    if ( sources.length > 0 && !!sources[0] && !sources[0].status ) {
      
      youtubeSearchList = sources.map( (channel, index) => {

        const title = ( windowWidth > 960 ) ? channel.title : truncateText(channel.title, 47)
        const description = ( windowWidth > 960 ) ? channel.description : null
        return (
          <ListItem button 
            key={channel.channel_id} 
            title={channel.title}
            classes={{secondaryAction: classes.listItemSecondaryAction}}
            onClick={() => this.handleItemClick(channel)} >

            <div className={classes.avatarWrapper}>
              <Avatar
                alt={channel.title}
                src={channel.logo}
                className={classes.channelAvatar}
              />
            </div>
            

            <ListItemText primary={title} secondary={[
              <span key="sourceType">{channel.source_type === 'yt' ? 'YouTube Channel' : 'Twitch Channel'}</span>,
              <br key="break" />,
              <span key="description">{description}</span>
            ]} />

            <ListItemSecondaryAction classes={{root: classes.secondaryActionRoot}}>

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

YoutubeChannelSearchResult.propTypes = {
  sources: PropTypes.arrayOf( PropTypes.object ).isRequired,
  gotoSource: PropTypes.func,
  className: PropTypes.any
}

const mapStateToProps = state => {
  return {
    windowWidth:  state.window.width,
  }
}
const mapDispatchToProps = dispatch => ({
})

const YoutubeChannelSearchResultStyles = withStyles(styles)(YoutubeChannelSearchResult)

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeChannelSearchResultStyles)