import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentRegister from "./screens/RegisterStudent/registerStudent";
import StudentLogin from "./screens/Login/loginStudent"
import LandingPage from "./screens/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./screens/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./screens/Profile/studentProfile"
import Team from "./screens/Teams/team";
import CreateTeam from "./screens/Teams/createTeam";
import CreateSubmission from "./screens/Submission/createSubmission";
import MySubmissions from "./screens/Submission/submissionList";
import UploadFile from './screens/DocumentSubmission/uploadFile';
import FilesList from "./screens/DocumentSubmission/FilesList";
import Chat from "./screens/Chat/chat";

const App = () => (
  <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" exact element={<LandingPage />}></Route>
        <Route path="/registerStudent" element={<StudentRegister />}></Route>
        <Route path="/loginStudent" element={<StudentLogin />}></Route>
        <Route path="/homeStudent" element={<Home />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>
        <Route path="/profileStudent" element={<Profile />}></Route>
        <Route path="/team" element={<Team />}></Route>
        <Route path="/createTeam" element={<CreateTeam />}></Route>
        <Route path="/submitGroup" element={<CreateSubmission />}></Route>
        <Route path="/submissions" element={<MySubmissions />}></Route>
        <Route path="/upload" element={<UploadFile />}></Route>
        <Route path="/docList" element={<FilesList />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    <Footer/>
  </BrowserRouter>
);

export default App;
