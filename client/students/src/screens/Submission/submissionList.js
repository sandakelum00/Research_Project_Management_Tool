import React from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button, Card, Row, Table, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubmissionAction,
  listSubmissions,
} from "../../actions/submissionAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Loading";
import "./submissionList.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const MySubmissions = (history) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submissionList = useSelector((state) => state.submissionList);
  const { loading, submissions, error } = submissionList;

  const studentLogin = useSelector((state) => state.studentLogin);
  const { userInfo } = studentLogin;

  const submissionDelete = useSelector((state) => state.submissionDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = submissionDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteSubmissionAction(id));
    }
  };

  useEffect(() => {
    dispatch(listSubmissions());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, history, userInfo, successDelete]);

  return (
   
      <Row>
        <Col>
        <Sidebar/>
        </Col>
        <Col>
        <h2 style={{color:"blue", marginLeft:"-200px", marginBottom:"50px", marginTop:"50px"}}>Submission Details</h2>
        <h4 style={{ marginLeft:"-200px", marginBottom:"50px", marginTop:"50px"}}>*Read carefully before delete records</h4>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        
        {loading && <Loading />}
        {loadingDelete && <Loading />}
       
        {submissions?.map((submission) => (
          <div className="details">
            
            
            <Table striped="columns">
              <tr>
              
                <td>Title</td>
                <th>{submission.title}</th>
               
              </tr>
              <tr>
                <td>Supervisor</td>
                <th>{submission.supervisor}</th>
              </tr>
              <tr>
                <td>Co-supervisor</td>
                <th>{submission.cosupervisor}</th>
              </tr>
              <tr>
                <td>Panel Member</td>
                <th>{submission.panelMember}</th>
              </tr>
              <tr>
                <td>Status</td>
                <th>{submission.status}</th>
              </tr>
              </Table>
              <div>
                   
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(submission._id)}
                    >
                      Delete
                    </Button>
                  </div>
             <hr/>
              <br /><br /><br />
             
          </div>
        ))}
        </Col>
      </Row>
      
      
   
  );
};

export default MySubmissions;
