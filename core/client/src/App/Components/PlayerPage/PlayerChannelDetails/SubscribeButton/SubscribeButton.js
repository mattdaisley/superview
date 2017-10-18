import React        from 'react';
import { connect }  from 'react-redux';
import PropTypes    from 'prop-types';
// import NumberFormat from 'react-number-format';

import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';

const styles = theme => {
  return ({
    subscribeButton: {
      marginLeft: 8
    }
  })
}

class SubscribeButton extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { playerChannel, isSubscribed, toggleSubscribe, classes } = this.props

    let subscribedText    = '...'
    if ( isSubscribed === true ) subscribedText = 'Subscribed'
    if ( isSubscribed === false ) subscribedText = 'Subscribe'

    return (
      <Button 
        raised={!isSubscribed} 
        color="primary" 
        className={classes.subscribeButton} 
        aria-label="Subscribe Button" 
        onClick={() => toggleSubscribe(playerChannel.channel.channel_id)}>
        {subscribedText}
      </Button>
    )

  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
})

SubscribeButton.propTypes = {
  playerChannel: PropTypes.object,
  isSubscribed: PropTypes.bool,
  toggleSubscribe: PropTypes.func,
}

const SubscribeButtonWithStyles = withStyles(styles)(SubscribeButton);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscribeButtonWithStyles);

