import React from 'react'
import Sidebar from '../../Components/Sidebar'
import { useEffect } from "react";
import { Button, Table,Row,Col } from "react-bootstrap";
import MainScreen from "../MainPage/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import { listTopicAction} from "../../Actions/topicAction";

const TopicAcceptance = (history ) => {

   const dispatch = useDispatch();
   const navigate = useNavigate(); 

      const topicList = useSelector((state) => state.topicList);
      const { loading, groupsubmissions, error } = topicList;

      const topicUpdate = useSelector((state) => state.topicUpdate);
      const { success: successUpdate } = topicUpdate;


      useEffect(() => {
        dispatch(listTopicAction());
      }, [
        dispatch,
        history,
        successUpdate,
      ]);
  return (
    <div>
      <Row>
        <Col>
          <Sidebar />
        </Col>

        <MainScreen title="Mark List">
          <Col>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Leader No</th>
                  <th>Title</th>
                  <th>Supervisor</th>
                  <th>Co-Supervisor</th>
                  <th>Status</th>
                  <th>Panel Member</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groupsubmissions?.map((groupsubmission) => (
                  <tr key={groupsubmission._id}>
                    <td>{groupsubmission.LeaderNo}</td>
                    <td>{groupsubmission.title}</td>
                    <td>{groupsubmission.supervisor}</td>
                    <td>{groupsubmission.cosupervisor}</td>
                    <td>{groupsubmission.status}</td>
                    <td>{groupsubmission.panelMember}</td>
                    <td>
                      <Link to={`/singletopic/${groupsubmission._id}`}>
                        <Button variant="success" className="mx-2">
                          Update The topic
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </MainScreen>
      </Row>
    </div>
  );
};

export default TopicAcceptance