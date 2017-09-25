import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

import Button   from 'material-ui/Button';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  playButton: {
    position: 'absolute',
    right: 25,
  },
  playButtonOut: {
    bottom: -100,
    transition: [
      theme.transitions.create('bottom', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
  playButtonHover: {
    bottom: 25,
    transition: [
      theme.transitions.create('bottom', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
})

// const ItemImage = (props) => {
class ItemDetails extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = { 
      hover: false
    }
  }

  render() {
    const {
      route,
      title,
      channelName,
      views
    } = this.props.options;
  
  
    const classes = this.props.classes
    // const source      = props.videoItem.source
    // const title       = props.videoItem.title;
    // const id          = props.videoItem.id;
    // const channelName = ( props.videoItem.channel ) ? props.videoItem.channel.name : null;
    // const views       = ( props.videoItem.stats ) ? props.videoItem.stats.views.toLocaleString('en-IN') + ' ' + ( props.source === 'tw' ? 'viewers' : 'views' ) : null;
    
    const playButtonHoverClass = ( !!this.state.hover ) ? classes.playButtonHover : classes.playButtonOut;

    return (
      <div className="list-grid-details-container" onMouseEnter={ () => this.setState({hover:true})} onMouseLeave={ () => this.setState({hover:false})}>
        <Link to={route}>
          <div className="list-grid-details">
            <div className="list-grid-details-title">{title}</div>
            <div className="list-grid-details-channel">{channelName}</div>
            <div className="list-grid-details-info">{views}</div>
          </div>
        </Link>
        <Button fab color="accent" aria-label="edit" className={classes.playButton + ' ' + playButtonHoverClass}>
          <PlayArrowIcon />
        </Button>
      </div>
    );
  }
} 

ItemDetails.propTypes = {
  options: PropTypes.object.isRequired,
}

const ItemDetailsWithStyles = withStyles(styles)(ItemDetails);

export default ItemDetailsWithStyles;