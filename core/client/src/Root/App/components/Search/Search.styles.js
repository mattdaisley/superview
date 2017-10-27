export default theme => ({
  searchContainer: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 100,
      marginRight: 100,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 20
    },
  },
  hidden: {
    display: 'none',
  },
})