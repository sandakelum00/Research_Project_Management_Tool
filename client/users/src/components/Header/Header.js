import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/studentAction";
import {} from "../../actions/studentAction";

const Header = () => {
  const history = useNavigate();

  const dispatch = useDispatch();

  const studentLogin = useSelector((state) => state.studentLogin);
  const { userInfo } = studentLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Nav className="ml-left">
          <Navbar.Brand>
            <Link to="/">Project Management Tool</Link>
          </Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userInfo ? (
            <Nav className="ml-auto">
              <Nav.Link href="/mytasks">My tasks</Nav.Link>
              <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav  className="ml-auto">
              {" "}
              <Nav.Link style={{marginLeft:"1000px"}} href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
