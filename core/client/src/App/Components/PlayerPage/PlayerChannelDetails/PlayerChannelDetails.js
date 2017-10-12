import React        from 'react';
import { connect }  from 'react-redux';
import PropTypes    from 'prop-types';
import NumberFormat from 'react-number-format';

import Avatar from 'material-ui/Avatar';

import RatingButtons from './RatingButtons/RatingButtons'

import { rateYoutubeVideo, setVideoRatings, resetVideoRatings } from '../../../Redux/Youtube/YoutubeActionCreators';
import { compareArrays } from '../../../Util/utils'


class PlayerChannelDetails extends React.Component {
  
  constructor(props) {
    super(props)

    this.setVideoRatings = this.setVideoRatings.bind(this)
    this.toggleLike      = this.toggleLike.bind(this)
    this.toggleDislike   = this.toggleDislike.bind(this)
    this.setRating       = this.setRating.bind(this)
    
    this.state = {
      playerChannelDetails: [],
      videoRatings: []
    }
  }

  componentWillMount() {
    this.setVideoRatings(this.props)
  }

  componentWillUnmount() {
    this.props.resetVideoRatings()
  }

  componentWillReceiveProps(nextProps) {
    if ( !compareArrays(this.props.channelDetails, nextProps.channelDetails ) ) {
      this.setVideoRatings(nextProps)
    }
    if ( !compareArrays(this.props.videoRatings, nextProps.videoRatings ) ) {
      this.setState( { videoRatings: nextProps.videoRatings })
    }
  }


  setVideoRatings(props) {
    if ( props.channelDetails.length > 0  ) {
      this.setState( {
        playerChannelDetails: props.channelDetails,
        videoRatings: props.videoRatings
      })
      if ( props.sourceType === 'yt') props.setVideoRatings( props.channelDetails.map( playerChannel => playerChannel.id ))
    }
  }

  toggleLike(id) {
    this.setRating(id, 'like')
  }
  
  toggleDislike(id) {
    this.setRating(id, 'dislike')
  }

  setRating(id, newRating) {
    let videoRatings = [ ...this.state.videoRatings ]
    let stats = { likes: 0, dislikes: 0 }
    
    if ( videoRatings.length > 0 ) {
      const oldRating = videoRatings.filter( rating => rating.videoId === id)[0].rating
      if ( oldRating === newRating ) {
        newRating = 'none'
        if ( oldRating === 'like' ) stats.likes = -1
        if ( oldRating === 'dislike' ) stats.dislikes = -1
      } else {
        if ( newRating === 'like' ) stats.likes = 1
        if ( newRating === 'like' && oldRating === 'dislike' ) stats.dislikes = -1
        if ( newRating === 'dislike' ) stats.dislikes = 1
        if ( newRating === 'dislike' && oldRating === 'like' ) stats.likes = -1
      }
      this.props.rateYoutubeVideo(id, newRating)

      const newVideoRatings = videoRatings.map( videoRating => {
        if ( videoRating.videoId === id ) videoRating.rating = newRating
        return videoRating
      })
      this.setState({videoRatings: newVideoRatings})
      
      this.updatePlayerChannelDetailsStats(id, stats)
    }
  }

  updatePlayerChannelDetailsStats(id, stats) {
    let newPlayerChannelDetails = [ ...this.state.playerChannelDetails ]
    newPlayerChannelDetails.forEach( (playerChannel, index) => {
      if ( playerChannel.id === id ) {
        playerChannel.stats.likes = (parseInt(playerChannel.stats.likes, 10) + stats.likes)
        playerChannel.stats.dislikes = (parseInt(playerChannel.stats.dislikes, 10) + stats.dislikes)
        if ( playerChannel.stats.likes < 0 ) playerChannel.stats.likes = 0
        if ( playerChannel.stats.dislikes < 0 ) playerChannel.stats.dislikes = 0
      }
      // if ( index === newPlayerChannelDetails.length - 1) console.log(newPlayerChannelDetails)
    })
  }

  render() {
    const { playerChannelDetails, videoRatings } = this.state;
  
    return (
      <div style={{
        width: 'calc(100% - 200px)',
        margin: '20px auto 70px',
      }}>
        {/* <div>
          Super
        </div> */}
        <div style={{width: '70%'}}>
        { (playerChannelDetails.length > 0) && 
          playerChannelDetails.map( (playerChannel, index) => (
            <div key={playerChannel.id} style={{display: 'flex', padding: 12}}>
              <Avatar alt={playerChannel.channel.title} src={playerChannel.channel.logo} />
              <div style={{paddingLeft: 8, display: 'flex', flexDirection: 'column', flex: 1}}>
                
                <div style={{display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: 5}}>
                  <div style={{flex: 1, color: '#444', fontSize: 14, lineHeight: '1.7em'}}>
                    <div style={{fontWeight: 500}}>{playerChannel.channel.title}</div>
                    <div style={{fontSize: 16}}>{playerChannel.title}</div>
                    { playerChannel.stats.views && ( <div><NumberFormat value={parseInt(playerChannel.stats.views, 10)} thousandSeparator={true} displayType={'text'} /> views</div> )}
                  </div>
                  
                  { playerChannel.source_type === 'yt' && (
                    <RatingButtons
                      playerChannel={playerChannel}
                      rating={videoRatings.filter( rating => rating.videoId === playerChannel.id )}
                      toggleLike={this.toggleLike}
                      toggleDislike={this.toggleDislike} />
                  )}

                </div>

              </div>
            </div>
          ))
        }
        </div>
        <div style={{width: '30%'}}></div>
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    videoRatings: state.youtubeBrowse.youtubeVideoRatings
  }
}

const mapDispatchToProps = dispatch => ({
  rateYoutubeVideo: (videoId, rating) => dispatch(rateYoutubeVideo(videoId, rating)),
  setVideoRatings: (videoIds) => dispatch(setVideoRatings(videoIds)),
  resetVideoRatings: () => dispatch(resetVideoRatings()),
})

PlayerChannelDetails.propTypes = {
  channelDetails: PropTypes.arrayOf(PropTypes.object),
  sourceType: PropTypes.string
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerChannelDetails);

