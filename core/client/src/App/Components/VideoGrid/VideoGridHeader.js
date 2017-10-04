import React     from 'react';
import PropTypes from 'prop-types';
import { Link }    from 'react-router-dom';

import ChevronRight from 'material-ui-icons/ChevronRight';
import { withStyles } from 'material-ui/styles';

import './VideoGrid.css';

const styles = theme => ({
  listGridItem: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    fontSize: 24,
    fontWeight: 400,
    textDecoration: 'none',
    color: '#444',
    '&:hover': {
      textDecoration: 'underline',
    }
  },

  twDivider: {
    height: 2,
    width: 150,
    background: 'purple',
    marginBottom: 30,
  },
  ytDivider: {
    height: 2,
    width: 150,
    background: 'red',
    marginBottom: 30,
  }
})

class VideoGridHeader extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const classes = this.props.classes

    const { route, title, sourceType } = this.props
    
    return (
      <div>
        <div><h3 className={classes.header}><Link className={classes.link} to={route}>{title}</Link> <ChevronRight/></h3></div>
        <div className={classes[sourceType+'Divider']}></div>
      </div>
    )
  }
} 

VideoGridHeader.propTypes = {
  title: PropTypes.string,
  route: PropTypes.string,
  sourceType: PropTypes.string,
}

const VideoGridHeaderWithStyles = withStyles(styles)(VideoGridHeader);

export default VideoGridHeaderWithStyles;

