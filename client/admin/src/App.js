import React from "react";
import { Register, Error, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile, Stats, SharedLayout } from "./pages/dashboard";

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
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default app;
