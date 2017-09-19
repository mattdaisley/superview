import React     from 'react';
import { connect } from 'react-redux';

import { playerOpen }  from '../../Redux/Player/PlayerActionCreators';
import { playerClose } from '../../Redux/Player/PlayerActionCreators';

class PlayerOpener extends React.Component {
  
  componentDidMount() {
    this.props.playerOpen();
  }
  
  componentWillUnmount() {
    this.props.playerClose();
  }
  
  render() {
    return (
      <div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  playerOpen: () => dispatch(playerOpen()),
  playerClose: () => dispatch(playerClose()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerOpener);