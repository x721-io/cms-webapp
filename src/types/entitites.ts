import { BigNumberish } from "ethers";
import { MarketEventType } from "./market";
export type AssetType = "ERC721" | "ERC1155";
export type EntityStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface User {
  id: string;
  accountId: string;
  email: string;
  avatar?: string;
  username: string;
  signedMessage: string;
  signDate: string;
  acceptedTerms: boolean;
  createdAt: string;
  updatedAt?: string;
  bio?: string;
  coverImage?: string;
  facebookLink?: string;
  twitterLink?: string;
  telegramLink?: string;
  discordLink?: string;
  webURL?: string;
  shortLink?: string;
  isFollowed: boolean;
  followers: string;
  following: string;
  accountStatus?: boolean;
  verifyEmail?: boolean;
}

export interface Account {
  id: string;
  email: string;
  avatar?: string;
  username: string;
  createdAt: string;
  updatedAt?: string;
  twitterLink?: string;
  telegramLink?: string;
  phone?: string;
  roles?: string[];
}

export interface Collection {
  id: string;
  txCreationHash: string;
  name: string | null;
  symbol: string;
  isU2U: boolean;
  description?: string | null;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any> | string;
  shortUrl: string | null;
  status: EntityStatus;
  type: AssetType;
  creators: { userId: string; user: User }[];
  coverImage: string | null;
  avatar: string | null;
  volumn: string;
  totalOwner: number;
  totalNft: number;
  floorPrice: string;
  isVerified: boolean;
}

export interface NFT {
  id: string;
  u2uId: string;
  name: string;
  status: EntityStatus;
  tokenUri: string;
  txCreationHash: string;
  creatorId: string;
  collectionId: string;
  image: string;
  animationUrl: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    avatar: null | string;
    email: string | null;
    id: string;
    username: string;
    accountStatus: boolean;
  } | null;
  collection: Collection;
  price?: BigNumberish;
  sellStatus?: MarketEventType;
  isActive: boolean;
}
