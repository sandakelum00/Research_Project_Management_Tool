import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./createTeam.css";
import { createGroupAction } from "../../actions/groupAction";

function CreateTeam ({history}) {
  const [teamName, setTeamName] = useState("");
  const [s1sid, setS1Sid] = useState("");
  const [s1email, setS1Email] = useState("");
  const [s2sid, setS2Sid] = useState("");
  const [s2email, setS2Email] = useState("");
  const [s3sid, setS3Sid] = useState("");
  const [s3email, setS3Email] = useState("");
  const [s4sid, setS4Sid] = useState("");
  const [s4email, setS4Email] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const groupCreate = useSelector((state) => state.groupCreate);
  const { loading, error, group } = groupCreate;

  const resetHandler = () => {
    setTeamName("");
    setS1Sid("");
    setS1Email("");
    setS2Sid("");
    setS2Email("");
    setS3Sid("");
    setS3Email("");
    setS4Sid("");
    setS4Email("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!teamName || !s1sid || !s2sid || !s3sid || !s4sid) return;
    dispatch(createGroupAction(teamName, s1sid, s1email, s2sid, s2email, s3sid, s3email, s4sid, s4email));

    resetHandler();
    navigate("/team");
  };



  return (
    <div>
    <Row>
      <Col>
      <Sidebar/>
      </Col>
      <Col xs={6} md={10}>
          <div className="content">
            <h4>*Check your details carefully before submitting. Once you have submitted this form, you are not allowed to change your group details. So check your registration numbers and emails. It is highly recommended to use the mail that provided by the SLIIT.</h4>
            <Form onSubmit={submitHandler} >
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading size={50} />}
              <Form.Group className="mb-3" controlId="formBasicStudentId">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Suggest a unique name for your team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Team Leader Student No.</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="ITxxxxxxxx"
                  value={s1sid}
                  onChange={(e) => setS1Sid(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Team Leader's email</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter primary email"
                  value={s1email}
                  onChange={(e) => setS1Email(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 1 Student No.</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="ITxxxxxxxx"
                  value={s2sid}
                  onChange={(e) => setS2Sid(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 1 email</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter primary email"
                  value={s2email}
                  onChange={(e) => setS2Email(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 2 Student No.</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="ITxxxxxxxx"
                  value={s3sid}
                  onChange={(e) => setS3Sid(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 2 email</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter primary email"
                  value={s3email}
                  onChange={(e) => setS3Email(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Memeber 3 Student No.</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="ITxxxxxxxx"
                  value={s4sid}
                  onChange={(e) => setS4Sid(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Member 3 email</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter primary email"
                  value={s4email}
                  onChange={(e) => setS4Email(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <div className="btn-log">
                {" "}
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="btn btn-outline-primary"
                >
                  Submit
                </Button>
              </div>
             
            </Form>
        </div>
        </Col>
    </Row>
    </div>
  );
};

export default CreateTeam;