import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Strings from 'locale/Strings';

const MenuBar = ({user}) => {
  const {firstname = '', lastname = ''} = user || {};
  return (
    <Navbar variant="light" bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="#">{Strings.theaterName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="#shows">{Strings.shows}</Nav.Link>
          <Nav.Link href="#tickets">{Strings.tickets}</Nav.Link>
          <Nav.Link href="#visit">{Strings.visit}</Nav.Link>
          <Nav.Link href="#about">{Strings.about}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="#login">
            {user.id ? (
              <div>
                {'Signed in as '}
                <b>
                  {firstname} {lastname}
                </b>
              </div>
            ) : (
              'Login'
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuBar;
