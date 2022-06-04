import React, { useEffect } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Nav,
  Navbar,
 Container,
  NavDropdown,
} from "react-bootstrap";
import MainScreen from "../MainPage/MainScreen";
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
    <div>
      <br></br>
      <MainScreen title={`Welcome ${staffInfo.username}....`}>
        <div>
          <h4 className="subtitle">Supervisor/Co-Supervisor Dashboard</h4>
          <br></br>
          <br></br>
          <Sidebar/>
          <Link to="/topicacceptance">
            <Button className="button">Topic Acceptance</Button>
          </Link>

          <Link to="/chatwithgroups">
            <Button className="button">Chat with the groups</Button>
          </Link>

          <Link to="/evaluation">
            <Button className="button">Evaluations</Button>
          </Link>
        </div>
      </MainScreen>
    </div>
  );
}

export default SupervisorDashboard