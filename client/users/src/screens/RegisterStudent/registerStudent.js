import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/studentAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen"
import "./registerStudent.css"

const RegisterStudent = () => {
    const history = useNavigate();
    const [fullName, setFullName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
  
    const dispatch = useDispatch();

    const studentRegister = useSelector((state) => state.studentRegister);

    const { loading, error, userInfo } = studentRegister;

    useEffect(() => {
        if (userInfo) {
          history("/loginStudent");
        }
      }, [history, userInfo]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      if (password !== confirmpassword) {
        setMessage("Passwords does not match");
      } else {
        dispatch(register(fullName, studentId, email, password));
      }
    };

    return (
          <div className="registerContainer">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="name"
                  value={fullName}
                  placeholder="Enter name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicStudentId">
                <Form.Label>Studen ID</Form.Label>
                <Form.Control
                  type="name"
                  value={studentId}
                  placeholder="Enter student reg no"
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Form.Group>
    
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  minLength={3}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmpassword}
                  minLength={3}
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
    
              <div className="btn-reg">
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="btn btn-outline-primary"
                >
                  Register
                </Button>
              </div>
            </Form>
          </div>
      );
    };

export default RegisterStudent;