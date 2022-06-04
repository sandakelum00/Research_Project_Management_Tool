import React, { useEffect } from "react";
import MainScreen from "../MainPage/MainScreen";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ location, history }) => {
    const [username, setusername] = useState("");
    const [useremail, setuseremail] = useState("");
    const [userposition, setuserposition] = useState("");
    const [researchInterestingAreas, setresearchInterestingAreas] =useState("");
    const [department, setdepartment] = useState("");

     const staffLogin = useSelector((state) => state.staffLogin);
     const { staffInfo } = staffLogin;


     
    useEffect(() => {
      if (!staffInfo) {
        history.push("/supervisor");
      } else {
        setusername(staffInfo.username);
        setuseremail(staffInfo.useremail);
        setuserposition(staffInfo.userposition);
        setresearchInterestingAreas(staffInfo.researchInterestingAreas)
        setdepartment(staffInfo.department);

      }
    }, [history, staffInfo]);

 return (
   <MainScreen title="Your Profile">
     <div>
       <Row className="profileContainer">
         <Col md={6}>
           <Form>
             <Form.Group className="mb-3" controlId="formBasicName">
               <Form.Label>Name</Form.Label>
               <Form.Control
                 type="text"
                 placeholder="Enter your name"
                 value={username}
                 onChange={(e) => setusername(e.target.value)}
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control
                 type="email"
                 placeholder="Enter email"
                 value={useremail}
                 onChange={(e) => setuseremail(e.target.value)}
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicPosition">
               <Form.Label>Position</Form.Label>
               <Form.Control
                 type="text"
                 placeholder="Position"
                 value={userposition}
                 onChange={(e) => setuserposition(e.target.value)}
               />
             </Form.Group>
             <Form.Group
               className="mb-3"
               controlId="formBasicResearchInterestingAreas"
             >
               <Form.Label>Reasearch Interesting areas </Form.Label>
               <Form.Control
                 type="text"
                 placeholder="Reasearch Interesting areas"
                 value={researchInterestingAreas}
                 onChange={(e) => setresearchInterestingAreas(e.target.value)}
               />
             </Form.Group>
             <Form.Group
               className="mb-3"
               controlId="formBasicDepartment"
             >
               <Form.Label>Department </Form.Label>
               <Form.Control
                 type="text"
                 placeholder="Department"
                 value={department}
                 onChange={(e) => setdepartment(e.target.value)}
               />
             </Form.Group>
           </Form>
         </Col>
       </Row>
     </div>
   </MainScreen>
 );
};

export default Profile
