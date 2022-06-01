import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Doc from "././Doc";
import Wrapper from "../assets/wrappers/DocsContainer";
import { Table } from "react-bootstrap";
// import PageBtnContainer from "./PageBtnContainer";

const DocsContainer = () => {
  const { getAllDocuments, docs, isLoading, page, totalDocs } = useAppContext();

  useEffect(() => {
    getAllDocuments();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (docs.length === 0) {
    return (
      <Wrapper>
        <h2>No documents to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalDocs} document{docs.length > 1 && "s"} found
      </h5>

      <div className="docs">
        <Table bordered hover size="sm" className="table text-center">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Document Type</th>
              <th>Document Size</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => {
              return <Doc key={doc._id} {...doc} />;
            })}
          </tbody>
        </Table>
      </div>
    </Wrapper>
  );
};

export default DocsContainer;
