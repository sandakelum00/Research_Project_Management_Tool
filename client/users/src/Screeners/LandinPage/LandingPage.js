import React from 'react';
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import MainScreen from '../MainPage/MainScreen';
import "./LandingPage.css";

const LandingPage = () => {
  // const navigate = useNavigate();
  // // const staffRegister = useSelector((state) => state.staffRegister);
  // // const { staffInfo } = staffRegister;
  // const staffInfo = localStorage.getItem("staffInfo");

  // // useEffect(() => {
  // //   if (!staffInfo) {
  // //      navigate("/");
     
  // //   }
  // // }, [history, staffInfo]);
  return (
    <MainScreen title="User Login">
      <div className="main1">
        <Container>
          <Row>
            <div className="buttonContainer1">
              <a href="/supervisor">
                <Button
                  size="lg"
                  className="landingbutton1"
                  variant="outline-primary"
                >
                  Supervisor/Co-Supervisor
                </Button>
              </a>

              <a href="/pannel">
                <Button size="lg" className="landingbutton1">
                  Pannel Member
                </Button>
              </a>
            </div>
          </Row>
        </Container>
      </div>
    </MainScreen>
  );
}

export default LandingPage;