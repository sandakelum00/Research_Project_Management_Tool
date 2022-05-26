import React from "react";
import { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = ({ history }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("./mytasks");
    }
  }, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h6 className="title">Welcome to To-Do List Application</h6>
              <p className="subtitle">Save all your tasks</p>
            </div>
          
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
