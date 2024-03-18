import { useMemo } from "react"
import { marketplaceApi } from "../services/api"
import { API_ENDPOINTS } from "../config/api"
import { APIParams, APIResponse } from "../services/api/types"


export const useMarketplaceApi = () => { 
    return useMemo(() => { 
        return {
            login: (params: APIParams.Login): Promise<APIResponse.Login> => marketplaceApi.post(API_ENDPOINTS.LOGIN, params)
        }
    },[]) 
}