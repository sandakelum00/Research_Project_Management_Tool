import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Home = (history) => {
  const navigate = useNavigate();

  const studentLogin = useSelector((state) => state.studentLogin);

  const { userInfo } = studentLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [history, userInfo]);

  return (
    <div>
      <Sidebar />
      <h1>asd</h1>
    </div>
  );
};

export default Home;
