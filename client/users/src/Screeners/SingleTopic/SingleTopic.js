import React from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import MainScreen from "../MainPage/MainScreen";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import {updateTopicAction } from "../../Actions/topicAction"

function SingleTopic({ match, history }) {

  const [LeaderNo, setLeaderNo] = useState("");
  const [title, settitle] = useState("");
  const [status, setstatus] = useState("");
  const [supervisor, setsupervisor] = useState("");
  const [cosupervisor, setcosupervisor] = useState("");
  const [panelMember, setpannelmember] = useState("");

  const status_array= ["Pending","Accept","Reject"]

     const navigate = useNavigate();
     const params = useParams();
     const dispatch = useDispatch();

     const markUpdate = useSelector((state) => state.markUpdate);
     const { loading, error } = markUpdate;

     useEffect(() => {
       const fetching = async () => {
         const { data } = await axios.get(
           `http://localhost:5000/api/topic/${params.id}`
         );

         setLeaderNo(data.LeaderNo);
         settitle(data.title);
         setstatus(data.status);
         setsupervisor(data.supervisor);
         setcosupervisor(data.cosupervisor);
         setpannelmember(data.panelMember);
       };
       fetching();
     }, [params.id]);

     const resetHandler = () => {
       setstatus("");
     };

     const updateHandler = (e) => {
       e.preventDefault();
       dispatch(updateTopicAction(params.id, status));
       if (!status ) return;

       resetHandler();
       navigate("/topicacceptance");
     };
  return (
    <MainScreen title="Update Topic Status">
      <Card>
        <Card.Header>
          <b>Update Topic Status</b>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
            <Form.Group className="mb-3" controlId="formBasicLeaderNo">
              <Form.Label>Leader No</Form.Label>
              <Form.Control
                type="text"
                disabled
                readOnly
                value={LeaderNo}
                onChange={(e) => setLeaderNo(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                disabled
                readOnly
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Status</Form.Label>
              <div className="form-row">
                <select
                  name={status}
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                  className="form-select"
                >
                  {status_array.map((itemValue, index) => {
                    return (
                      <option key={index} value={itemValue}>
                        {itemValue}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSupervisor">
              <Form.Label>Supervisor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Leader No"
                disabled
                readOnly
                value={supervisor}
                onChange={(e) => setsupervisor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCoSupervisor">
              <Form.Label>Co-Supervisor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Leader No"
                disabled
                readOnly
                value={cosupervisor}
                onChange={(e) => setcosupervisor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPannelMember">
              <Form.Label>PanelMember</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Leader No"
                disabled
                readOnly
                value={panelMember}
                onChange={(e) => setpannelmember(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <div className="btns">
              <Button type="submit" variant="primary">
                Update Submission
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleTopic