import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const createTeam = (history) => {
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
          <div className="container">
            <Form >
              <Form.Group className="mb-3" controlId="formBasicStudentId">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter student ID"
                  
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Team Leader Student No.</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Team Leader's email</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 1 Student No.</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 1 email</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 2 Student No.</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 2 email</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Memeber 3 Student No.</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 3 email</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Memeber 4 Student No.</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 4 email</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="btn-log">
                {" "}
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="btn btn-outline-primary"
                >
                  Submit
                </Button>
              </div>
             
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default createTeam;