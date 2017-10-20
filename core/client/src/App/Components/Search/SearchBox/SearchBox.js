import React       from 'react'
import PropTypes   from 'prop-types'

import { ListItem } from 'material-ui/List'
import TextField  from 'material-ui/TextField'
import SearchIcon from 'material-ui-icons/Search'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  icon: {
    color: '#3A93F1',
    margin: '0 15px 0 0',
  },
  hidden: {
    display: 'none',
  },
  listItemGutters: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
    },
  }
})

class Search extends React.Component {

  render = () => {

    const { open, searchValue, onSearchChange, classes } = this.props

    let searchResultsClasses = [ classes.searchResults ]
    if ( !open || searchValue === '' ) searchResultsClasses.push(classes.hidden)

    return (
      <ListItem classes={{gutters: classes.listItemGutters}}>
        <SearchIcon className={classes.icon} onClick={this.open}/>
        <TextField
          type="search"
          value={ searchValue }
          onFocus={ open }
          onChange={ onSearchChange }
          fullWidth
          InputProps={{ placeholder: 'Search' }}
        />
      </ListItem>
    )
  }
}

Search.propTypes = {
  open: PropTypes.func,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
}

export default withStyles(styles)(Search)