export default theme => ({
  loginActions: {
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  topNavAppBar: {
    backgroundColor: 'white',
    zIndex: 10000,
    position: 'fixed',
    // overflow: 'hidden',
  },
  appLogoText: {
    maxWidth: 100
  },
  menuButtonWrapper: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 25,
      marginRight: 25,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      marginRight: 10,
    },
  }
})