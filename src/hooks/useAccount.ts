import { useMarketplaceApi } from "./useMarketplaceApi";
import { useState } from "react";
import { VIEWER } from "../config/contanst";
import { APIParams } from "../services/api/types";


export const useAccount = () => {
  const api = useMarketplaceApi();

  const [roles, setRoles] = useState<string[]>([VIEWER]);


  const roleExists = (role: string) => {
    return roles.includes(role);
  };

  const handleSwitchChange = (role: string) => {
    if (roleExists(role)) {
      setRoles(prevRoles => prevRoles.filter(r => r !== role));
    } else {
      setRoles(prevRoles => [...prevRoles, role]);
    }
  };

  const onCreateAccount = (params: APIParams.CreateAccount) => api.createAccount(params)


  return {
    handleSwitchChange,
    roleExists,
    roles,
    setRoles,
    onCreateAccount,
  };
};
