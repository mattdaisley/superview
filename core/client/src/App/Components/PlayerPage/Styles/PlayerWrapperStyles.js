const styles = theme => ({
  playerWrapper: {
    boxSizing: 'border-box',
    height: '100%',
    backgroundColor: '#000',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    }
  },
  playerWrapperOpen: {
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 200px)',
      maxHeight: 'calc(100vh - 220px)',
      margin: '90px auto 20px',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    }
  },
  playerWrapperMinimized: {
    width: '100%',
    height: '100%',
    margin: 0
  },
  playerWrapperFullscreen: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    padding: '1px',
    boxSizing: 'border-box',
    margin: 0,
    backgroundColor: '#000',
  },

  playerContainer: {
    boxSizing: 'border-box',
    width: '100%',
    // height: '100%',
    backgroundColor: '#000',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 220px)',
      overflow: 'hidden',
    },
    [theme.breakpoints.down('md')]: {
      maxHeight: '100%',
    }
  },
  playerContainerMinimized: {
    height: '100%'
  },
  playerContainerFullscreen: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 50px)',
    display: 'flex',
    flexWrap: 'wrap',
  },

  player: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      height: '100%',
      // maxHeight: 'calc(100vh - 220px)',
    },
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      height: 'calc(100vw * (9/16) )',
      maxHeight: '100%',
    }
  },
  playerMinimized: {
    [theme.breakpoints.down('md')]: {
      height: '100%',
    }
  },

  playerFullscreen: {
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 50px)',
    },
    [theme.breakpoints.down('md')]: {
      
    }
  },

  player0layout0: {
    [theme.breakpoints.up('md')]: { width: '100%', height: '100%', top: '0', left: '0', },
    [theme.breakpoints.down('md')]: {}
  },


  player0layout1: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '100%', top: '0', left: '0', },
    [theme.breakpoints.down('md')]: {}
  },
  player1layout1: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '100%', top: '0', right: '0', },
    [theme.breakpoints.down('md')]: {}
  },
  
  player0layout1v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '100%', maxHeight: '50%', position: 'relative', } 
  },
  player1layout1v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '100%', maxHeight: '50%', position: 'relative', } 
  },

  player0layout3: {
    [theme.breakpoints.up('md')]: { width: '100%', height: '50%', top: '0', left: '0', } 
  },
  player1layout3: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', bottom: '0', left: '0', } 
  },
  player2layout3: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', bottom: '0', right: '0', } 
  },

  player0layout4: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '100%', top: '0', left: '0', } 
  },
  player1layout4: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', top: '0', right: '0', } 
  },
  player2layout4: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', bottom: '0', right: '0', } 
  },

  player0layout5: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', top: '0', left: '0', } 
  },
  player1layout5: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', top: '0', right: '0', } 
  },
  player2layout5: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', bottom: '0', left: '0', } 
  },
  player3layout5: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', bottom: '0', right: '0', } 
  },
  
  player0layout5v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '100%', maxHeight: '54%', position: 'relative', } 
  },
  player1layout5v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '33.333%', maxHeight: '46%', position: 'relative', } 
  },
  player2layout5v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '33.333%', maxHeight: '46%', position: 'relative', } 
  },
  player3layout5v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '33.333%', maxHeight: '46%', position: 'relative', } 
  },

  player0layout7: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', top: '0', left: '0', } 
  },
  player1layout7: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', top: '0', right: '0', } 
  },
  player2layout7: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', bottom: '0', left: '0', } 
  },
  player3layout7: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', bottom: '0', left: 'calc(100% / 3)', } 
  },
  player4layout7: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', bottom: '0', right: '0', } 
  },
  
  player0layout7v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '100%', maxHeight: '60%', position: 'relative', } 
  },
  player1layout7v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '25%', maxHeight: '40%', position: 'relative', } 
  },
  player2layout7v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '25%', maxHeight: '40%', position: 'relative', } 
  },
  player3layout7v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '25%', maxHeight: '40%', position: 'relative', } 
  },
  player4layout7v2: {
    [theme.breakpoints.up('md')]: { maxWidth: '25%', maxHeight: '40%', position: 'relative', } 
  },

  player0layout8: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', top: '0', left: '0', } 
  },
  player1layout8: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', top: '0', left: 'calc(100% / 3)', } 
  },
  player2layout8: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', top: '0', right: '0', } 
  },
  player3layout8: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', bottom: '0', left: '0', } 
  },
  player4layout8: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', bottom: '0', right: '0', } 
  },

  player0layout9: {
    [theme.breakpoints.up('md')]: { width: '50%', height: 'calc(100% / 3)', top: '0', left: '0', } 
  },
  player1layout9: {
    [theme.breakpoints.up('md')]: { width: '50%', height: 'calc(100% / 3)', top: 'calc(100% / 3)', left: '0', } 
  },
  player2layout9: {
    [theme.breakpoints.up('md')]: { width: '50%', height: 'calc(100% / 3)', bottom: '0', left: '0', } 
  },
  player3layout9: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', top: '0', right: '0', } 
  },
  player4layout9: {
    [theme.breakpoints.up('md')]: { width: '50%', height: '50%', bottom: '0', right: '0', } 
  },

  player0layout10: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', top: '0', left: '0', } 
  },
  player1layout10: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', top: '0', left: 'calc(100% / 3)', } 
  },
  player2layout10: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', top: '0', right: '0', } 
  },
  player3layout10: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', bottom: '0', left: '0', } 
  },
  player4layout10: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', bottom: '0', left: 'calc(100% / 3)', } 
  },
  player5layout10: {
    [theme.breakpoints.up('md')]: { width: 'calc(100% / 3)', height: '50%', bottom: '0', right: '0', } 
  },

  player0layout11: {
    [theme.breakpoints.up('md')]: { width: '50%', height: 'calc(100% / 3)', top: '0', left: '0', } 
  },
  player1layout11: {
    [theme.breakpoints.up('md')]: { width: '50%', height: 'calc(100% / 3)', top: 'calc(100% / 3)', left: '0', } 
  },
  player2layout11: {
    [theme.breakpoints.up('md')]: { width: '50%', height: 'calc(100% / 3)', bottom: '0', left: '0', } 
  },
  player3layout11: {
    [theme.breakpoints.up('md')]: { width: '50%', height: 'calc(100% / 3)', top: '0', right: '0', } 
  },
  player4layout11: {
    [theme.breakpoints.up('md')]: { width: '50%', height: 'calc(100% / 3)', top: 'calc(100% / 3)', right: '0', } 
  },
  player5layout11: {
    [theme.breakpoints.up('md')]: { width: '50%', height: 'calc(100% / 3)', bottom: '0', right: '0', } 
  }
    
})

export default styles;