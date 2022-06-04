import React from 'react'
import MainScreen from "../MainPage/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useState } from 'react';
import Loading from "../../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMarkAction } from "../../Actions/markAction";
import ErrorMessage from "../../Components/ErrorMessage";

const MarksUpload = ({history}) => {
    const [year, setyear] = useState("");
    const [groupid, setgroupid] = useState("");
    const [mark, setmark] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addMarks = useSelector((state) => state.addMarks);
    const {loading, error, singlemark} = addMarks;

    console.log(singlemark);
    const resetHandler = () => {
      setyear("");
      setgroupid("");
      setmark("");
    };
    const submitHandler = (e) => {
      e.preventDefault();

      if (!year || !groupid || !mark) return;
      dispatch(addMarkAction(year,groupid,mark));

      resetHandler();
      navigate("/markslist");
    };
  return (
    <MainScreen title='Add Mark'>
      <Card>
        <Card.Header>
          <b>Add Mark</b>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter the academic year"
                value={year}
                onChange={(e) => setyear(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Group Id</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter the group id"
                rows={4}
                value={groupid}
                onChange={(e) => setgroupid(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
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
                Upload the marks
              </Button>
              <Button onClick={resetHandler} varient="danger" className="mx-2">
                Reset the Fields
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

export default MarksUpload