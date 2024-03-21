import useAuthStore, { clearProfile } from "../store/auth/store";
import { useMarketplaceApi } from "./useMarketplaceApi";

export const useAuth = () => {
  const api = useMarketplaceApi();
  const { setCredentials } = useAuthStore();

  const onAuth = async (username: string, password: string) => {
    const credentials = await api.login({
      username: username,
      password: password,
    });
    setCredentials(credentials);
    return credentials;
  };

  const onLogout = async () => {
    clearProfile();
  };

  return {
    onAuth,
    onLogout,
  };
};
