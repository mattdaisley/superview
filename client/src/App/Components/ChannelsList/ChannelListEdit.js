import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import TextField from 'material-ui/TextField';

import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';
import SearchIcon from 'material-ui-icons/Search';

import { twitchSearch, resetTwitchSearch } from '../../Redux/Twitch/TwitchActionCreators';


class ChannelListEdit extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      channels: [],
      searchValue: ''
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.addChannel = this.addChannel.bind(this);
  }

  componentDidReceiveProps() {
    // console.log('componentDidReceiveProps')
    // this.setState( {channels: [ ...this.props.channels ]} )
  }

  onSearchChange(event) {
    const query = event.target.value;
    this.setState( {searchValue: query} )
    if ( this.state.timeoutId ) clearInterval(this.state.timeoutId);
    const timeoutId = setTimeout( () => this.props.twitchSearch(query), 300);
    this.setState( {timeoutId} )
  }

  addChannel(channel) {
    // console.log(channel);
    let channels = this.state.channels;
    channels.push(channel);
    this.setState({channels, searchValue:''})
    this.props.resetTwitchSearch()
  }

  render() {
    // console.log('in render', this.state, this.props);

    let parentClassName = '';
    if( this.props.className !== undefined ){
      parentClassName = this.props.className
    }

    let channels = [...this.props.channels, ...this.state.channels];
    // console.log(channels);
    // this.setState({channels:channels})

    const channelAvatars = channels.map( (channel, index) => {
      const title = channel.title.length > 50 ? channel.title.slice(0,50) + '...' : channel.title;
      return (
        <ListItem key={channel.title + index}>
          <Avatar alt={channel.title} className="channel-avatar" src={channel.logo}></Avatar>
          <ListItemText primary={title} secondary={channel.name} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      // <Button fab aria-label={channel.title} key={channel.id} className="action">
        //   <Avatar />
        // </Button>
      )
    })

    let searchResults = (<div></div>);
    if ( this.props.twitchSearchResults.length > 0 && this.props.twitchSearchResults[0] && !this.props.twitchSearchResults[0].status ) {
      // console.log(this.props.twitchSearchResults);
      searchResults = this.props.twitchSearchResults.map( (channel, index) => {
        const title = channel.title && channel.title.length > 50 ? channel.title.slice(0,50) + '...' : channel.title;
        return (
          <ListItem key={channel.title + index}>
            <Avatar alt={channel.title} className="channel-avatar" src={channel.logo}></Avatar>
            <ListItemText primary={title} secondary={channel.name} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={() => this.addChannel(channel)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }

    let searchPlaceholderText = 'Twitch Channel or YouTube Video ID'
    if ( this.props.source === 'tw' ) searchPlaceholderText = 'Twitch channel';
    if ( this.props.source === 'yt' ) searchPlaceholderText = 'YouTube Video ID';

    return (
      <div className={'player-channel-list-container edit ' + parentClassName}>
        { channels.length > 0 &&
          <List>
            {channelAvatars}
            <Divider />
          </List>
        }
        <List>
          <ListItem>
            <div className="search-icon"><SearchIcon /></div>
            <TextField
              value={this.state.searchValue}
              onChange={this.onSearchChange}
              fullWidth
              InputProps={{ placeholder: searchPlaceholderText }}
            />
          </ListItem>
        </List>
        { this.props.twitchSearchResults.length > 0 && this.props.twitchSearchResults[0] && !this.props.twitchSearchResults[0].status &&
          <List>
            {searchResults}
          </List>
        }
        <Divider />
        <List>
          <Button color="primary" aria-label="edit" className="action" onClick={this.props.onEditToggle}>
            Done
          </Button>
        </List>
      </div>
    );

  }
}

ChannelListEdit.propTypes = {
  source: PropTypes.string,
  channels: PropTypes.arrayOf( PropTypes.object ).isRequired,
  className: PropTypes.any,
  onEditToggle: PropTypes.func,
  twitchSearchResults: PropTypes.array,
  twitchSearch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    twitchSearchResults: state.twitchBrowse.twitchSearchResults,
  }
}

const mapDispatchToProps = dispatch => ({
  twitchSearch: (query) => dispatch(twitchSearch(query)),
  resetTwitchSearch: () => dispatch(resetTwitchSearch()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelListEdit);
