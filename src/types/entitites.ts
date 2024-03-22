export type AssetType = "ERC721" | "ERC1155";

export interface User {
  id: string;
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

