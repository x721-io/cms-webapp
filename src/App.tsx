import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "./views/auth/Login";

import AdminLayout from "./layouts/admin/AdminLayout";
const App = () => {
  return (
      <Routes>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Login/>} />
      </Routes>
  );
};

export default App;
