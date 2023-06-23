import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';


const NavbarComponent = () => {
  const navigate=useNavigate();

  const Firebase=useFirebase();
  const isLog=Firebase.isLoggedin;
  const logout=()=>{
    Firebase.logout();
    
    navigate('/login')
    window.location.reload();

  }
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">BookBitGo</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link ><NavLink  style={{textDecoration:'none',color:'grey'}} to={'/'}>Home</NavLink></Nav.Link>
          <Nav.Link  ><NavLink  style={{textDecoration:'none',color:'grey'}} to={'/book/list'}>Add Books</NavLink></Nav.Link>
          <Nav.Link  ><NavLink  style={{textDecoration:'none',color:'grey'}} to={'/Orders'}>Orders</NavLink></Nav.Link>
          {isLog ?<button style={{padding:'5px',marginLeft:'10px',height:'40px'}} onClick={logout} className='btn btn-outline-danger' ><NavLink style={{textDecoration:'none',color:'white'}}>Logout</NavLink></button> :null }
        </Nav>
      </Container>
    </Navbar>
  

    
  </>
   )
}

export default NavbarComponent;