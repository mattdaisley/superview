export default theme => ({
  searchResults: {
    position: 'fixed',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    maxHeight: 'calc(100vh - 120px)',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100vw - 200px)',
      top: 64,
      left: 100,
      padding: '0 16px 10px 16px',
      border: '1px solid #ccc',
      borderTop: 0,
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100vw - 600px)',
      top: 64,
      left: 300,
      padding: '0 16px 10px 16px',
      border: '1px solid #ccc',
      borderTop: 0,
    },
    [theme.breakpoints.down('md')]: {
      width: 'calc(100vw)',
      top: 56,
      left: 0,
      borderBottom: '1px solid #ccc',
    },
  },
  hidden: {
    display: 'none',
  },
})