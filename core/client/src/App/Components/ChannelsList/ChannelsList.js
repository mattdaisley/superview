import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import compose     from 'recompose/compose';

import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';

import ChannelListAvatars from './ChannelListAvatars';
import ChannelListEdit    from './ChannelListEdit';

import { setChannelIds, setChatChannel } from '../../Redux/ChannelsList/ChannelsListActionCreators';
import { playerClose, playerSources } from '../../Redux/Player/PlayerActionCreators';

import PlayerUtils from '../../Components/PlayerPage/PlayerUtils';

const styles = theme => ({
  channelsListRoot: {
    position: 'fixed',
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
      right: 0,
      width: '100px',
      top: '84px',
      padding: '6px',
      zIndex: 10000,
    },
    [theme.breakpoints.down('md')]: {
      top: 0,
      right: 10,
      zIndex: 11000
    },
  },
  channelsListEdit: {
    position: 'fixed',
    padding: '0',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
      width: '600px',
      top: '86px',
      right: '15px',
      zIndex: 10000,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      zIndex: 11000,
    },
  }
})

class ChannelsList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      mode: 'list',
    }

    this.onEditToggle   = this.onEditToggle.bind(this);
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  onEditToggle(channels) {

    if ( channels && channels.length > 0 ) {
      const newChannelNames = channels.map( channel => {
        if ( channel.source_type && channel.source_type === 'tw' ) return channel.channel.name
        if ( channel.source_type && channel.source_type === 'yt' ) return channel.id
        return channel.id
      } )
      const oldChannelNames = this.props.channels.map( channel => {
        if ( channel.source_type && channel.source_type === 'tw' ) return channel.channel.name
        if ( channel.source_type && channel.source_type === 'yt' ) return channel.id
        return channel.id
      } )
      if ( !PlayerUtils.compareArrays(newChannelNames, oldChannelNames) ) {
        let pathname = '/'+ channels[0].source_type + '/' + newChannelNames.join('/');
        this.context.router.history.push(pathname);
      }
    } else if ( channels && channels.length === 0 ) {
      this.props.setChannelIds( '', [] );
    }
    
    if ( this.props.openState === 'open' && (!channels || ( channels && channels.length === 0)) ) { 
      // this.props.playerClose()
      this.props.playerSources( '', [] )
    }

    if ( this.state.mode === 'list' ) this.setState( {mode: 'edit'} )
    if ( this.state.mode === 'edit' ) this.setState( {mode: 'list'} )
  }

  render() {
    let parentClassName = '';
    if(this.props.className !== undefined){
      parentClassName = this.props.className
    }

    const { channels, chatChannel, source, classes, setChatChannel } = this.props

    const rootClass = []
    if ( this.state.mode === 'list' ) {
      rootClass.push(classes.channelsListRoot)
    } else {
      rootClass.push(classes.channelsListEdit)
    } 

    return (
      <div className={rootClass.join(' ')}>
        { this.state.mode === 'list' && 
          <ChannelListAvatars 
            channels={channels} 
            chatChannel={chatChannel}
            className={parentClassName} 
            onEditToggle={this.onEditToggle} 
            setChatChannel={setChatChannel}
          /> 
        }
        { this.state.mode === 'edit' && 
          <ChannelListEdit 
            source={source} 
            channels={channels} 
            className={parentClassName} 
            onEditToggle={this.onEditToggle} 
          /> 
        }
      </div>
    );
  }
}

ChannelsList.propTypes = {
  source: PropTypes.string,
  channels: PropTypes.arrayOf( PropTypes.object ).isRequired,
  className: PropTypes.any,
}


const mapStateToProps = state => ({
  channels: state.channelsList.channels,
  chatChannel: state.channelsList.chatChannel,
  openState: state.player.openState,
})
const mapDispatchToProps = dispatch => ({
  setChatChannel: (chatChannel) => dispatch(setChatChannel(chatChannel)),
  setChannelIds: (sourceType, channelids) => dispatch(setChannelIds(sourceType, channelids)),
  playerClose: () => dispatch(playerClose()),
  playerSources: (sourceType, sources) => dispatch(playerSources(sourceType, sources)),
})

// const ChannelsListStyled = withStyles(styles)(ChannelsList);
// const ChannelsListWithWidth = withStyles(styles)(ChannelsList);

const ChannelsListStyles = compose(withStyles(styles), withWidth())(ChannelsList);

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsListStyles);