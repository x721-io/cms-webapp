import { useCallback, useMemo } from "react";
import { marketplaceApi } from "../services/api";
import { API_ENDPOINTS } from "../config/api";
import { APIParams, APIResponse } from "../services/api/types";
import { parseUnits } from "ethers";
import { sanitizeObject } from "../utils";
import useAuthStore from "../store/auth/store";

export const useMarketplaceApi = () => {
  const { credentials } = useAuthStore();
  const bearerToken = credentials?.accessToken;  
  
  const authHeader = useCallback(
    (accessToken?: string) => ({
      headers: { Authorization: `Bearer ${accessToken || bearerToken}` },
    }),
    [bearerToken],
  );

  return useMemo(() => {
    return {
      login: (params: APIParams.Login): Promise<APIResponse.Login> =>
        marketplaceApi.post(API_ENDPOINTS.LOGIN, params),

      fetchNFTs: (
        params: APIParams.FetchNFTs,
      ): Promise<APIResponse.FetchNFTs> => {
        const { priceMin, priceMax } = params;
        const bigintMin = priceMin !== undefined ? parseUnits(priceMin, 18) : undefined;
        const bigintMax = priceMax !== undefined ? parseUnits(priceMax, 18) : undefined;

        return marketplaceApi.post(
          API_ENDPOINTS.SEARCH_NFT,
          sanitizeObject({
            ...params,
            priceMin: bigintMin?.toString(),
            priceMax: bigintMax?.toString(),
          }), 
          authHeader()
        );
      },
    };
  }, []);
};
