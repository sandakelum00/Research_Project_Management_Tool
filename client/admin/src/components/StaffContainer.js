import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Staff from "././Staff";
import Wrapper from "../assets/wrappers/DocsContainer";
import { Table } from "react-bootstrap";
// import PageBtnContainer from "./PageBtnContainer";

const StaffContainer = () => {
  const {
    getAllStaff,
    staffs,
    isLoading,
    page,
    totalStaff,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  useEffect(() => {
    getAllStaff();
  }, [search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (staffs.length === 0) {
    return (
      <Wrapper>
        <h2>No staff to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalStaff} staff member{staffs.length > 1 && "s"} found
      </h5>

      <div className="docs">
        <Table bordered hover size="sm" className="table text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Interesting Areas</th>
              <th>Department</th>
              <th>Email</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => {
              return <Staff key={staff._id} {...staff} />;
            })}
          </tbody>
        </Table>
      </div>
    </Wrapper>
  );
};

export default StaffContainer;
