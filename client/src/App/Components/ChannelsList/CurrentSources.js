import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from 'material-ui/List';

import DeleteIcon from 'material-ui-icons/Delete';

import { truncateText } from '../../Util/utils';

const CurrentSources = (props) => {

  let parentClassName = '';
  if( props.className !== undefined ){
    parentClassName = props.className
  }

  const currentSources = props.sources.map( (source, index) => {
    const title = truncateText(source.title, 60);
    const description = truncateText(source.description, 60);
    return (
      <ListItem key={source.title + index} title={source.title}>
        <img alt={source.title} className="channel-thumbnail" src={source.thumbnail} />
        <ListItemText primary={title} secondary={description} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={() => props.onRemoveSource(source)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  })

  return (
    <div className={parentClassName}>
      { props.sources.length > 0 &&
        <List dense subheader={<ListSubheader>Current channels</ListSubheader>}>
          {currentSources}
          <Divider />
        </List>
      }
    </div>
  );
}

CurrentSources.propTypes = {
  sources: PropTypes.arrayOf( PropTypes.object ).isRequired,
  onRemoveSource: PropTypes.func,
  className: PropTypes.any
}

export default CurrentSources;