import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/admin/AdminLayout";
import Login from "./views/auth/Login";
const App = () => {
  return (
      <Routes>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Login/>} />
      </Routes>
  );
};

export default App;
