import React from 'react'
import { useEffect } from 'react'
import { Button,Table } from "react-bootstrap";
import MainScreen from "../MainPage/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import {deleteMarkAction,listMarksAction} from "../../Actions/markAction"
import "./MarkList.css";

const MarkList = (history) => {
     const dispatch = useDispatch();
     const navigate = useNavigate(); 

     const markList = useSelector((state) => state.markList);
     const { loading, marks, error } = markList;

     const staffLogin = useSelector((state) => state.staffLogin);
     const { staffInfo } = staffLogin;

     const addMarks = useSelector((state) => state.addMarks);
     const { success: successCreate } = addMarks;

     const markUpdate = useSelector((state) => state.markUpdate);
     const { success: successUpdate } = markUpdate;

     const markDelete = useSelector((state) => state.markDelete);
     const {
       loading: loadingDelete,
       error: errorDelete,
       success: successDelete,
     } = markDelete;

     const deleteHandler = (id) => {
       if (window.confirm("Are you want to delete?")) {
         dispatch(deleteMarkAction(id));
       }
     };


     useEffect(() => {
       dispatch(listMarksAction());

       if (!staffInfo) {
         navigate("/supervisor");
       }
     }, [
       dispatch,
       history,
       staffInfo,
       successCreate,
       successUpdate,
       successDelete,
     ]);

  return (
    <MainScreen title="Mark List">
      <Link to="/marks">
        <Button className="button">Add Marks</Button>
      </Link>

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Year</th>
            <th>Group Id</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {marks?.map((singlemarks) => (
            <tr key={singlemarks._id}>
              <td>{singlemarks.year}</td>
              <td>{singlemarks.groupid}</td>
              <td>{singlemarks.mark}</td>

              <td>
                <Link to={`/singlemark/${singlemarks._id}`}>
                  <Button
                    variant="success"
                    className="mx-2"
                  >
                    Update Mark
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(singlemarks._id)}
                >
                  Delete Task
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainScreen>
  );
  
 
}

export default MarkList