import React, { useState, useEffect } from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router-dom";

const EditStudent = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    students,
    editStudentId,
    editStudent,
  } = useAppContext();

  useEffect(() => {
    if (!isEditing) {
      navigate("/students");
    }
  }, [isEditing, navigate]);

  const student = students.find((student) => student._id === editStudentId);

  const [fullName, setFullName] = useState(isEditing && student.fullName);
  const [studentId, setStudentId] = useState(isEditing && student.studentId);
  const [email, setEmail] = useState(isEditing && student.email);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !studentId || !email) {
      displayAlert();
      return;
    }

    editStudent({
      editStudentId,
      fullName,
      studentId,
      email,
    });

    setTimeout(() => {
      navigate("/students");
    }, 3000);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>update student</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          {/* student name */}
          <FormRow
            type="text"
            name="fullName"
            labelText="full name"
            value={fullName}
            handleChange={(e) => setFullName(e.target.value)}
          />

          {/* student Id*/}
          <FormRow
            type="text"
            labelText="Student ID"
            name="studentId"
            value={studentId}
            handleChange={(e) => setStudentId(e.target.value)}
          />

          {/* email */}
          <FormRow
            type="email"
            labelText="student email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <button
            style={{ marginTop: "10px" }}
            className="btn btn-block "
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditStudent;
