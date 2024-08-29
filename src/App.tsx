import { Route, Routes } from "react-router-dom";
import Login from "./views/auth/Login";
import AdminLayout from "./layouts/admin/AdminLayout";
import { FormProvider, useForm } from "react-hook-form";
import { Web3Provider } from "./web3-provider";

const App = () => {
  const methods = useForm();

  return (
    
    <Web3Provider>
        <FormProvider {...methods}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="admin/*" element={<AdminLayout />} />
          </Routes>
        </FormProvider>
    </Web3Provider>
  );
};
export default App;
