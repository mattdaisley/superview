import React       from 'react';
import { connect } from 'react-redux';
import PropTypes   from 'prop-types';

import { withStyles } from 'material-ui/styles';

import PlayerControls from './PlayerControls/PlayerControls';
// import PlayerChannelsList from './PlayerChannelsList';
import EmbedPlayer    from './EmbedPlayer';
import TwitchChat     from '../../Components/Twitch/TwitchChat/TwitchChat';

import PlayerUtils from './PlayerUtils';

import styles from './Styles/PlayerWrapperStyles';


class PlayerWrapper extends React.Component {

  constructor(props) {
    super(props)

    this.setChatChannel = this.setChatChannel.bind(this);
  }

  componentWillMount() {
    if ( this.props.playerChannelDetails.length > 0 ) {
      this.setChatChannel(this.props.playerChannelDetails[0].channel.name)
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.playerChannelDetails.length > 0 ) {
      this.setChatChannel(nextProps.playerChannelDetails[0].channel.name)
    }
  }

  setChatChannel(channelName) {
    this.setState( { chatChannel: channelName } )
  }

  render() {
    
    const { playerChannelDetails, classes } = this.props;
  
    const layout = PlayerUtils.getLayout(this.props.playerSources);
  
    const fullscreenClass = (this.props.isFullscreen) ? 'fullscreen' : '';
  
    let playerWrapperClass     = ( !this.props.isFullscreen ) ? classes.playerWrapper : classes.playerWrapperFullscreen;
        playerWrapperClass     = ( this.props.openState === 'minimized') ? [playerWrapperClass, classes.playerWrapperMinimized].join(' ') : [playerWrapperClass, classes.playerWrapperOpen].join(' ')
    const playerContainerClass = []
    if ( !this.props.isFullscreen ) {
      playerContainerClass.push(classes.playerContainer)
    } else {
      playerContainerClass.push(classes.playerContainerFullscreen)
    }
    if ( this.props.openState === 'minimized' ) playerContainerClass.push(classes.playerContainerMinimized)
    
    const playerClass = [ classes.player ];
    if ( !this.props.isFullscreen ) playerClass.push(classes.playerFullscreen);
    if ( this.props.openState === 'minimized' ) playerClass.push(classes.playerMinimized)
    // const playerClass          = ( !this.props.isFullscreen ) ? classes.player : classes.player + ' ' + classes.playerFullscreen;
  
    const showTwitchChat = (this.props.sourceType === 'tw' && playerChannelDetails.length > 0 && this.props.openState === 'open')
  
    // build the embed player elements to display
    const embedPlayers = this.props.playerSources.map( (videoId, index) => {
      let playerLayoutClass = classes['player' + index + 'layout' + layout];
      return (
        <EmbedPlayer
          key={videoId+layout}
          className={[...playerClass, playerLayoutClass].join(' ')}
          source={this.props.source}
          id={videoId}
          index={index}
        />
      )
    })
    
    return (
      <div id="player-wrapper" className={['flex', playerWrapperClass].join(' ')}>
  
        <div className={[...playerContainerClass].join(' ')}>
          {embedPlayers}
        </div>
  
        { !!showTwitchChat && 
          (<TwitchChat hideChannelsList={this.props.hideChannelsList} chatChannels={playerChannelDetails.map( channelDetails => channelDetails.channel.name )} selectedChannel={this.props.chatChannel}/>)
        }
        
        <PlayerControls 
          className={[fullscreenClass].join(' ')}
          fullscreenContainer={'player-wrapper'} 
          onFullScreenChange={this.props.onFullScreenChange}
        />   
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    sourceType: state.player.sourceType,
    openState: state.player.openState,
    chatChannel: state.channelsList.chatChannel
  }
}

const mapDispatchToProps = dispatch => ({ })

PlayerWrapper.propTypes = {
  source: PropTypes.string, 
  playerSources: PropTypes.array, 
  playerChannelDetails: PropTypes.array, 
  hideChannelsList: PropTypes.bool, 
  isFullscreen: PropTypes.bool, 
  onFullScreenChange: PropTypes.func
}


const PlayerWrapperWithStyles = withStyles(styles)(PlayerWrapper);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerWrapperWithStyles);
// export default PlayerWrapperWithStyles
