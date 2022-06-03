import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Student from "././Student";
import Wrapper from "../assets/wrappers/DocsContainer";
import { Table } from "react-bootstrap";
// import PageBtnContainer from "./PageBtnContainer";

const StudentContainer = () => {
  const {
    getAllStudents,
    students,
    isLoading,
    page,
    totalStudents,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  useEffect(() => {
    getAllStudents();
  }, [search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (students.length === 0) {
    return (
      <Wrapper>
        <h2>No students to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalStudents} student {students.length > 1 && "s"} found
      </h5>

      <div className="docs">
        <Table bordered hover size="sm" className="table text-center">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Student Id</th>
              <th>Student Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return <Student key={student._id} {...student} />;
            })}
          </tbody>
        </Table>
      </div>
    </Wrapper>
  );
};

export default StudentContainer;
