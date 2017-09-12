import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText, ListItemSecondaryAction, ListSubheader } from 'material-ui/List';
import TextField from 'material-ui/TextField';

import DeleteIcon from 'material-ui-icons/Delete';
import SearchIcon from 'material-ui-icons/Search';

import { twitchSearch, resetTwitchSearch, getTwitchFollowing } from '../../Redux/Twitch/TwitchActionCreators';
import { youtubeSearch, resetYoutubeSearch } from '../../Redux/Youtube/YoutubeActionCreators';


class ChannelListEdit extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      channels: [],
      searchValue: ''
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.addChannel = this.addChannel.bind(this);
    this.applyChannels = this.applyChannels.bind(this);
  }

  componentWillMount() {
    this.props.getTwitchFollowing()
  }

  componentDidReceiveProps() {
    console.log('componentDidReceiveProps')
    // this.setState( {channels: [ ...this.props.channels ]} )
  }

  onSearchChange(event) {
    const query = event.target.value;
    this.setState( {searchValue: query} )
    if ( this.state.timeoutId ) clearInterval(this.state.timeoutId);
    const timeoutId = setTimeout( () => {
      this.props.twitchSearch(query)
      this.props.youtubeSearch(query)
    }, 300);
    this.setState( {timeoutId} )
  }

  addChannel(channel) {
    // console.log(channel);
    let channels = [ ...this.state.channels ];
    channels.push(channel);
    this.setState({channels, searchValue:''})
    this.props.resetTwitchSearch()
  }

  addYoutubeVideo(video) {
    let channels = [ ...this.state.channels ];
  }

  applyChannels() {
    let channels = [...this.props.channels, ...this.state.channels];
    this.props.onEditToggle(channels);
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

    console.log(this.props);

    const channelAvatars = channels.map( (channel, index) => {
      const title = channel.title.length > 70 ? channel.title.slice(0,70) + '...' : channel.title;
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

    let twitchSearchResults = (<div></div>);
    if ( this.props.twitchSearchResults.length > 0 && !!this.props.twitchSearchResults[0] && !this.props.twitchSearchResults[0].status ) {
      // console.log(this.props.twitchSearchResults);
      twitchSearchResults = this.props.twitchSearchResults.map( (channel, index) => {
        const title = channel.title && channel.title.length > 50 ? channel.title.slice(0,50) + '...' : channel.title;
        return (
          <ListItem key={channel.title + index}>
            <Avatar alt={channel.title} className="channel-avatar" src={channel.logo}></Avatar>
            <ListItemText primary={title} secondary={channel.name} />
            <ListItemSecondaryAction>
              <Button raised color="accent" className="add-channel-button" onClick={() => this.addChannel(channel)}>
                Add Channel
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }

    let twitchFollowingList = (<div></div>);
    let twitchFollowing = [ ...this.props.twitchFollowing ];
    if ( twitchFollowing.length > 0 && !!twitchFollowing[0] && !twitchFollowing[0].status ) {
      if ( this.state.searchValue ) {
        const searchValue = this.state.searchValue.toLowerCase();
        twitchFollowing = twitchFollowing.filter( channel => { 
          if (channel.name.toLowerCase().indexOf(searchValue) >= 0 ) return true;
          if (channel.title.toLowerCase().indexOf(searchValue) >= 0 ) return true;
          if (channel.name.toLowerCase().split('_').join('').indexOf(searchValue) >= 0 ) return true;
          return false;
        })
      }
      twitchFollowingList = twitchFollowing.map( (channel, index) => {
        const title = channel.title && channel.title.length > 50 ? channel.title.slice(0,50) + '...' : channel.title;
        return (
          <ListItem key={channel.title + index}>
            <Avatar alt={channel.title} className="channel-avatar" src={channel.logo}></Avatar>
            <ListItemText primary={title} secondary={channel.name} />
            <ListItemSecondaryAction>
              <Button raised color="accent" className="add-channel-button" onClick={() => this.addChannel(channel)}>
                Add Channel
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }


    let youtubeSearchList = (<div></div>);
    let youtubeSearchResults = [ ...this.props.youtubeSearchResults ];
    if ( youtubeSearchResults.length > 0 && !!youtubeSearchResults[0] && !youtubeSearchResults[0].status ) {
      // console.log(this.props.twitchSearchResults);
      youtubeSearchList = youtubeSearchResults.map( (video, index) => {
        // const title = video.title && video.title.length > 60 ? video.title.slice(0,60) + '...' : video.title;
        const title = video.title && video.title.length > 60 ? video.title.slice(0,60) + '...' : video.title;
        const description = video.description && video.description.length > 60 ? video.description.slice(0,60) + '...' : video.description;
        return (
          <ListItem key={video.id + index} title={video.title}>
            <img alt={video.title} className="channel-avatar" src={video.thumbnail} />
            <ListItemText primary={title} secondary={description} />
            <ListItemSecondaryAction>
              <Button raised color="accent" className="add-channel-button" onClick={() => this.addChannel(video)}>
                Add Video
              </Button>
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
          <List dense subheader={<ListSubheader>Current channels</ListSubheader>}>
            {channelAvatars}
            <Divider />
          </List>
        }
        <List dense>
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
        { (this.props.source === '' || this.props.source === 'tw') &&
          <List dense className="twitch-following-list" subheader={<ListSubheader>Live channels you follow</ListSubheader>}>
            <div className="twitch-following-wrapper">
              { this.props.twitchFollowing.length > 0 && 
                twitchFollowingList
              }
              <Divider />
            </div>
          </List>
        }
        { (this.props.source === '' || this.props.source === 'tw') && this.state.searchValue !== '' &&
          <List dense className="twitch-search-list" subheader={<ListSubheader>Live channels based on your search</ListSubheader>}>
            <div className="twitch-search-wrapper">
              { this.props.twitchSearchResults.length > 0 && this.props.twitchSearchResults[0] && !this.props.twitchSearchResults[0].status &&
                twitchSearchResults
              }
              <Divider />
            </div>
          </List>
        }
        { (this.props.source === '' || this.props.source === 'yt') && this.state.searchValue !== '' &&
          <List dense className="youtube-search-list" subheader={<ListSubheader>YouTube videos based on your search</ListSubheader>}>
            <div className="youtube-search-wrapper">
                { this.props.youtubeSearchResults.length > 0 && this.props.youtubeSearchResults[0] && !this.props.youtubeSearchResults[0].status &&
                  youtubeSearchList
                }
              <Divider />
            </div>
          </List>
        }
        <List>
          <Button color="primary" aria-label="edit" className="action" onClick={this.applyChannels}>
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
  twitchFollowing: PropTypes.array,
  getTwitchFollowing: PropTypes.func,
  youtubeSearchResults: PropTypes.array,
  youtubeSearch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    twitchSearchResults: state.twitchBrowse.twitchSearchResults,
    twitchFollowing: state.twitchBrowse.twitchFollowing,
    youtubeSearchResults: state.youtubeBrowse.youtubeSearchResults,
  }
}

const mapDispatchToProps = dispatch => ({
  twitchSearch: (query) => dispatch(twitchSearch(query)),
  resetTwitchSearch: () => dispatch(resetTwitchSearch()),
  getTwitchFollowing: () => dispatch(getTwitchFollowing()),
  youtubeSearch: (query) => dispatch(youtubeSearch(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelListEdit);
