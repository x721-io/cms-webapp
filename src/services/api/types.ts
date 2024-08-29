import { Address } from "viem";
import {
  Account,
  AssetType,
  Collection,
  NFT,
  User,
} from "../../types/entitites";
import { Project, Round, RoundStatus, SearchRound } from "../../types/launchpad";

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

  export interface FetchRounds extends PaginationParams {
    name?: string;
  }

  export interface FetchProjects extends PaginationParams {
    name?: string;
    mode?: RoundStatus;
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

  export interface CreateRound {
    name?: string;
    type: string;
    description?: string;
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

  export interface FetchProjects {
    mode?: RoundStatus;
  }

  export interface SubscribeRoundZero {
    projectId: string;
    walletAddress: Address;
  }

  export interface FetchSnapshot {
    userId: Address;
    projectId: string | string[];
  }
  export interface CrawlNFTInfo {
    collectionAddress: Address;
    txCreation: Address;
  }

  export interface UpdateRound {
    id?: string;
    name?: string;
    type?: string;
    description?: string;
  }

  export interface ResetPassword {
    id: string;
    newPassword: string;
  }

  export interface ChangePassword {
    currentPassword: string;
    newPassword: string;
  }

  export interface CreateProject {
    name?: string;
    idOnchain?: string;
    banner?: string;
    description?: string;
    organization?: string;
    website?: string;
    details?: {
      key: string;
      content: string;
    }[];
    twitter?: string;
    telegram?: string;
    discord?: string;
    facebook?: string;
    instagram?: string;
    logo?: string;
    collectionAddress?: string;
    rounds: Round[];
  }

  export interface UpdateProject {
    id?: string;
    name?: string;
    idOnchain?: string;
    banner?: string;
    description?: string;
    organization?: string;
    website?: string;
    details?: [
      {
        key: string;
        content: string;
      }
    ];
    twitter?: string;
    telegram?: string;
    discord?: string;
    facebook?: string;
    instagram?: string;
    logo?: string;
    collectionAddress?: string;
    rounds?: Round[];
  }

  export interface FetchOptionRounds extends PaginationParams {}

  export interface FetchOptionCollections extends PaginationParams {}
  export interface RefreshToken {
    refreshToken: string;
  }
}

/********** =========== API Response types ========== ***********/
export namespace APIResponse {
  export interface Snapshot {
    stakingTotal: string;
    lastDateRecord: Date;
  }

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

  export interface RoundData {
    data: Round[];
    paging: Pagination;
  }

  export interface UploadImage {
    fileHashes: string[];
  }

  export interface Roles {
    roles: string[];
  }

  export interface FetchRounds {
    data: Round[];
    paging: Pagination;
  }

  export interface FetchProjects {
    data: Project[];
    paging: Pagination;
  }

  export interface RoundData {
    data: Round[];
    paging: Pagination;
  }

  export interface ProjectData {
    data: Project[];
    paging: Pagination;
  }

  export interface FetchOptionRounds {
    data: SearchRound[];
    paging: Pagination;
  }

  export interface FetchOptionCollections {
    data: Collection[];
    paging: Pagination;
  }

  export type AccountOverview = Account;
  export type SearchCollections = FetchCollections;
}
