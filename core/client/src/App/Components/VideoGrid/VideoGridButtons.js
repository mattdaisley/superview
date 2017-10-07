import React     from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon  from 'material-ui-icons/KeyboardArrowLeft';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  pageButtons: {
    position: 'absolute',
    right: 0,
    top: -84
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class VideoGridButtons extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    const { page, pages, transition, classes, goPrevPage, goNextPage } = this.props

    let element = null;

    if ( pages !== 1 ) {
      element = (
        <div className={classes.pageButtons}>
          <Button fab aria-label="add" className={classes.button} disabled={ page === 0 && transition !== 'next' } onClick={goPrevPage}>
            <KeyboardArrowLeftIcon />
          </Button>
          <Button fab aria-label="add" className={classes.button} disabled={ page === (pages - 1) && transition !== 'prev' } onClick={goNextPage}>
            <KeyboardArrowRightIcon />
          </Button>
        </div>
      )
    }
    
    return element;
  }
} 

VideoGridButtons.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  transition: PropTypes.string,
  goPrevPage: PropTypes.func,
  goNextPage: PropTypes.func,
}

const mapStateToProps = state => ({ })
const mapDispatchToProps = dispatch => ({ })


const VideoGridButtonsWithStyles = withStyles(styles)(VideoGridButtons);

export default connect(mapStateToProps, mapDispatchToProps)(VideoGridButtonsWithStyles);

