import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';

import ChannelListAvatars from './ChannelListAvatars';
import ChannelListEdit    from './ChannelListEdit';

import PlayerUtils from '../../Components/PlayerPage/PlayerUtils';

/*
width: 100px;
  position: fixed;
  top: 84px;
  right: 0;
  padding: 6px;
  box-sizing: border-box;
  */
const styles = theme => ({
  channelsListRoot: {
    position: 'fixed',
    padding: '6px',
    boxSizing: 'border-box',
    right: 0,
    width: '100px',
    [theme.breakpoints.up('md')]: {
      top: '84px',
    },
    [theme.breakpoints.down('md')]: {
      bottom: '80px'
    },
  },
  channelsListEdit: {
    position: 'fixed',
    padding: '0',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
      width: '600px',
      top: '86px',
      right: '15px',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxHeight: 'calc(100% - 86px)',
      top: '70px',
      right: '0',
    },
  }
})

class ChannelsList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      mode: 'list',
    }

    this.onEditToggle   = this.onEditToggle.bind(this);
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  onEditToggle(channels) {

    if ( channels && channels.length > 0 ) {
      const newChannelNames = channels.map( channel => {
        if ( channel.source_type && channel.source_type === 'tw' ) return channel.channel.name
        if ( channel.source_type && channel.source_type === 'yt' ) return channel.id
        return channel.id
      } )
      const oldChannelNames = this.props.sources.map( channel => {
        if ( channel.source_type && channel.source_type === 'tw' ) return channel.channel.name
        if ( channel.source_type && channel.source_type === 'yt' ) return channel.id
        return channel.id
      } )
      if ( !PlayerUtils.compareArrays(newChannelNames, oldChannelNames) ) {
        let pathname = '/'+ channels[0].source_type + '/' + newChannelNames.join('/');
        this.context.router.history.push(pathname);
      }
    }

    if ( this.state.mode === 'list' ) this.setState( {mode: 'edit'} )
    if ( this.state.mode === 'edit' ) this.setState( {mode: 'list'} )
  }

  render() {
    let parentClassName = '';
    if(this.props.className !== undefined){
      parentClassName = this.props.className
    }

    const classes = this.props.classes;

    const rootClass = ( this.state.mode === 'list' ) ? classes.channelsListRoot : classes.channelsListEdit;

    return (
      <div className={rootClass}>
        { this.state.mode === 'list' && 
          <ChannelListAvatars 
            sources={this.props.sources} 
            className={parentClassName} 
            onEditToggle={this.onEditToggle} 
          /> 
        }
        { this.state.mode === 'edit' && 
          <ChannelListEdit 
            source={this.props.source} 
            sources={this.props.sources} 
            className={parentClassName} 
            onEditToggle={this.onEditToggle} 
          /> 
        }
      </div>
    );
  }
}

ChannelsList.propTypes = {
  source: PropTypes.string,
  sources: PropTypes.arrayOf( 
    PropTypes.object
  ).isRequired,
  className: PropTypes.any,
}

// const ChannelsListStyled = withStyles(styles)(ChannelsList);
// const ChannelsListWithWidth = withStyles(styles)(ChannelsList);

export default compose(withStyles(styles), withWidth())(ChannelsList);

// export default ChannelsListStyled;