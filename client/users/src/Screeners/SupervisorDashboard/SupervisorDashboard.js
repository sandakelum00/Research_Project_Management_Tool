import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
} from "react-bootstrap";
// import MainScreen from "../MainPage/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import "./SupervisorDashboard.css";
import Sidebar from "../../Components/Sidebar";



const SupervisorDashboard = (history) => {
  const navigate = useNavigate();


  const staffLogin = useSelector((state) => state.staffLogin);
  const {staffInfo} = staffLogin;

  useEffect(()=>{
    if(!staffInfo){
      navigate("/");
    }
  },[history,staffInfo])
  return (
    <Row>
      <Col>
        <Sidebar />
      </Col>
      <Col md={8} className="home">
        <br></br>
        <div style={{ justifyContent: "center" }}>
          <h1 className="home1">{`Welcome ${staffInfo.username}....`}</h1>
          <hr></hr>
          <h4 className="subtitle">Supervisor/Co-Supervisor Dashboard</h4>
          <br></br>
          <h5>
            This is the official page for the insturs to do all processes
            regarding studetnt researchers
          </h5>

          <br></br>
          <h5>Accept the research topics</h5>
          <Link to="/topicacceptance">
            <Button className="button">Topic Acceptance</Button>
          </Link>

          <br></br>
          <h5>Chat with the student groups</h5>
          <Link to="/chatwithgroups">
            <Button className="button">Chat with the groups</Button>
          </Link>

          <br></br>
          <h5>Evalute the projects</h5>
          <Link to="/evaluation">
            <Button className="button">Evaluations</Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
}

export default SupervisorDashboard