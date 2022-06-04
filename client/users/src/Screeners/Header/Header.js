import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '../../Actions/staffAction';


const Header = () => {
    const history = useNavigate();

    const dispatch = useDispatch();
    const staffLogin = useSelector((state) => state.staffLogin);
    const {  staffInfo } = staffLogin;

    const logoutHandler=()=>{
         dispatch(logout());
         history.push("/");
    }
  return (
    <Navbar>
      <Container>
        <img src="/images/logo.png" alt="logo" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {staffInfo ? (
            <Nav className="m-auto">
              <NavDropdown title={staffInfo?.username} id="basic-nav-dropdown">
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={logoutHandler}>
                  Log out
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile">
                  Profile
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              {" "}
              <Nav.Link href="/supervisor">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header