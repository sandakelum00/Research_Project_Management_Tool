import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./createSubmission.css";
import { createSubmissionAction } from "../../actions/submissionAction";

function CreateSubmission({ history }) {
  const [LeaderNo, setLeaderNo] = useState("");
  const [title, setTitle] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [cosupervisor, setCosupervisor] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submissionCreate = useSelector((state) => state.submissionCreate);
  const { loading, error, submission } = submissionCreate;

  const resetHandler = () => {
    setTitle("");
    setSupervisor("");
    setCosupervisor("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!LeaderNo || !title || !supervisor || !cosupervisor) return;
    dispatch(createSubmissionAction(LeaderNo, title, supervisor, cosupervisor));

    resetHandler();
    navigate("/");
  };

  return (
    <div>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col xs={6} md={10}>
          <div className="content">
            <h4>
              *Check your details carefully before submitting. Once you have
              submitted this form, you are not allowed to change your group
              details. So check your registration numbers and emails. It is
              highly recommended to use the mail that provided by the SLIIT.
            </h4>
            <Form onSubmit={submitHandler}>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {loading && <Loading size={50} />}
              <Form.Group className="mb-3" controlId="formBasicStudentId">
                <Form.Label>Group Leader IT number</Form.Label>
                <Form.Control
                  type="name"
                  placeholder=""
                  value={LeaderNo}
                  onChange={(e) => setLeaderNo(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicStudentId">
                <Form.Label>Research Title</Form.Label>
                <Form.Control
                  type="name"
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Supervisor Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder=""
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Co-supervisor Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder=""
                  value={cosupervisor}
                  onChange={(e) => setCosupervisor(e.target.value)}
                />
              </Form.Group>

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
}

export default CreateSubmission;
