import React from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddDocument = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    file,
    docTitle,
    docDescription,
    docType,
    docTypeOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !docTitle || !docDescription || !docType) {
      displayAlert();
      return;
    }
    if (isEditing) {
      // editJob();
      return;
    }
    // createJob();
    console.log("create doc");
  };

  const handleDocInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit document" : "add document"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* file */}
          <FormRow
            type="file"
            name="file"
            labelText="select file"
            value={file}
            handleChange={handleDocInput}
          />
          {/* docTitle */}
          <FormRow
            type="text"
            name="docTitle"
            labelText="document title"
            value={docTitle}
            handleChange={handleDocInput}
          />

          {/* doc type */}
          <FormRowSelect
            name="docType"
            labelText="document type"
            value={docType}
            handleChange={handleDocInput}
            list={docTypeOptions}
          />

          {/* docDescription */}
          <FormRow
            type="text"
            labelText="document description"
            name="docDescription"
            value={docDescription}
            handleChange={handleDocInput}
          />

          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddDocument;
