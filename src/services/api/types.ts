import {
  Account,
  AssetType,
  Collection,
  NFT,
  User,
} from "../../types/entitites";

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
  export interface FetchAccounts extends PaginationParams {
    search?: string;
  }

  export interface FetchUsers extends PaginationParams {
    search?: string;
    order?: string;
    orderBy?: string;
  }

  export interface CreateAccount {
    avatar?: string;
    password: string;
    email?: string;
    username: string;
    twitterLink?: string;
    telegramLink?: string;
    phone?: string;
    roles: string[];
  }

  export interface UpdateAccount {
    username: string;
    email: string;
    twitterLink?: string;
    telegramLink?: string;
    phone: string;
  }

  export interface HandleActiveNFT {
    collectionId?: string;
    id?: string;
    isActive?: boolean;
  }

  export interface HandleActiveCollection {
    id?: string;
    isActive?: boolean;
  }
  export interface HandleActiveUser {
    id?: string;
    isActive?: boolean;
  }

  export interface HandleVerifyCollection {
    id?: string;
    isVerified?: boolean;
  }

  export interface UpdateRoles {
    id: string;
    roles: string[];
  }
}

/********** =========== API Response types ========== ***********/
export namespace APIResponse {
  export interface Pagination {
    page: number;
    limit: number;
    hasNext: boolean;
  }

  export interface FetchNFTs {
    data: NFT[];
    paging: Pagination;
  }
  export interface FetchCollections {
    data: Collection[];
    paging: Pagination;
  }
  export interface Login {
    accessToken: string;
    accessTokenExpire: number;
    refreshToken: string;
    refreshTokenExpire: number;
    accountId: string;
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
  export interface UsersData {
    data: User[];
    paging: Pagination;
  }

  export interface AccountData {
    data: Account[];
    paging: Pagination;
  }

  export interface UploadImage {
    fileHashes: string[];
  }

  export interface Roles {
    roles: string[];
  }

  export type AccountOverview = Account;
}
