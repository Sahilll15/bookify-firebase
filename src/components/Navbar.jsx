import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


const NavbarComponent = () => {
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">BookBitGo</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link ><NavLink  style={{textDecoration:'none',color:'grey'}} to={'/'}>Home</NavLink></Nav.Link>
          <Nav.Link  ><NavLink  style={{textDecoration:'none',color:'grey'}} to={'/book/list'}>Add Books</NavLink></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  

    
  </>
   )
}

export default NavbarComponent;