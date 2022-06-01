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
            <h1>Manage your team details</h1>
          </div>
          <div className="btns">
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
        </Col>
      </Row>
    </div>
  );
};

export default Team;
