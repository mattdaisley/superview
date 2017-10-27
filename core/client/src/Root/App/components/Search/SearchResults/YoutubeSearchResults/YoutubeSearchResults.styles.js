export default theme => ({
  container: {
    display: 'flex'
  },
  channelAvatar: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 246
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 100
    },
  },
  link: {
    textDecoration: 'none'
  },
  listItemSecondaryAction: {
    [theme.breakpoints.up('md')]: {
      paddingRight: 102
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: 80
    },
  },
  secondaryActionRoot: {
    [theme.breakpoints.down('md')]: {
      right: -12
    },
  }
})