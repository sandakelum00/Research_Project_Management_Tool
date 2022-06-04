import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../components/Appasd';
import Header from '../components/Header';
import FilesList from '../components/FilesList';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route element={<App/>} path="/upload" exact />
        <Route element={<FilesList />}path="/list" />
      </Routes>
    </main>
  </BrowserRouter>
);

export default AppRouter;
