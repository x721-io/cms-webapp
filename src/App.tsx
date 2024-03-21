import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./views/auth/Login";
import AdminLayout from "./layouts/admin/AdminLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="admin/*" element={<AdminLayout />} />
    </Routes>
  );
};
export default App;
