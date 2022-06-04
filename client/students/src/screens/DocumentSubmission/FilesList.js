import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { Col, Table, Row } from "react-bootstrap";
import Sidebar from '../../components/Sidebar/Sidebar';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/getAll"
        );
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:5000/${id}`, {
        responseType: "blob",
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  return (
    <div>
    <Row>
      <Col>
      <Sidebar/>
      </Col>
    
   <Col>
    <div className="files-container" >
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <h3 style={{marginTop:"80px", marginLeft:"-240px"}}>Download Sample Templates</h3>
      <div className='details' style={{marginTop:"70px", marginRight:"150px"}} >
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>
    </div>
    </Col>
    </Row>
    </div>
   
  );
};

export default FilesList;
