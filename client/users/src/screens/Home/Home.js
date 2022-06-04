import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import "./Home.css";

const Home = (history) => {
  const navigate = useNavigate();

  const studentLogin = useSelector((state) => state.studentLogin);

  const { userInfo } = studentLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [history, userInfo]);

  return (
    <div>
      <div>
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col xs={6} md={10}>
            <div className="content">
              <h1>Welcome to Research Project Managament Tool</h1>
              <img src="images/rp.jpg" style={{ marginTop: "20px" }} />
              <br />
              <br />
              <h3>Steps to follow</h3>
              <br />
              <ul>
                <li>Select a research field that you are interested in.</li>
                <li>Come up with a suitable research idea.</li>
                <li>Find the right supervisor.</li>
                <li>
                  Prepare a project proposal before you meet with a supervisor.
                </li>
                <li>Prepare a project timeline.</li>
                <li>Start the research project.</li>
              </ul>
              <div className="cards">
                {
                  <>
                    {["Light"].map((variant) => (
                      <Card
                        bg={variant.toLowerCase()}
                        key={variant}
                        text={
                          variant.toLowerCase() === "light" ? "dark" : "white"
                        }
                        style={{ width: "18rem" }}
                        className="mb-2"
                      >
                        <Card.Header>Sample Templates</Card.Header>
                        <Card.Body>
                          <Card.Title>{variant} Card Title </Card.Title>
                          <Card.Text>
                            No idea how to start? Try the sample templates.
                            <br />
                            <Button>Templates</Button>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </>
                }
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
