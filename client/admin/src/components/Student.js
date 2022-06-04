import React from "react";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";

const Student = ({ _id, fullName, studentId, email }) => {
  const { setEditStudent, deleteStudent } = useAppContext();

  return (
    <>
      <tr>
        <td>{fullName}</td>
        <td>{studentId}</td>
        <td>{email}</td>

        <td className="actions">
          <Link
            to="/edit-student"
            className="btn edit-btn"
            onClick={() => setEditStudent(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteStudent(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Student;
