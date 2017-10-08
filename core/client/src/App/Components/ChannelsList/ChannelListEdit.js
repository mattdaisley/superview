import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';

import CurrentSources         from './CurrentSources';

class ChannelListEdit extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      channels: [],
    }

    this.onRemoveSource   = this.onRemoveSource.bind(this);
    this.applyChannels    = this.applyChannels.bind(this);
    this.cancel           = this.cancel.bind(this);
  }

  componentWillMount() {
    if ( this.props.channels ) this.setState( { channels: this.props.channels } );
  }
  
  onRemoveSource(sourceToRemove) {
    let oldChannels = [ ...this.state.channels ];

    const filteredChannels = oldChannels.filter( source => {
      if ( source.source_type === sourceToRemove.source_type && source.id === sourceToRemove.id ) return false;
      return true;
    })

    this.setState( {channels: filteredChannels} );
  }
  
  applyChannels() {
    // let channels = [ ...this.props.channels, ...this.state.channels ];
    let channels = [ ...this.state.channels ];
    this.props.onEditToggle(channels);
  }
  
  cancel() {
    this.props.onEditToggle(this.props.channels);
  }

  render() {
    // console.log('in render', this.state, this.props);

    let parentClassName = '';
    if( this.props.className !== undefined ){
      parentClassName = this.props.className
    }

    // const currentChannels = [ ...this.props.channels, ...this.state.channels ]
    const currentChannels = [ ...this.state.channels ]
    
    return (
      <div className={'player-channel-list-container edit ' + parentClassName}>
        
        <CurrentSources sources={currentChannels} onRemoveSource={this.onRemoveSource} />
        
        <List className="channel-list-edit-actions">
          <ListItem>
            <Button color="primary" aria-label="edit" onClick={this.cancel}>
              Cancel
            </Button>
            { !!this.state.channels && this.state.channels.length > 0 &&
              <Button color="primary" aria-label="edit" onClick={this.applyChannels}>
                Play
              </Button>
            }
            { (this.state.channels.length === 0) &&
              <Button color="primary" aria-label="edit" onClick={this.applyChannels}>
                Close
              </Button>
            }
          </ListItem>
        </List>
      </div>
    );

  }
}

ChannelListEdit.propTypes = {
  source: PropTypes.string,
  channels: PropTypes.arrayOf( PropTypes.object ).isRequired,
  className: PropTypes.any,
  onEditToggle: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    openState: state.player.openState,
  }
}

const mapDispatchToProps = dispatch => ({ })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelListEdit);
