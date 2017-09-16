import React     from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import PlayerControls     from './PlayerControls/PlayerControls';
// import PlayerChannelsList from './PlayerChannelsList';
import EmbedPlayer        from './EmbedPlayer';
import TwitchChat         from '../../Components/Twitch/TwitchChat';

import PlayerUtils from './PlayerUtils';

import styles from './Styles/PlayerWrapperStyles';


const PlayerWrapper = (props) => {

  const layout = PlayerUtils.getLayout(props.playerSources);

  const fullscreenClass = (props.isFullscreen) ? 'fullscreen' : '';

  const classes = props.classes;

  const playerWrapperClass   = ( !props.isFullscreen ) ? classes.playerWrapper : classes.playerWrapperFullscreen;
  const playerContainerClass = ( !props.isFullscreen ) ? classes.playerContainer : classes.playerContainerFullscreen;
  const playerClass          = ( !props.isFullscreen ) ? classes.player : classes.playerFullscreen;

  // build the embed player elements to display
  const embedPlayers = props.playerSources.map( (videoId, index) => {
    
    let playerLayoutClass = classes['player' + index + 'layout' + layout];
    return (
      <EmbedPlayer
        key={videoId+layout}
        className={[playerClass, playerLayoutClass, fullscreenClass].join(' ')}
        source={props.source}
        id={videoId} 
      />
    )
  })
  
  return (
    <div id="player-wrapper" className={['flex',playerWrapperClass].join(' ')}>

    
      {/* <div>{this.props.channels ? (this.props.channels[0] ? this.props.channels[0].name : '') : ''}</div> */}
      {/* <div>{this.props.channelDetails ? (this.props.channelDetails[0] ? this.props.channelDetails[0].game : '') : ''}</div> */}

      <div className={[playerContainerClass, 'flex-item'].join(' ')}>
        {embedPlayers}
      </div>

      { !!(props.source === 'tw' && props.playerChannelDetails.length > 0) && 
        <TwitchChat hideChannelsList={props.hideChannelsList} id={props.playerChannelDetails[0].channel.name}/>
      }

      {/* { props.playerChannelDetails.length > 0 && 
        <PlayerChannelsList channels={props.playerChannelDetails} className={'hidden-'+props.hideChannelsList}/>
      } */}

      <PlayerControls 
        className={[fullscreenClass].join(' ')}
        fullscreenContainer={'player-wrapper'} 
        onFullScreenChange={props.onFullScreenChange}
      />   
    </div>
  )

}

PlayerWrapper.propTypes = {
  source: PropTypes.string, 
  playerSources: PropTypes.array, 
  playerChannelDetails: PropTypes.array, 
  hideChannelsList: PropTypes.bool, 
  isFullscreen: PropTypes.bool, 
  onFullScreenChange: PropTypes.func
}


const PlayerWrapperWithStyles = withStyles(styles)(PlayerWrapper);

// export default connect(mapStateToProps, mapDispatchToProps)(PlayerWrapperWithStyles);
export default PlayerWrapperWithStyles
