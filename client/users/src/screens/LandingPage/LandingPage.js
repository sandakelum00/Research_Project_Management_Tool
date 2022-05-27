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
              <h6 className="title">Welcome to Research Project Management Tool</h6>
              {/* <p className="subtitle">Save all your tasks</p> */}
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button
                  size="medium"
                  variant="outline-primary"
                  className="btn btn-outline-primary"
                >
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  variant="outline-primary"
                  size="medium"
                  className="btn btn-outline-primary"
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
