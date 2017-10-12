import React        from 'react';
import { connect }  from 'react-redux';
import PropTypes    from 'prop-types';
import NumberFormat from 'react-number-format';

import Button from 'material-ui/Button';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import ThumbUpIcon   from 'material-ui-icons/ThumbUp';

import { withStyles } from 'material-ui/styles';

const styles = theme => {
  return ({
    default: {
      color: '#A0A0A0'
    }, 
    active: {
      color: '#3A93F1'
    }
  })
}

class RatingButtons extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { playerChannel, rating, toggleLike, toggleDislike, classes } = this.props
    
    let likeButtonClass    = classes.default
    let dislikeButtonClass = classes.default
    if ( rating.length > 0 && rating[0].rating === 'like' ) likeButtonClass = classes.active
    if ( rating.length > 0 && rating[0].rating === 'dislike' ) dislikeButtonClass = classes.active

    return (
      <div style={{display: 'flex'}}>
        <Button className={likeButtonClass} aria-label="Like Button" onClick={() => toggleLike(playerChannel.id)}>
          <ThumbUpIcon/>
          <span style={{paddingLeft: 12}}><NumberFormat value={parseInt(playerChannel.stats.likes, 10)} thousandSeparator={true} displayType={'text'} /></span>
        </Button>
        <Button className={dislikeButtonClass} aria-label="Dislike Button" onClick={() => toggleDislike(playerChannel.id)}>
          <ThumbDownIcon/>
          <span style={{paddingLeft: 12}}><NumberFormat value={parseInt(playerChannel.stats.dislikes, 10)} thousandSeparator={true} displayType={'text'} /></span>
        </Button>
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
})

RatingButtons.propTypes = {
  playerChannel: PropTypes.object,
  rating: PropTypes.arrayOf(PropTypes.object),
  toggleLike: PropTypes.func,
  toggleDislike: PropTypes.func,
}

const RatingButtonsWithStyles = withStyles(styles)(RatingButtons);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingButtonsWithStyles);

