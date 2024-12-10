import { Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

function Navigation() {
  return (
    <Container className="shadow mt-2 px-0" expand="lg">
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
        <Nav.Link as={NavLink} to="/" eventKey="research" className="custom-tab">Research</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link as={NavLink} to="/resume" eventKey="resume" className="custom-tab">Resume</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link as={NavLink} to="/publications" eventKey="publications" className="custom-tab">Publications</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link as={NavLink} to="/contact" eventKey="contact" className="custom-tab">Contact</Nav.Link>
      </Nav.Item>
    </Nav>
    </Container>
  );
}

export default Navigation;