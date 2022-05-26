import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentRegister from "./screens/RegisterStudent/registerStudent";
import StudentLogin from "./screens/Login/loginStudent"
import LandingPage from "./screens/LandingPage/LandingPage";

const App = () => (
  <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<LandingPage />}></Route>
        <Route path="/registerStudent" element={<StudentRegister />}></Route>
        <Route path="/loginStudent" element={<StudentLogin />}></Route>
      </Routes>
  </BrowserRouter>
);

export default App;
