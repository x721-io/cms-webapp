import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./views/auth/Login";
import AdminLayout from "./layouts/admin/AdminLayout";
import { FormProvider, useForm } from "react-hook-form";

const App = () => {
  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
        </Routes>
      </FormProvider>
    </>
  );
};
export default App;
