import React from "react"; 
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/studentAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import "./loginStudent.css"

const LoginStudent = () => {
    const history = useNavigate();
  
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
  
    const dispatch = useDispatch();
  
    const studentLogin = useSelector((state) => state.studentLogin);
    const { loading, error, userInfo } = studentLogin;
  
    useEffect(() => {
      if (userInfo) {
        history("/homeStudent");
      }
    }, [history, userInfo]);
  
    const submitHandler = async (e) => {
      e.preventDefault();

      // if(userInfo){

      //   window.location.assign("/homeStudent");
  
      // }
  
      dispatch(login(studentId, password));
    };

    return (
      <div>
        <MainScreen title="LOGIN">
          <div className="container">
            {error && <ErrorMessage variant="danger"> {error}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicStudentId">
                <Form.Label>Student Id</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
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
                  Login
                </Button>
              </div>
              <Row className="py-3">
                <Col>
                  New User ?{" "}
                  <Link className="hlink" to="/registerStudent">
                    Register Here
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col className="hlink">
                  {" "}
                  <Link to="">Forgot Password</Link>
                </Col>
              </Row>
            </Form>
          </div>
        </MainScreen>
        </div>
      );
    };
    
    export default LoginStudent;