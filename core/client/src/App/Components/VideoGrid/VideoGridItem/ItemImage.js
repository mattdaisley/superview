import React     from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  listGridThumb: {
    width: '100%',
    position: 'relative',
    paddingTop: '56.25%',
    // overflow: 'hidden',
    boxSizing: 'border-box',
    borderRadius: '20px'
  },
  img: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
    borderRadius: 3
    // borderRadius: '20px'
  },
  imgLoaded: {
    opacity: 100,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.standard,
    }),
  }
})

// const ItemImage = (props) => {
class ItemImage extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = { 
      imgLoaded: false,
      imgNewLoaded: false,
      imgSrc: this.props.src,
      imgSrcNew: undefined,
      count: 0
    }

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleImageNewLoaded = this.handleImageNewLoaded.bind(this);
  }

  componentWillMount() {
    const initialTimeout = setTimeout(() => this.getNewImageSrc(), (Math.random() * 1000 * 60) + 2000); // between 2 seconds and 1 minute
    this.setState({initialTimeout: initialTimeout})
  }

  componentWillReceiveProps(nextProps) {
    if ( this.state.imgSrc !== nextProps.src ) this.setState( { imgSrc: nextProps.src } )
  }

  getNewImageSrc() {
    // console.log('in imgReload', this.state.imgSrc);
    this.setState({count: this.state.count+1});
    switch( this.state.count % 2 ) {
      case 1: 
        this.setState({imgSrcNew: this.props.src + '?' + this.state.count})
        break;
      case 0:
      default:
        this.setState({imgSrc: this.props.src + '?' + this.state.count})
        break;
        
    }
    const imgReload = setTimeout( () => this.getNewImageSrc(), ((Math.random() * 4000) * 60) + 2000) // between 1 and 4 minutes
    this.setState({imgReload: imgReload})
  }

  componentWillUnmount() {
    // console.log('unmount', this.state.imgReload, this.state.initialTimeout);
    clearInterval(this.state.imgReload);
    clearTimeout(this.state.initialTimeout);
  }
  
  handleImageLoaded() {
    this.setState({imgLoaded:true})
    setTimeout( () => { this.setState({imgSrcNew: undefined, imgNewLoaded: false}) }, 1000)
  }
  
  handleImageNewLoaded() {
    this.setState({imgNewLoaded:true})
    setTimeout( () => { this.setState({imgSrc: undefined, imgLoaded: false}) }, 1000)
  }
  
  render() {

    const classes = this.props.classes
    
    const { title } = this.props;

    // const imgClass = (!!this.state.imgLoaded) ? (classes.img + ' ' + classes.imgLoaded) : classes.img;
    // const imgNewClass = (!!this.state.imgNewLoaded) ? (classes.img + ' ' + classes.imgLoaded) : classes.img;

    return (
      <div className={classes.listGridThumb}>
        { !!this.state.imgSrc && <img className={classes.img + ' ' + classes.imgLoaded} src={this.state.imgSrc} alt={title}/> }
        {/* { !!this.state.imgSrc && <img className={imgClass} src={this.state.imgSrc} alt={title} onLoad={this.handleImageLoaded}/> } */}
        {/* { !!this.state.imgSrcNew && <img className={imgNewClass} src={this.state.imgSrcNew} alt={title} onLoad={this.handleImageNewLoaded}/> } */}
      </div>
    );
  }
} 

ItemImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string
}

const ItemImageWithStyles = withStyles(styles)(ItemImage);

export default ItemImageWithStyles;
