import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/studentAction";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./studentProfile.css";

const ProfileScreen = ({ location, history }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const dispatch = useDispatch();
  
    const studentLogin = useSelector((state) => state.studentLogin);
    const { userInfo } = studentLogin;
  
    const studentUpdate = useSelector((state) => state.studentUpdate);
    const { loading, error, success } = studentUpdate;
  
    useEffect(() => {
      if (!userInfo) {
        history.push("/");
      } else {
        setFullName(userInfo.fullName);
        setEmail(userInfo.email);
      }
    }, [history, userInfo]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      if (password === confirmPassword)
        dispatch(updateProfile({ fullName, email, password }));
    };
  
    return (
      <MainScreen title="EDIT PROFILE">
        <div>
          <Row className="profileContainer">
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Updated Successfully
                  </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="name">
                  <Form.Label>
                    <b>Full Name</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>
                    <b>Email Address</b>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>
                    <b>Password</b>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>
                    <b>Confirm Password</b>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{" "}
                <div className="btns">
                  <Button
                    className="btn btn-outline-primary"
                    variant="outline-primary"
                    type="submit"
                    varient="primary"
                  >
                    Update
                  </Button>{" "}
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </MainScreen>
    );
  };
  
  export default ProfileScreen;
  