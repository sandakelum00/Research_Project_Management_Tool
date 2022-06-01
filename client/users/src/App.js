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

const App = () => (
  <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" exact element={<LandingPage />}></Route>
        <Route path="/registerStudent" element={<StudentRegister />}></Route>
        <Route path="/loginStudent" element={<StudentLogin />}></Route>
        <Route path="/homeStudent" element={<Home />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>
      </Routes>
    <Footer/>
  </BrowserRouter>
);

export default App;
