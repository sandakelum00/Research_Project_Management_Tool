import React from 'react'
import MainScreen from '../MainPage/MainScreen';
import {Button} from 'react-bootstrap';
import { Link  } from 'react-router-dom';

const EvaluationProcess = () => {
  return (
    <div>
      <br></br>
      <MainScreen title="Evaluation Process">
        <div>
          <br></br>
          <br></br>
          <Link to="/studentsubmissions">
            <Button className="button">Student Submissions</Button>
          </Link>

          <Link to="/markingschemes">
            <Button className="button">Marking Schemes</Button>
          </Link>

          <Link to="/markslist">
            <Button className="button">Marks Report</Button>
          </Link>
      
        </div>
      </MainScreen>
    </div>
  );
}

export default EvaluationProcess;