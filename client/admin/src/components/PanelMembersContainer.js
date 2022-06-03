import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Panel from "././PanelMember";
import Wrapper from "../assets/wrappers/DocsContainer";
import { Table } from "react-bootstrap";
// import PageBtnContainer from "./PageBtnContainer";

const PanelMembersContainer = () => {
  const {
    getAllPanelMembers,
    panelMembers,
    isLoading,
    page,
    totalPanelMembers,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  useEffect(() => {
    getAllPanelMembers();
  }, [search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (panelMembers.length === 0) {
    return (
      <Wrapper>
        <h2>No panel members to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalPanelMembers} panel member{panelMembers.length > 1 && "s"} found
      </h5>

      <div className="docs">
        <Table bordered hover size="sm" className="table text-center">
          <thead>
            <tr>
              <th>Leader's IT No</th>
              <th>Research Title</th>
              <th>Supervisor</th>
              <th>Co-Supervisor</th>
              <th>Allocate Status</th>
              <th>Requested Date</th>
              <th>Updated Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {panelMembers.map((panel) => {
              return <Panel key={panel._id} {...panel} />;
            })}
          </tbody>
        </Table>
      </div>
    </Wrapper>
  );
};

export default PanelMembersContainer;
