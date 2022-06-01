import React from "react";
import moment from "moment";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";

const Doc = ({
  _id,
  docTitle,
  docDescription,
  docType,
  file_size,
  createdAt,
  file_path,
  file_mimetype,
}) => {
  const { downloadFile, setEditDoc, deleteDocument } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  const handleClick = (id, path, mimetype) => {
    const values = { id, path, mimetype };
    downloadFile(values);
  };

  return (
    <>
      <tr>
        <td>{docTitle}</td>
        <td>{docDescription}</td>
        <td>{docType}</td>
        <td>{file_size}</td>
        <td>{date}</td>
        <td className="actions">
          <a
            href="#/"
            className="btn download-btn"
            onClick={() => handleClick(_id, file_path, file_mimetype)}
          >
            Download
          </a>

          <Link
            to="/edit-doc"
            className="btn edit-btn"
            onClick={() => setEditDoc(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteDocument(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Doc;
