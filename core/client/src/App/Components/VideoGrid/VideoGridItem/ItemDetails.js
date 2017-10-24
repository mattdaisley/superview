import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import PlayItemButton from './PlayItemButton';
import AddItemButton  from './AddItemButton';

import { addChannelId } from '../../../Redux/Player/ChannelsList/ChannelsListActionCreators';


const styles = theme => ({

})

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
  
    // const classes = this.props.classes
    
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

          <PlayItemButton hover={this.state.hover} addHover={this.state.addHover} playHover={this.state.playHover} />

        </Link>

        <AddItemButton 
          parentHover={this.state.hover} 
          onMouseEnter={ () => this.setState({addHover: true, playHover: false}) } 
          onMouseLeave={ () => this.setState({addHover: false, playHover:true}) } 
          onClick={ this.handleAddClicked } />
          
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