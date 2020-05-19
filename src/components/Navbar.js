import React from 'react';
import { withRouter } from 'react-router-dom';
import AdminLink from './navbar/AdminLink';
import LoginRegLink from './navbar/LoginRegLink';
import UserLink from './navbar/UserLink';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

/**
 * Component for showing the Navbar. Uses the current users user level to show either an admin navbar or an user navbar. If the user is not logged in, a default navbar will show.
 * Takes in user level and functions as props from App Container
 * @component
 */
const NavigationBar = (props) => {
  const { userLevel, toggle, isOpen, logOut } = props;
  return (
    <Navbar color='light' light expand='md' key='adminlink'>
      <NavbarBrand href='/'>
        <FontAwesomeIcon icon={faHome} /> Hjem
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='ml-auto' navbar>
          {userLevel ? (
            [
              userLevel === 'Admin' ? (
                <AdminLink
                  key='admin'
                  toggle={toggle}
                  logOut={logOut}
                  isOpen={isOpen}
                />
              ) : (
                <UserLink
                  key='user'
                  toggle={toggle}
                  logOut={logOut}
                  isOpen={isOpen}
                />
              ),
            ]
          ) : (
            <LoginRegLink key='reg' />
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default withRouter(NavigationBar);
