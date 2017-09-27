import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

import Button        from 'material-ui/Button';
import IconButton    from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import AddIcon       from 'material-ui-icons/Add';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  playButton: {
    position: 'absolute',
    marginLeft: -40,
    marginBottom: -40,
    left: '50%',
    color: 'white',
    bottom: '60%'
  },
  playButtonOut: {
    opacity: 0,
    transition: [
      theme.transitions.create('opactiy', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
  playButtonHover: {
    opacity: 1,
    transition: [
      theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
  playHover: {
    color: '#448aff'
  },
  playHoverDim: {
    opacity: .2
  },
  addButton: {
    position: 'absolute',
    right: 25,
    color: 'white'
  },
  addButtonOut: {
    bottom: -100,
    transition: [
      theme.transitions.create('bottom', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
  addButtonHover: {
    bottom: 25,
    transition: [
      theme.transitions.create('bottom', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
  addHover: {
    color: '#448aff'
  },
})

const overrideStyles = {
  playButton: {
    background: 'rgba(0,0,0,.6)',
    borderRadius: 50,
    border: '2px solid white',
    height: 80,
    width: 80,
  },
  playArrowIcon: {
    width: 50,
    height: 50,
  },
  addButton: {
    background: 'rgba(0,0,0,.6)',
    borderRadius: 50,
    border: '1px solid white',
  },
}

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

    let playButtonClass = classes.playButton;
    if ( !!this.state.hover ) { playButtonClass += ' ' + classes.playButtonHover } else { playButtonClass += ' ' + classes.playButtonOut };
    if ( !!this.state.addHover ) { 
      playButtonClass += ' ' + classes.playHoverDim 
    } else {
      if ( !!this.state.playHover ) { playButtonClass += ' ' + classes.playHover };
    }


    let addButtonClass = classes.addButton;
    if ( !!this.state.hover ) { addButtonClass += ' ' + classes.addButtonHover } else { addButtonClass += ' ' + classes.addButtonOut };
    if ( !!this.state.addHover ) { addButtonClass += ' ' + classes.addHover };
    
    return (
      <div className="list-grid-details-container" onMouseEnter={ () => this.setState({hover:true, playHover:true})} onMouseLeave={ () => this.setState({hover:false, playHover:true})}>
        <Link to={route}>
          <div className="list-grid-details">
            <div className="list-grid-details-title">{title}</div>
            <div className="list-grid-details-channel">{channelName}</div>
            <div className="list-grid-details-info">{views}</div>
          </div>

          <IconButton style={overrideStyles.playButton} color="accent" aria-label="edit" className={playButtonClass}>
            <PlayArrowIcon style={overrideStyles.playArrowIcon} />
          </IconButton>

        </Link>

        <Button style={overrideStyles.addButton} fab color="accent" aria-label="edit" className={addButtonClass}
          onMouseEnter={ () => this.setState({addHover:true, playHover:false})} onMouseLeave={ () => this.setState({addHover:false, playHover:true})}>
          <AddIcon/>
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