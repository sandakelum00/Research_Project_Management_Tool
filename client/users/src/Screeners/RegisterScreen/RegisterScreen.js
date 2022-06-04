import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Button,Form} from 'react-bootstrap';
import { register } from "../../Actions/staffAction";
import Loading from '../../Components/Loading';
import ErrorMessage from '../../Components/ErrorMessage';
import {useDispatch, useSelector} from 'react-redux';
import "./RegisterScreen.css";
import MainScreen from '../MainPage/MainScreen';
// import LandingPage from '../MainPage/LandingPage';

  
  const RegisterScreen = () => {

    const history = useNavigate();

    const [username, setusername] = useState("");
    const [useremail, setuseremail] = useState("");
    const [userposition, setuserposition] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const [researchInterestingAreas ,setresearchInterestingAreas] = useState("");
    const [department, setdepartment]= useState("");
    const [confirmpassword, setconfirmpassword] = useState("");  
    const [message, setmessage] = useState(null);


    const dispatch = useDispatch();

    const staffRegister = useSelector((state) => state.staffRegister);
    const { loading, error, staffInfo } = staffRegister;

    useEffect(() => {
      if (staffInfo) {
        history("/landPage");
      }
    }, [history, staffInfo]);

    const submitHandler = async (e) =>{
      e.preventDefault();

      if(userpassword !== confirmpassword){
        setmessage("Error! Passwords are not matching");
      }else{
        dispatch(
          register(
            username,
            useremail,
            userposition,
            userpassword,
            researchInterestingAreas,
            department
          )
        );
      }
    };


    return (
      <MainScreen title="User Register">
        <div className="registerContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                required
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter email"
                value={useremail}
                onChange={(e) => setuseremail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPosition">
              <Form.Label>
                Enter Your Position (Supervisor/Co-Supervisor/Pannel Member)
              </Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter your position"
                value={userposition}
                onChange={(e) => setuserposition(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Password"
                value={userpassword}
                onChange={(e) => setuserpassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDepartment">
              <Form.Label>Enter Your Department (CS/SE/BS)</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter your department"
                value={department}
                onChange={(e) => setdepartment(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicInterestingAreas">
              <Form.Label>Enter Your Research interesting areas (ML/AI/IP)</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter your research interesting areas"
                value={researchInterestingAreas}
                onChange={(e) => setresearchInterestingAreas(e.target.value)}
              />
            </Form.Group>
            <div className="btn-reg">
              <Button type="submit" variant="primary">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </MainScreen>
    );
  }
  
  export default RegisterScreen;