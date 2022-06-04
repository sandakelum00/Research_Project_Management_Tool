import React from 'react'
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./CoverPage.css";
const CoverPage = ({history}) => {
    const navigate = useNavigate();

    useEffect(()=>{
        const staffInfo = localStorage.getItem("staffInfo");
    
    if(staffInfo) {
      navigate("/landPage");
    }


}, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <h1 className="title">Welcome To Research Pro</h1>
            <p className="subtitle">All your research works in a one place..</p>
          </div>

          <div className="buttonContainer">
            <a href="/landPage">
              <Button variant="outline-primary" className="landingbutton">
                Login
              </Button>
            </a>

            <a href="/registerStaff">
              <Button className="landingbutton">Register</Button>
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default CoverPage;