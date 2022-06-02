import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./team.css";

const Team = (history) => {
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
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col xs={6} md={10}>
          <div className="content">
            <h1>Manage your team details</h1><br/><br/>
            <h3>Before you create your research group, consider the points given below.</h3><br/>
            <ul>
              <li>You need four members to create a research group.</li>
              <li>Then you should come up with a good idea for your research.</li>
              <li>Your research title should be acceptable to the supervisor. So try to be creative.</li>
              <li>You should find a supervisor and a co-supervisor who have an interest in the same field as your research project.</li>
              <li>After you submit the document, you can check the teams page to check your topic acceptance status.</li>
              <li>If your topic is accepted, the status will be changed to "Accepted" and the group leader will receive an email.</li>
            </ul><br/><br/>
            <h3>Good luck with your research!</h3>
            <div className="btns">
              <div>
              <Link to="/createTeam">
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="btn btn-outline-primary"
                >
                  Create Team
                </Button>
              </Link>
              </div>
              <div>
              <Link to="/createTeam">
                <Button
                style={{ marginTop: "50px", marginLeft:"-8px"}}
                  type="submit"
                  variant="outline-primary"
                  className="btn btn-outline-primary"
                >
                  Submit a topic
                </Button>
              </Link>
              </div>
              <div>
              <Link to="/createTeam">
                <Button
                style={{ marginTop: "50px", marginLeft:"-5px" }}
                  type="submit"
                  variant="outline-primary"
                  className="btn btn-outline-primary"
                >
                  Check Status
                </Button>
              </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Team;
