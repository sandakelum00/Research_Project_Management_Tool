import React from "react";
import { Register, Error, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Profile,
  Stats,
  SharedLayout,
  AddDocument,
  AllDocuments,
  EditDoc,
} from "./pages/dashboard";

function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index="stats" element={<Stats />} />
          <Route path="add-doc" element={<AddDocument />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="all-docs" element={<AllDocuments />}></Route>
          <Route path="edit-doc" element={<EditDoc />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default app;
