import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import specific icons


const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Link href="#" disabled>
              &copy; {new Date().getFullYear()} Diego Alducin. All rights reserved.
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto social-icons">
            <Nav.Link href="https://www.linkedin.com/in/alducin-diego/" target="_blank">
              <FaLinkedin size={24} color="white" />
            </Nav.Link>
            <Nav.Link href="https://github.com/datdiego" target="_blank">
              <FaGithub size={24} color="white" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

