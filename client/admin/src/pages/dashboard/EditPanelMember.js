import React, { useState, useEffect } from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router-dom";

const EditPanelMember = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    panelMembers,
    editMemberId,
    editPanelMember,
    panelTypeOptions,
  } = useAppContext();

  const panel = panelMembers.find((panel) => panel._id === editMemberId);

  const [status, setStatus] = useState(isEditing && panel.status);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditing) {
      navigate("/panel-member");
    }
  }, [isEditing, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!status) {
      displayAlert();
      return;
    }

    editPanelMember({
      status,
    });

    setTimeout(() => {
      navigate("/panel-member");
    }, 3000);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>allocate panel members to student group</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          {/* leader */}
          <FormRow
            type="text"
            name="Leader's IT No"
            value={isEditing && panel.LeaderNo}
          />

          {/* Research Title */}
          <FormRow
            type="text"
            labelText="Research Title"
            value={isEditing && panel.title}
          />

          {/* Supervisor */}
          <FormRow
            type="text"
            labelText="Supervisor"
            value={isEditing && panel.supervisor}
          />

          {/* Co-Supervisor */}
          <FormRow
            type="text"
            labelText="Co-Supervisor"
            value={isEditing && panel.cosupervisor}
          />

          {/* Status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={(e) => setStatus(e.target.value)}
            list={panelTypeOptions}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditPanelMember;
