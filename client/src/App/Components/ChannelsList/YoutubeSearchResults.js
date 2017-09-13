import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from 'material-ui/List';

import { truncateText } from '../../Util/utils';

const YoutubeSearchResults = (props) => {

  let parentClassName = ( props.className !== undefined ) ? props.className : '';

  let youtubeSearchList = null;

  if ( props.sources.length > 0 && !!props.sources[0] && !props.sources[0].status ) {
    
    // console.log(this.props.twitchSearchResults);
    youtubeSearchList = props.sources.map( (video, index) => {
      // const title = video.title && video.title.length > 60 ? video.title.slice(0,60) + '...' : video.title;
      const title = truncateText(video.title);
      const description = truncateText(video.description);

      return (
        <ListItem key={video.id + index} title={video.title}>
          <img alt={video.title} className="channel-avatar" src={video.thumbnail} />
          <ListItemText primary={title} secondary={description} />
          <ListItemSecondaryAction>
            <Button raised color="accent" className="add-channel-button" onClick={() => props.addSource(video)}>
              Add Video
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      )
    })
  }

  return (
    <div className={parentClassName}>
      <List dense className="youtube-search-list" subheader={<ListSubheader>YouTube videos based on your search</ListSubheader>}>
        <div className="youtube-search-wrapper">
            { props.sources.length > 0 && props.sources[0] && !props.sources[0].status &&
              youtubeSearchList
            }
          <Divider />
        </div>
      </List>
    </div>
  );
}

YoutubeSearchResults.propTypes = {
  sources: PropTypes.arrayOf( PropTypes.object ).isRequired,
  addSource: PropTypes.func,
  className: PropTypes.any
}

export default YoutubeSearchResults;