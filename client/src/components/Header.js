import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default (props) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">FastFood Guru</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="#" onSelect={props.signIn}>Sign In</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
