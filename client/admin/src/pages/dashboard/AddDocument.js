import React, { useState, useRef } from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import Dropzone from "react-dropzone";

const AddDocument = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    docTitle,
    docDescription,
    docType,
    docTypeOptions,
    handleChange,
    clearValues,
    addDocument,
    editJob,
  } = useAppContext();

  const dropRef = useRef();

  const [file, setFile] = useState(null);

  const handleDocInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();

    fileReader.readAsDataURL(uploadedFile);

    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !docTitle || !docDescription || !docType) {
      displayAlert();
      return;
    }
    // if (isEditing) {
    //   editJob();
    //   return;
    // }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("docTitle", docTitle);
    formData.append("docType", docType);
    formData.append("docDescription", docDescription);

    addDocument(formData);
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit document" : "add document"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
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

          <div className="upload-section">
            <Dropzone
              onDrop={onDrop}
              onDragEnter={() => updateBorder("over")}
              onDragLeave={() => updateBorder("leave")}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({ className: "drop-zone" })}
                  ref={dropRef}
                >
                  <input {...getInputProps()} />
                  <p>Drag and drop a file OR click here to select a file</p>
                  {file && (
                    <div>
                      <strong>Selected file:</strong> {file.name}
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </div>

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
