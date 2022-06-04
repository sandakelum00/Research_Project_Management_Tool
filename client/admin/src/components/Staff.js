import React from "react";
import moment from "moment";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";

const Staff = ({
  _id,
  username,
  useremail,
  userposition,
  researchInterestingAreas,
  department,
  createdAt,
  updatedAt,
}) => {
  const { setEditStaff, deleteStaff } = useAppContext();
  let createdDate = moment(createdAt);
  let updatedDate = moment(updatedAt);
  createdDate = createdDate.format("MMM Do, YYYY");
  updatedDate = updatedDate.format("MMM Do, YYYY");

  return (
    <>
      <tr>
        <td>{username}</td>
        <td>{userposition}</td>
        <td>{researchInterestingAreas}</td>
        <td>{department}</td>
        <td>{useremail}</td>
        <td>{createdDate}</td>
        <td>{updatedDate}</td>
        <td className="actions">
          <Link
            to="/edit-staff"
            className="btn edit-btn"
            onClick={() => setEditStaff(_id)}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={() => deleteStaff(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Staff;
