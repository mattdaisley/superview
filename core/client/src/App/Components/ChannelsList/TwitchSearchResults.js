import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from 'material-ui/List';

import { truncateText } from '../../Util/utils';

const TwitchSearchResults = (props) => {

  let parentClassName = ( props.className !== undefined ) ? props.className : '';

  let twitchSearchResults = null;

  if ( props.searchSources.length > 0 && !!props.searchSources[0] && !props.searchSources[0].status ) {
    // console.log(this.props.twitchSearchResults);

    let twitchSearchSources = props.searchSources;
    // filter out sources from the following sources if the source is already in the current sources being watched
    if ( props.currentSources && props.currentSources.length > 0 ) {
      const currentSourcesIds = props.currentSources.map( source => source.source_type + ':' + source.id );
      twitchSearchSources = twitchSearchSources.filter( source => {
        if ( currentSourcesIds.indexOf(source.source_type + ':' + source.id) !== -1 ) return false
        return true
      })
    }

    twitchSearchResults = twitchSearchSources.map( (source, index) => {
      const title = truncateText(source.channel.title)
      return (
        <ListItem key={source.channel.title + index}>
          <Avatar alt={source.channel.title} className="channel-avatar" src={source.channel.logo}></Avatar>
          <ListItemText primary={title} secondary={source.channel.name} />
          <ListItemSecondaryAction>
            <Button raised color="accent" className="add-channel-button" onClick={() => props.addSource(source)}>
              Add Channel
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })
  }

  return (
    <div className={parentClassName}>
      <List dense className="twitch-search-list" subheader={<ListSubheader>Live channels based on your search</ListSubheader>}>
        <div className="twitch-search-wrapper">
          { twitchSearchResults }
          <Divider />
        </div>
      </List>
    </div>
  );
}

TwitchSearchResults.propTypes = {
  currentSources: PropTypes.arrayOf( PropTypes.object ),
  searchSources: PropTypes.arrayOf( PropTypes.object ).isRequired,
  addSource: PropTypes.func,
  className: PropTypes.any
}

export default TwitchSearchResults;