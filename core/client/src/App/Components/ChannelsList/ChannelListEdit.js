import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';

import SearchIcon from 'material-ui-icons/Search';

import CurrentSources         from './CurrentSources';
import TwitchFollowingResults from './TwitchFollowingResults';
import TwitchSearchResults    from './TwitchSearchResults';
import YoutubeSearchResults   from './YoutubeSearchResults';

import { twitchSearch, resetTwitchSearch, getTwitchFollowing } from '../../Redux/Twitch/TwitchActionCreators';
import { youtubeSearch, resetYoutubeSearch } from '../../Redux/Youtube/YoutubeActionCreators';


class ChannelListEdit extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      channels: [],
      searchValue: ''
    }

    this.onSearchChange   = this.onSearchChange.bind(this);
    this.addTwitchChannel = this.addTwitchChannel.bind(this);
    this.addYoutubeVideo  = this.addYoutubeVideo.bind(this);
    this.onRemoveSource   = this.onRemoveSource.bind(this);
    this.applyChannels    = this.applyChannels.bind(this);
    this.cancel           = this.cancel.bind(this);
  }

  componentWillMount() {
    if ( this.props.channels ) this.setState( { channels: this.props.channels } );
    this.props.getTwitchFollowing()
  }

  onSearchChange(event) {
    if ( this.state.timeoutId ) clearInterval(this.state.timeoutId);

    const searchValue = event.target.value;
    const timeoutId = setTimeout( () => {
      this.props.twitchSearch(searchValue)
      this.props.youtubeSearch(searchValue)
    }, 300);
    this.setState( {timeoutId, searchValue} )
  }

  addTwitchChannel(channel) {
    let channels = [ ...this.state.channels, channel ];
    this.setState({channels: channels })
    // this.props.resetTwitchSearch()
  }

  addYoutubeVideo(video) {
    let channels = [ ...this.state.channels, video ];
    this.setState({channels: channels })
    // this.props.resetYoutubeSearch()
  }
  
  onRemoveSource(sourceToRemove) {
    let oldChannels = [ ...this.state.channels ];

    const filteredChannels = oldChannels.filter( source => {
      if ( source.source_type === sourceToRemove.source_type && source.id === sourceToRemove.id ) return false;
      return true;
    })

    this.setState( {channels: filteredChannels} );
  }
  
  applyChannels() {
    // let channels = [ ...this.props.channels, ...this.state.channels ];
    let channels = [ ...this.state.channels ];
    this.props.onEditToggle(channels);
  }
  
  cancel() {
    this.props.onEditToggle();
  }

  render() {
    // console.log('in render', this.state, this.props);

    let parentClassName = '';
    if( this.props.className !== undefined ){
      parentClassName = this.props.className
    }

    // const currentChannels = [ ...this.props.channels, ...this.state.channels ]
    const currentChannels = [ ...this.state.channels ]
    const twitchSearchResults = [ ...this.props.twitchSearchResults ]
    const twitchFollowingResults = [ ...this.props.twitchFollowing ]
    const youtubeSearchResults = [ ...this.props.youtubeSearchResults ]


    let searchPlaceholderText = 'Twitch Channel or YouTube Video ID'
    if ( this.props.source === 'tw' ) searchPlaceholderText = 'Twitch channel';
    if ( this.props.source === 'yt' ) searchPlaceholderText = 'YouTube Video ID';

    let source_type = this.props.source;
    if ( this.props.source === '' && this.state.channels.length > 0 ) source_type = this.state.channels[0].source_type;

    return (
      <div className={'player-channel-list-container edit ' + parentClassName}>
        

        <CurrentSources sources={currentChannels} onRemoveSource={this.onRemoveSource} />

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

        { (source_type === '' || source_type === 'tw') &&
          <TwitchFollowingResults 
            currentSources={currentChannels}
            followingSources={twitchFollowingResults} 
            filter={this.state.searchValue} 
            addSource={this.addTwitchChannel} 
          />
        }

        { (source_type === '' || source_type === 'tw') && this.state.searchValue !== '' &&
          <TwitchSearchResults 
            currentSources={currentChannels}
            searchSources={twitchSearchResults} 
            addSource={this.addTwitchChannel} 
          />
        }

        { (source_type === '' || source_type === 'yt') && this.state.searchValue !== '' &&
          <YoutubeSearchResults sources={youtubeSearchResults} addSource={this.addYoutubeVideo} />
        }
        
        <List className="channel-list-edit-actions">
          <ListItem>
            <Button color="primary" aria-label="edit" onClick={this.cancel}>
              Cancel
            </Button>
            { !!this.state.channels && this.state.channels.length > 0 &&
              <Button color="primary" aria-label="edit" onClick={this.applyChannels}>
                Done
              </Button>
            }
          </ListItem>
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
  resetYoutubeSearch: (query) => dispatch(resetYoutubeSearch(query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelListEdit);
