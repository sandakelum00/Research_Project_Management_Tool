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
    <Navbar >
      <Container>
        <p>
          <a href="/">
            {" "}
            <img src="/images/logo.png" href="/" alt="logo" />{" "}
          </a>
        </p>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userInfo ? (
            <Nav className="ml-auto">
              <Nav.Link href="/homeStudent">My tasks</Nav.Link>
              <NavDropdown title={userInfo?.fullName} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              {" "}
              <Nav.Link style={{ marginLeft: "1000px" }} href="/loginStudent">
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
