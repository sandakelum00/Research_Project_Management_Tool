import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./Screeners/RegisterScreen/RegisterScreen";
import CoverPage from "./Screeners/Coverpage/CoverPage";
import LandingPage from "./Screeners/LandinPage/LandingPage";
import SupervisorScreen from "./Screeners/LoginScreen/SupervisorScreen";
import PannelMemberScreen from "./Screeners/LoginScreen/PannelMemberScreen";
import SupervisorDashboard from "./Screeners/SupervisorDashboard/SupervisorDashboard";
import TopicAcceptance from "./Screeners/TopicAcceptance/TopicAcceptance";
import ChatWithGroups from "./Screeners/ChatWithGroups/ChatWithGroups";
import EvaluationProcess from "./Screeners/EvaluationProcess/EvaluationProcess";
import Header from "./Screeners/Header/Header";
import Sidebar from "./Components/Sidebar";
import MarksUpload from "./Screeners/MarksUpload/MarksUpload";
import MarkList from "./Screeners/MarkList/MarkList";
import SingleMark from "./Screeners/SingleMark/SingleMark";
import SingleTopic from "./Screeners/SingleTopic/SingleTopic";
import Profile from "./Screeners/ProfilePage/Profile";
import Footer from "./Footer/Footer";
import UploadFile from "./Screeners/DocumentSubmission/uploadFile";
import FilesList from "./Screeners/DocumentSubmission/FilesList";
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/registerStaff" element={<RegisterScreen />} />
        <Route path="/landPage" element={<LandingPage />} />
        <Route path="/" element={<CoverPage />} />
        <Route path="/pannel" element={<PannelMemberScreen />} />
        <Route path="/supervisor" element={<SupervisorScreen />} />
        <Route path="/supervisorDashboard" element={<SupervisorDashboard />} />
        <Route path="/topicacceptance" element={<TopicAcceptance />} />
        <Route path="/chatwithgroups" element={<ChatWithGroups />} />
        <Route path="/evaluation" element={<EvaluationProcess />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/marks" element={<MarksUpload />} />
        <Route path="/markslist" element={<MarkList />} />
        <Route path="/singlemark/:id" element={<SingleMark />} />
        <Route path="/singletopic/:id" element={<SingleTopic />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadFile />}></Route>
        <Route path="/docList" element={<FilesList />}></Route>
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;