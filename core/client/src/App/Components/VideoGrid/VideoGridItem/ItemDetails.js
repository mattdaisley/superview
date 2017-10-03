import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';
import { connect } from 'react-redux';

import IconButton    from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';

import { withStyles } from 'material-ui/styles';

import AddItemButton from './AddItemButton';

import { addChannelId } from '../../../Redux/ChannelsList/ChannelsListActionCreators';


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
  }
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
  }
}

// const ItemImage = (props) => {
class ItemDetails extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = { 
      hover: false,
      addHover: false
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleAddClicked = this.handleAddClicked.bind(this);
  }

  handleMouseEnter() {
    this.setState({playHover: true, hover: true})
  }

  handleMouseLeave() {
    this.setState({hover: false})
  }

  handleAddClicked() {
    this.props.addChannelId( this.props.options.source, this.props.options.id )
  }

  render() {
    const {
      id,
      source,
      title,
      channelName,
      views
    } = this.props.options;

    const route       = '/' + source + '/' + id
  
  
    const classes = this.props.classes

    let playButtonClass = classes.playButton;
    if ( !!this.state.hover ) { playButtonClass += ' ' + classes.playButtonHover } else { playButtonClass += ' ' + classes.playButtonOut };
    if ( !!this.state.addHover ) { 
      playButtonClass += ' ' + classes.playHoverDim 
    } else {
      if ( !!this.state.playHover ) { playButtonClass += ' ' + classes.playHover };
    }
    
    return (
      <div className="list-grid-details-container" 
        onMouseEnter={ this.handleMouseEnter } 
        onMouseMove={ this.handleMouseEnter } 
        onMouseLeave={ this.handleMouseLeave }>
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

        <AddItemButton parentHover={this.state.hover} 
          onMouseEnter={ () => this.setState({addHover: true, playHover: false}) } 
          onMouseLeave={ () => this.setState({addHover: false, playHover:true}) } 
          onClick={ this.handleAddClicked } />

        {/* <Button style={overrideStyles.addButton} fab color="accent" aria-label="edit" className={addButtonClass}
          onMouseEnter={ () => this.setState({addHover:true, playHover:false})} onMouseLeave={ () => this.setState({addHover:false, playHover:true})}>
          <AddIcon/>
        </Button> */}
      </div>
    );
  }
} 

ItemDetails.propTypes = {
  options: PropTypes.object.isRequired,
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  addChannelId: (sourceType, channelIds) => dispatch(addChannelId(sourceType, channelIds)),
})


const ItemDetailsWithStyles = withStyles(styles)(ItemDetails);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemDetailsWithStyles);