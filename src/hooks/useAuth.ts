import { useMemo } from "react";
import { useAccount } from "wagmi";
import useAuthStore, { clearProfile } from "../store/auth/store";
import { useMarketplaceApi } from "./useMarketplaceApi";

export const useAuth = () => {
  const api = useMarketplaceApi();

  const { setCredentials, credentials } = useAuthStore();
  const { isConnected, address } = useAccount();

  const accessToken = useAuthStore((state) => state.credentials?.accessToken);
  const expiredDate = useAuthStore(
    (state) => state.credentials?.accessTokenExpire,
  );
  const userWallet = useAuthStore((state) => state.profile?.publicKey);

  const isCorrectWallet = useMemo(() => {
    if (!userWallet || !address) return false;
    return userWallet.toLowerCase() === address.toLowerCase();
  }, [userWallet, address, isConnected]);

  const isExpired = useMemo(() => {
    return !!expiredDate && expiredDate < Date.now();
  }, [expiredDate]);

  const isValidSession = useMemo(() => {
    return !!accessToken && !isExpired && isCorrectWallet;
  }, [ accessToken, isExpired, isCorrectWallet]);

  if (typeof localStorage !== "undefined") {
    if (!isValidSession) {
      localStorage.removeItem("auth-storage");
    }
  }

  const onAuth = async (username: string, password: string) => {
    const credentials = await api.login({
      username: username,
      password: password,
    });
    setCredentials(credentials);
    return credentials;
  };

  const accountId = credentials && credentials.accountId;

  const onLogout = async () => {
    clearProfile();
    localStorage.removeItem("auth-storage");
  };

  return {
    isValidSession,
    onAuth,
    onLogout,
    accountId,
  };
};
