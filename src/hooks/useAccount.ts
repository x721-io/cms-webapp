import { useMarketplaceApi } from "./useMarketplaceApi";
import { useCallback, useState } from "react";
import { VIEWER } from "../config/contanst";
import { APIParams } from "../services/api/types";
import useAccountStore from "../store/account/store";
import useAuthStore from "../store/auth/store";

export const useAccount = () => {
  const api = useMarketplaceApi();
  const { setAccountProfile } = useAccountStore();
  const { credentials } = useAuthStore();

  const bearerToken = credentials?.accessToken;

  const accountRoles = useAccountStore((state) => state.accountProfile?.roles);

  const onUpdateAccount = useCallback(
    async (params: APIParams.UpdateAccount) => {
      if (!bearerToken) return;
      const profile = await api.updateAccount(params);
      setAccountProfile(profile);
    },
    [bearerToken]
  );

  const [roles, setRoles] = useState<string[]>([VIEWER]);
  const [newRoles, setNewRoles] = useState<string[]>(accountRoles || []);

  const roleExists = (role: string) => {
    return roles.includes(role);
  };

  const newRoleExists = (role: string) => {
    return newRoles.includes(role);
  };

  const handleSwitchChange = (role: string) => {
    if (roleExists(role)) {
      setRoles((prevRoles) => prevRoles.filter((r) => r !== role));
    } else {
      setRoles((prevRoles) => [...prevRoles, role]);
    }
  };

  const handleUpdateRoles = (role: string) => {
    if (roleExists(role)) {
      setNewRoles((prevRoles) => prevRoles.filter((r) => r !== role));
    } else {
      setNewRoles((prevRoles) => [...prevRoles, role]);
    }
  };

  const onCreateAccount = (params: APIParams.CreateAccount) =>
    api.createAccount(params);

  return {
    handleSwitchChange,
    roleExists,
    roles,
    setRoles,
    onCreateAccount,
    handleUpdateRoles,
    newRoles,
    newRoleExists,
    onUpdateAccount,
  };
};
