import React       from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  headerLogoText: {
    maxWidth: 100
  },
})

class HeaderLogo extends React.Component {

  render() {

    const { windowWidth, classes } = this.props

    if ( windowWidth > 1280 ) {
      return (
        <Typography type="title" className={classes.headerLogoText}>
          SuperView
        </Typography>
      )
    }

    return null
  }
}

HeaderLogo.propTypes = {
  windowWidth: PropTypes.number.isRequired,
}

const mapStateToProps = state => {
  return {
    windowWidth: state.window.width,
  }
}

const mapDispatchToProps = dispatch => ({ })

const HeaderLogoWithStyles = withStyles(styles)(HeaderLogo);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogoWithStyles);