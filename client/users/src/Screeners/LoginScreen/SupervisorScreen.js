import React, { useState, useEffect } from "react";
import MainScreen from '../MainPage/MainScreen';
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Actions/staffAction";
import Loading from '../../Components/Loading';
import ErrorMessage from '../../Components/ErrorMessage';


const SupervisorScreen = () => {
  const history = useNavigate();

  const [useremail, setuseremail]= useState("");
  const [userpassword, setuserpassword] = useState("");

  const dispatch = useDispatch();
  const staffLogin = useSelector((state)=>state.staffLogin);
  const {loading, error, staffInfo} = staffLogin;

  // useEffect(()=>{
  //   if(staffInfo){
   
  //   history("/supervisorDashboard");
  //   }
  // }, [staffInfo]);

  // // if(staffInfo){
  // //    <Link to="/supervisorDashboard"></Link>;
  // // }

  const submitHandler = async (e) => {
    e.preventDefault();
    if(staffInfo){
      window.location.assign("/supervisorDashboard");
    }

    dispatch(login(useremail,userpassword));
  };
  return (
    <div>
    <br></br>
      <MainScreen title="LOGIN">
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={useremail}
                onChange={(e) => setuseremail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={userpassword}
                onChange={(e) => setuserpassword(e.target.value)}
              />
            </Form.Group>

            <div>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>

            <Row className="py-3">
              <Col>
                Are you a new user ?{" "}
                <Link className="hlink" to="/registerStaff">
                  Register Today
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </MainScreen>
    </div>
  );
}

export default SupervisorScreen;