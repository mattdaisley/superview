import React     from 'react';
import PropTypes from 'prop-types';

import PlayerControls     from './PlayerControls/PlayerControls';
// import PlayerChannelsList from './PlayerChannelsList';
import EmbedPlayer        from './EmbedPlayer';
import TwitchChat         from '../../Components/Twitch/TwitchChat';

import PlayerUtils from './PlayerUtils';

const PlayerWrapper = (props) => {
  console.log('PlayerWrapper', props);

  const layout = PlayerUtils.getLayout(props.playerSources);
  const fullscreenClass = (props.isFullscreen) ? 'fullscreen' : '';

  // build the embed player elements to display
  const embedPlayers = props.playerSources.map( (videoId, index) => {
    // console.log('embedPlayer', source, videoId);
    return (
      <EmbedPlayer
        key={videoId}
        className={['layout' + layout,'player' + index, fullscreenClass].join(' ')}
        source={props.source}
        id={videoId} 
      />
    )
  })

  console.log(props.playerChannelDetails);
  
  return (
    <div id="player-wrapper" className={['Player-wrapper','flex',fullscreenClass].join(' ')}>

    
      {/* <div>{this.props.channels ? (this.props.channels[0] ? this.props.channels[0].name : '') : ''}</div> */}
      {/* <div>{this.props.channelDetails ? (this.props.channelDetails[0] ? this.props.channelDetails[0].game : '') : ''}</div> */}

      <div className={['Player-container','flex-item',fullscreenClass].join(' ')}>
        {embedPlayers}
      </div>

      { !!(props.source === 'tw' && props.playerChannelDetails.length > 0) && 
        <TwitchChat hideChannelsList={props.hideChannelsList} id={props.playerChannelDetails[0].name}/>
      }

      {/* { props.playerChannelDetails.length > 0 && 
        <PlayerChannelsList channels={props.playerChannelDetails} className={'hidden-'+props.hideChannelsList}/>
      } */}

      <PlayerControls fullscreenContainer={'player-wrapper'} onFullScreenChange={props.onFullScreenChange}/>   
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

export default PlayerWrapper
