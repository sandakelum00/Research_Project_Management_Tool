import React, { useState, useEffect } from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router-dom";

const EditStaff = () => {
  const {
    // editDocument,
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    staffs,
    editStaffId,
    editStaff,
    staffTypeOptions,
  } = useAppContext();

  useEffect(() => {
    if (!isEditing) {
      navigate("/all-docs");
    }
  }, [isEditing, navigate]);

  const staff = staffs.find((staff) => staff._id === editStaffId);

  const [username, setUsername] = useState(isEditing && staff.username);
  const [useremail, setUseremail] = useState(isEditing && staff.useremail);
  const [userposition, setUserposition] = useState(
    isEditing && staff.userposition
  );
  const [researchInterestingAreas, setResearchInterestingAreas] = useState(
    isEditing && staff.researchInterestingAreas
  );
  const [department, setDepartment] = useState(isEditing && staff.department);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !username ||
      !useremail ||
      !userposition ||
      !researchInterestingAreas ||
      !department
    ) {
      displayAlert();
      return;
    }

    editStaff({
      editStaffId,
      username,
      useremail,
      userposition,
      researchInterestingAreas,
      department,
    });

    setTimeout(() => {
      navigate("/staff");
    }, 3000);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>update staff</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* user name */}
          <FormRow
            type="text"
            name="username"
            labelText="user name"
            value={username}
            handleChange={(e) => setUsername(e.target.value)}
          />

          {/* user email */}
          <FormRow
            type="text"
            labelText="email"
            name="useremail"
            value={useremail}
            handleChange={(e) => setUseremail(e.target.value)}
          />

          {/* researchInterestingAreas */}
          <FormRow
            type="text"
            labelText="Interesting Areas"
            name="researchInterestingAreas"
            value={researchInterestingAreas}
            handleChange={(e) => setResearchInterestingAreas(e.target.value)}
          />

          {/* department */}
          <FormRow
            type="text"
            labelText="department"
            name="department"
            value={department}
            handleChange={(e) => setDepartment(e.target.value)}
          />

          {/* position */}
          <FormRowSelect
            name="userposition"
            labelText="user position"
            value={userposition}
            handleChange={(e) => setUserposition(e.target.value)}
            list={staffTypeOptions}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditStaff;
