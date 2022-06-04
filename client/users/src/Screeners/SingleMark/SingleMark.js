import React from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import MainScreen from '../MainPage/MainScreen';
import Loading from '../../Components/Loading';
import ErrorMessage from '../../Components/ErrorMessage';
import {deleteMarkAction,updateMarkAction} from "../../Actions/markAction"

function SingleMark({ match, history }) {

  
     const [year, setyear] = useState("");
     const [groupid, setgroupid] = useState("");
     const [mark, setmark] = useState("");

     const navigate = useNavigate();
     const params = useParams();
     const dispatch = useDispatch();

     const topicUpdate = useSelector((state) => state.topicUpdate);
     const { loading, error } = topicUpdate;

     const deleteHandler = (id) => {
       if (window.confirm("Are you want to delete?")) {
         dispatch(deleteMarkAction(id));
       }
       navigate("/markslist");
     };

     useEffect(() => {
       const fetching = async () => {
         const { data } = await axios.get(
           `http://localhost:5000/api/marks/${params.id}`
         );

         setyear(data.year);
         setgroupid(data.groupid);
         setmark(data.mark);
       };
       fetching();
     }, [params.id]);

     const resetHandler = () => {
       setyear("");
       setgroupid("");
       setmark("");
     };

     const updateHandler = (e) => {
       e.preventDefault();
       dispatch(updateMarkAction(params.id, year, groupid, mark));
       if (!year || !groupid || !mark) return;

       resetHandler();
       navigate("/markslist");
     };
  return (
    <MainScreen title="Update the  Marks">
      <Card>
        <Card.Header>
          <b>Update Marks</b>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}

            <Form.Group className="mb-3" controlId="formBasicYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter the academic year"
                value={year}
                onChange={(e) => setyear(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGroupId">
              <Form.Label>Group Id</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter the group id"
                value={groupid}
                onChange={(e) => setgroupid(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMark">
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter the marks"
                value={mark}
                onChange={(e) => setmark(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <div className="btns">
              <Button type="submit" variant="primary">
                Update My Task
              </Button>
              <Button
                onClick={() => deleteHandler(params.id)}
                varient="danger"
                className="mx-2"
              >
                Delete the task
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

export default SingleMark