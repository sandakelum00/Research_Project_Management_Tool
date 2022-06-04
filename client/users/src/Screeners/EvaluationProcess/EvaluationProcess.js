import React from 'react'
// import MainScreen from '../MainPage/MainScreen';
import {Button,Row,Col} from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import Sidebar from "../../Components/Sidebar";


const EvaluationProcess = () => {
  return (
    <div>
      <Row>
        <Col>
          <Sidebar />;
        </Col>
        <Col md={8} className="home">
          <br></br>
          <h1 className="home1">Evaluation Process</h1>
          <hr></hr>
          <h4 className="subtitle">Supervisor/Co-Supervisor Dashboard</h4>
          <br></br>
          <h5>
            This is the official page for the instructors to do all evaluation
            processes
          </h5>
          <div>
            <br></br>
            <br></br>
            <h5>See the student submissions</h5>
            <Link to="/docList">
              <Button className="button">Student Submissions</Button>
            </Link>

            <br></br>
            <h5>See the Marking Schemes</h5>
            <Link to="/markingschemes">
              <Button className="button">Marking Schemes</Button>
            </Link>

            <br></br>
            <h5>Create the Marking Schemes</h5>
            <Link to="/markslist">
              <Button className="button">Marks Report</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EvaluationProcess;