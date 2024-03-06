import Nav from 'react-bootstrap/Nav';

function BoardListNav() {
  return (
    <button className="mt-20">
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Active</Nav.Link>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav>
    </button>
  );
}

export default BoardListNav;
