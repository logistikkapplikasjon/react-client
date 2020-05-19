import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const LoginRegLink = () => {
  return (
    <NavItem eventkey={1}>
      <NavLink href='/login'>
        <FontAwesomeIcon icon={faSignInAlt} /> Logg inn/ Register
      </NavLink>
    </NavItem>
  );
};

export default LoginRegLink;
