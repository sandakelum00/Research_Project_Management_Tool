import React, { useState, useEffect } from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router-dom";

const initialState = {
  docTypeOptions: ["presentation-template", "marking-scheme"],
};

const EditDoc = () => {
  const {
    editDocument,
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    docs,
    editDocId,
  } = useAppContext();

  useEffect(() => {
    if (!isEditing) {
      navigate("/all-docs");
    }
  }, [isEditing, navigate]);

  const doc = docs.find((doc) => doc._id === editDocId);

  const [file, setFile] = useState(isEditing && doc.fileName);
  const [docTitle, setDocTitle] = useState(isEditing && doc.docTitle);
  const [docDescription, setDocDescription] = useState(
    isEditing && doc.docDescription
  );
  const [docType, setDocType] = useState(isEditing && doc.docType);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!docTitle || !docDescription || !docType) {
      displayAlert();
      return;
    }

    editDocument({ editDocId, docTitle, docDescription, docType });

    setTimeout(() => {
      navigate("/all-docs");
    }, 3000);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>update document</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* docTitle */}
          <FormRow
            type="text"
            name="docTitle"
            labelText="document title"
            value={docTitle}
            handleChange={(e) => setDocTitle(e.target.value)}
          />
          {/* docDescription */}
          <FormRow
            type="text"
            labelText="document description"
            name="docDescription"
            value={docDescription}
            handleChange={(e) => setDocDescription(e.target.value)}
          />
          {/* doc type */}
          <FormRowSelect
            name="docType"
            labelText="document type"
            value={docType}
            handleChange={(e) => setDocType(e.target.value)}
            list={initialState.docTypeOptions}
          />
          {/* file upload section */}
          <FormRow disabled name="text" labelText="File Name" value={file} />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditDoc;
