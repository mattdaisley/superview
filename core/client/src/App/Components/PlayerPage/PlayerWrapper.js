import React       from 'react'
import { connect } from 'react-redux'
import PropTypes   from 'prop-types'

import { withStyles } from 'material-ui/styles'

import PlayerControls from './PlayerControls/PlayerControls'
// import PlayerChannelsList from './PlayerChannelsList'
import EmbedPlayer    from './EmbedPlayer'
import TwitchChat     from '../../Components/Twitch/TwitchChat/TwitchChat'

import PlayerUtils from './PlayerUtils'
import { compareArrays } from '../../Util/utils'

import styles from './Styles/PlayerWrapperStyles'


class PlayerWrapper extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      layout: undefined,
      layoutVersion: ''
    }

    this.setChatChannel = this.setChatChannel.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
  }

  v2Layouts = [ '1', '5', '7' ]

  componentWillMount() {
    if ( this.props.playerChannelDetails.length > 0 ) {
      this.setChatChannel(this.props.playerChannelDetails[0].channel.name)
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.playerChannelDetails.length > 0 ) {
      this.setChatChannel(nextProps.playerChannelDetails[0].channel.name)
    }
    if ( !compareArrays(nextProps.playerSources, this.props.playerSources) || this.state.layout === undefined ) {
      const layout = PlayerUtils.getDefaultLayout(nextProps.playerSources)
      this.setState({layout: layout})
    }
  }

  setChatChannel(channelName) {
    this.setState( { chatChannel: channelName } )
  }

  onLayoutChange() {
    const layout = this.state.layout
    if ( this.v2Layouts.indexOf(layout) !== -1 ) {
      let newLayoutVersion = ( this.state.layoutVersion !== 'v2' ) ? 'v2' : ''
      this.setState( { layoutVersion: newLayoutVersion } )
    }
  }

  render() {
    
    const { playerChannelDetails, windowWidth, windowHeight, classes } = this.props
    const { layout, layoutVersion } = this.state
    
    // Set twitch chat state
    const showTwitchChat = (this.props.sourceType === 'tw' && playerChannelDetails.length > 0 && this.props.openState === 'open')
    let chatHeight = windowHeight - 56 - 50 - ( windowWidth * 9/16 )
  
    // Set PlayerWrapper classes
    let playerWrapperClass = []
    if ( !this.props.isFullscreen ) { playerWrapperClass.push( classes.playerWrapper ) }
    else { playerWrapperClass.push( classes.playerWrapperFullscreen ) }
    if ( this.props.openState !== 'minimized' ) { playerWrapperClass.push( classes.playerWrapperOpen ) }
    else { playerWrapperClass.push( classes.playerWrapperMinimized ) }
    if ( windowWidth <= 1280 ) playerWrapperClass.push(classes.playerWrapperMobile)
    let playerWrapperStyle = {}
    if ( windowWidth <= 1280 && this.props.openState === 'open' ) playerWrapperStyle = { height: 'auto', maxHeight: (this.props.playerSources.length || 1) * ( windowWidth * 9/16 ) }
    if ( this.props.sourceType === 'tw' ) playerWrapperStyle.maxHeight += chatHeight
    
    // Set PlayerContainer classes and styles
    let playerContainerClass = []
    if ( !this.props.isFullscreen ) playerContainerClass.push(classes.playerContainer)
    if ( this.props.isFullscreen ) playerContainerClass.push(classes.playerContainerFullscreen)
    if ( this.props.openState === 'minimized' ) playerContainerClass.push(classes.playerContainerMinimized)
    let playerContainerStyle = {}
    if ( windowWidth <= 1280 && this.props.openState === 'open' ) playerContainerStyle = { minHeight: (this.props.playerSources.length || 1) * ( windowWidth * 9/16 ) }
    
    // build the embed player elements to display
    const playerClass = [ classes.player ]
    if ( !this.props.isFullscreen ) playerClass.push(classes.playerFullscreen)
    if ( this.props.openState === 'minimized' ) playerClass.push(classes.playerMinimized)
  
    const embedPlayers = this.props.playerSources.map( (videoId, index) => {
      let playerLayoutClass = classes['player' + index + 'layout' + layout + layoutVersion]
      return (
        <EmbedPlayer
          key={this.props.sourceType + ':' + videoId}
          className={[...playerClass, playerLayoutClass].join(' ')}
          source={this.props.source}
          id={videoId}
          index={index}
        />
      )
    })
  
    // Set player controls props
    const fullscreenClass = (this.props.isFullscreen) ? 'fullscreen' : ''
    let onLayoutChange = undefined
    if ( this.v2Layouts.indexOf(layout) !== -1 && windowWidth > 1280 ) { onLayoutChange = this.onLayoutChange }
    
    return (
      <div id="player-wrapper" className={['flex', ...playerWrapperClass].join(' ')} style={playerWrapperStyle}>
  
        <div className={[...playerContainerClass].join(' ')} style={playerContainerStyle}>
          {embedPlayers}
        </div>
  
        { !!showTwitchChat && (
          <TwitchChat 
            hideChannelsList={this.props.hideChannelsList} 
            chatChannels={playerChannelDetails.map( channelDetails => channelDetails.channel.name )} 
            selectedChannel={this.props.chatChannel}
            chatHeight={chatHeight}
          />
        )}
        
        <PlayerControls 
          className={[fullscreenClass].join(' ')}
          fullscreenContainer={'player-wrapper'} 
          onFullScreenChange={this.props.onFullScreenChange}
          onLayoutChange={onLayoutChange}
        />   
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    windowWidth: state.window.width,
    windowHeight: state.window.height,
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


const PlayerWrapperWithStyles = withStyles(styles)(PlayerWrapper)

export default connect(mapStateToProps, mapDispatchToProps)(PlayerWrapperWithStyles)
// export default PlayerWrapperWithStyles
