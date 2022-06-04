import React from "react";
import moment from "moment";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";

const PanelMember = ({
  _id,
  LeaderNo,
  title,
  supervisor,
  cosupervisor,
  status,
  panelMember,
  createdAt,
  updatedAt,
}) => {
  const { setEditPanelMember } = useAppContext();

  let createdDate = moment(createdAt);
  let updatedDate = moment(updatedAt);
  createdDate = createdDate.format("MMM Do, YYYY");
  updatedDate = updatedDate.format("MMM Do, YYYY");

  return (
    <>
      <tr>
        <td>{LeaderNo}</td>
        <td>{title}</td>
        <td>{supervisor}</td>
        <td>{cosupervisor}</td>
        <td className={`status ${status}`}>{status}</td>
        <td>{panelMember}</td>
        <td>{createdDate}</td>
        <td>{updatedDate}</td>
        <td className="actions">
          <Link
            to="/edit-panel-member"
            className="btn edit-btn"
            onClick={() => setEditPanelMember(_id)}
          >
            Allocate Member
          </Link>
        </td>
      </tr>
    </>
  );
};

export default PanelMember;
