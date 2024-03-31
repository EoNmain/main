//BoardListNav.jsx
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function BoardListNav() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Link to="/boardlist/gallery" className="nav-link">
        Gallery
      </Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
    </Nav>
  );
}

export default BoardListNav;
