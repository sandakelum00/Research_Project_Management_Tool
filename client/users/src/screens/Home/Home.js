import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
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
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col xs={6} md={10}>
        <div className="content">
        <h1>Welcome to Research Project Managament Tool</h1>
        </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
