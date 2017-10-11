import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import CloseIcon  from 'material-ui-icons/Close';
import InputIcon  from 'material-ui-icons/Input';

import { withStyles } from 'material-ui/styles';

const playerTitleHeight = 40;

const styles = theme => ({
  title: {
    position: 'relative',
    height: playerTitleHeight,
    border: '1px solid #ccc',
    backgroundColor: '#efefef'
  },
  titleButton: {
    height: playerTitleHeight,
    width: playerTitleHeight
  },
})

class PlayerMinimizedHeader extends React.Component {

  render() {
    const { sourceType, playerClose, channels, classes } = this.props;

    const route = '/' + sourceType + '/' + channels.map( channel => channel.id ).join('/')
    
    return (
      <div className={classes.title}>
        <IconButton className={classes.titleButton} aria-label="Close" onClick={playerClose}>
          <CloseIcon />
        </IconButton>
        <Link to={route}>
          <IconButton className={classes.titleButton} aria-label="Open">
            <InputIcon /> 
          </IconButton>
        </Link>
      </div> 
    )
  }

}

PlayerMinimizedHeader.propTypes = {
  playerClose: PropTypes.func,
  sourceType: PropTypes.string,
}

const mapStateToProps = state => { return { 
  channels: state.channelsList.channels
}}
const mapDispatchToProps = dispatch => ({ })

const PlayerMinimizedHeaderWithStyles = withStyles(styles)(PlayerMinimizedHeader);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerMinimizedHeaderWithStyles);
