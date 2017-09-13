import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from 'material-ui/List';

import { truncateText } from '../../Util/utils';

const TwitchFollowingResults = (props) => {

  let parentClassName = ( props.className !== undefined ) ? props.className : '';

  let twitchFollowingList = null;
  
  if ( props.followingSources.length > 0 && !!props.followingSources[0] && !props.followingSources[0].status ) {

    let followingSources = props.followingSources;

    // filter out sources from the following sources if the name or title contain the filter string
    if ( props.filter ) {
      followingSources = filterSources(followingSources, props.filter);
    }
    
    // filter out sources from the following sources if the source is already in the current sources being watched
    if ( props.currentSources && props.currentSources.length > 0 ) {
      const currentSourcesIds = props.currentSources.map( source => source.source_type + ':' + source.id );
      followingSources = followingSources.filter( source => {
        if ( currentSourcesIds.indexOf(source.source_type + ':' + source.id) !== -1 ) return false
        return true
      })
    }

    twitchFollowingList = followingSources.map( (source, index) => {
      const title = truncateText(source.channel.title)
      return (
        <ListItem key={source.id + index} title={source.channel.title}>
          <Avatar alt={source.channel.name} className="channel-avatar" src={source.channel.logo}></Avatar>
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
      <List dense className="twitch-following-list" subheader={<ListSubheader>Live channels you follow</ListSubheader>}>
        <div className="twitch-following-wrapper">
          { props.followingSources.length > 0 && 
            twitchFollowingList
          }
          <Divider />
        </div>
      </List>
    </div>
  );
}

const filterSources = ( sources, filter) => {
  const filterValue = filter.toLowerCase();
  const filteredSources = [ ...sources ].filter( source => { 
    if (source.channel.name.toLowerCase().indexOf(filterValue) >= 0 ) return true;
    if (source.channel.title.toLowerCase().indexOf(filterValue) >= 0 ) return true;
    if (source.channel.name.toLowerCase().split('_').join('').indexOf(filterValue) >= 0 ) return true;
    return false;
  })
  return filteredSources;
}

TwitchFollowingResults.propTypes = {
  currentSources: PropTypes.arrayOf( PropTypes.object ).isRequired,
  followingSources: PropTypes.arrayOf( PropTypes.object ).isRequired,
  filter: PropTypes.string,
  addSource: PropTypes.func,
  className: PropTypes.any
}

export default TwitchFollowingResults;