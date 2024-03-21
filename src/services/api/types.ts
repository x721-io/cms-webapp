import { AssetType, Collection, NFT } from "../../types/entitites";

/********** =========== Queries & Params for Api call ========== ***********/
export namespace APIParams {
  export interface PaginationParams {
    page?: number;
    limit?: number;
    hasNext?: boolean;
  }

  export interface Login {
    username: string | undefined;
    password: string | undefined;
  }

  export interface FetchNFTs extends PaginationParams {
    type?: AssetType;
    priceMax?: string;
    priceMin?: string;
    name?: string;
    order?: string;
    orderBy?: string;
  }
  export interface FetchCollections extends PaginationParams {
    name?: string;
    min?: string;
    max?: string;
    order?: string;
    orderBy?: string;
  }
  export interface FetchUsers extends PaginationParams {
    search?: string;
  }
}

/********** =========== API Response types ========== ***********/
export namespace APIResponse {
  export interface FetchNFTs {
    data: NFT[];
    paging: Pagination;
  }
  export interface Pagination {
    page: number;
    limit: number;
    hasNext: boolean;
  }
  export interface Login {
    accessToken: string;
    accessTokenExpire: number;
    refreshToken: string;
    refreshTokenExpire: number;
    userId: string;
  }

  export interface CollectionDetails {
    collection: Collection;
    traitAvailable: {
      key: string;
      count: number;
      traits: {
        value: string;
        count: number;
      }[];
    }[];
    generalInfo: {
      volumn: string;
      totalOwner: number;
      totalNft: number;
      floorPrice: string;
    };
  }
}
