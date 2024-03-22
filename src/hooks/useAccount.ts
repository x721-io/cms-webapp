import { useMarketplaceApi } from "./useMarketplaceApi";
import { useState } from "react";
import { VIEWER } from "../config/contanst";


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

  return {
    handleSwitchChange,
    roleExists,
    roles,
    setRoles
  };
};
