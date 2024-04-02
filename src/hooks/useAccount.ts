import { useMarketplaceApi } from "./useMarketplaceApi";
import { useCallback } from "react";
import { APIParams } from "../services/api/types";
import useAccountStore from "../store/account/store";
import useAuthStore from "../store/auth/store";

export const useAccount = () => {
  const api = useMarketplaceApi();
  const { credentials } = useAuthStore();
  const bearerToken = credentials?.accessToken;
  const { setAccountProfile } = useAccountStore();

  const onUpdateAccount = useCallback(
    async (params: APIParams.UpdateAccount) => {
      if (!bearerToken) return;
      const profile = await api.updateAccount(params);
      setAccountProfile(profile);
    },
    [bearerToken]
  );

  const onUpdateRoles = useCallback(
    async (params: APIParams.UpdateRoles) => {
      if (!bearerToken) return;
      await api.updateRoles(params);
    },
    [bearerToken]
  );

  const onCreateAccount = (params: APIParams.CreateAccount) =>
    api.createAccount(params);

  return {
    onCreateAccount,
    onUpdateAccount,
    onUpdateRoles,
  };
};
