import React     from 'react';
import PropTypes from 'prop-types';

import Button        from 'material-ui/Button';
import AddIcon       from 'material-ui-icons/Add';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  addButton: {
    position: 'absolute',
    right: 25,
    color: 'white'
  },
  addButtonOut: {
    bottom: -100,
    transition: [
      theme.transitions.create('bottom', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
  parentHover: {
    bottom: 25,
    transition: [
      theme.transitions.create('bottom', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
    ],
  },
  addHover: {
    color: '#448aff'
  },
})

const overrideStyles = {
  addButton: {
    background: 'rgba(0,0,0,.6)',
    borderRadius: 50,
    border: '1px solid white',
  },
}

// const ItemImage = (props) => {
class AddItemButton extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = { 
      hover: false
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick      = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( !nextProps.parentHover && nextState.hover ) return false;
    return true;
  }

  handleMouseEnter() {
    this.setState({hover:true})
    this.props.onMouseEnter();
  }

  handleMouseLeave() {
    this.setState({hover:false})
    this.props.onMouseLeave();
  }

  handleClick() {
    this.props.onClick()
  }

  render() {
    const {
      parentHover
    } = this.props;
  
  
    const classes = this.props.classes


    let addButtonClass = classes.addButton;
    if ( !!parentHover ) { addButtonClass += ' ' + classes.parentHover } else { addButtonClass += ' ' + classes.addButtonOut };
    if ( !!this.state.hover ) { addButtonClass += ' ' + classes.addHover };
    
    // console.log(classes, addButtonClass)
    return (
      <Button style={overrideStyles.addButton} fab color="accent" aria-label="edit" className={addButtonClass}
        onMouseEnter={ this.handleMouseEnter } onMouseLeave={ this.handleMouseLeave } onClick={ this.handleClick } >
        <AddIcon/>
      </Button>
    );
  }
} 

AddItemButton.propTypes = {
  parentHover: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
}

const AddItemButtonWithStyles = withStyles(styles)(AddItemButton);

export default AddItemButtonWithStyles;