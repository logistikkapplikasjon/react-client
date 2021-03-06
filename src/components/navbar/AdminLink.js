import React from 'react';
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUser,
  faTags,
  faSignOutAlt,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';

const AdminLink = (props) => {
  const { logOut } = props;

  return (
    <>
      <NavItem eventkey={2}>
        <NavLink href='/profile'>
          <FontAwesomeIcon icon={faUser} /> Min profil
        </NavLink>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <FontAwesomeIcon icon={faExchangeAlt} /> Transaksjoner
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <NavLink href='/addremove/add'>Legg til varer</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href='/addremove/subtract'>Ta ut varer</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href='/transactions'>Transaksjoner</NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <FontAwesomeIcon icon={faUsers} /> Brukere
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <NavLink href='/list/user'>Alle brukere</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href='/register/user'>Ny bruker</NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <FontAwesomeIcon icon={faTags} /> Artikler
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <NavLink href='/list/item'>Varer</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href='/register/item'>Ny vare</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href='/list/project'>Prosjekter</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href='/register/project'>Nytt prosjekt</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href='/list/item_type'>Varetyper</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href='/register/item_type'>Ny varetype</NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <NavItem eventkey={5}>
        <NavLink href='/login' onClick={logOut}>
          Logg ut <FontAwesomeIcon icon={faSignOutAlt} />
        </NavLink>
      </NavItem>
    </>
  );
};

export default AdminLink;
