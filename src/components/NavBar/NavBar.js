import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../redux/User/user-operations";
export default function NavBar() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const HandleClick = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">ContactsList-V3</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="">
                <NavLink to="/add-form">Form-Creator</NavLink>
              </Nav.Link>
              <Nav.Link href="">
                <NavLink to="/contacts">Contacts</NavLink>
              </Nav.Link>
              {!isLoggedIn && (
                <NavDropdown title="Log/Reg" id="basic-nav-dropdown">
                  <NavDropdown.Item href="">
                    <NavLink to="/registration">Register</NavLink>
                  </NavDropdown.Item>

                  <NavDropdown.Item href="">
                    <NavLink to="/login">Login</NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            {isLoggedIn && (
              <Nav>
                <Nav.Link href="">Hi, {user.name}!</Nav.Link>
                <Button onClick={HandleClick} variant="primary">
                  Logout
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
