import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import HomeIcon from 'material-ui-icons/Home';
import RestoreIcon from 'material-ui-icons/Restore';


class SideNav extends React.Component {

  // constructor(props) {
  //   super(props);
  //   // console.log('SideNav props', props);
  // }

  render() {

    return (
      <div className="side-nav-container">
        <Link to='/'>
          <Button aria-label="home">
            <HomeIcon />
          </Button>
        </Link>
        <Link to='/recents'>
          <Button aria-label="restore">
            <RestoreIcon />
          </Button>
        </Link>
        <Link to='/tw/grimmmmz/anthony_kongphan'>
          <Button aria-label="restore">
            <RestoreIcon />
          </Button>
        </Link>

      </div>
    );
  }
}

export default SideNav;