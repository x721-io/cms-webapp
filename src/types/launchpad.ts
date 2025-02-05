import { BigNumberish } from "ethers";
import { Address } from "wagmi";
import { Collection } from "./entitites";

export type RoundType =
  | "U2UMintRoundFCFS"
  | "U2UMintRoundWhitelist"
  | "U2UMintRoundZero"
  | "U2UPremintRoundFCFS"
  | "U2UPremintRoundWhitelist"
  | "U2UPremintRoundZero"
  | "U2UMintRoundWhitelistCustomized";

export type RoundStatus = "MINTING" | "ENDED" | "UPCOMING" | "CLAIM";

export interface SearchRound {
  id: string;
  name: string;
  type: string;
}


export interface Round {
  roundId: string;
  address: Address | null;
  start: string;
  end: string;
  price: BigNumberish;
  maxPerWallet: string;
  totalNftt: string;
  claimableStart: string;
  claimableIds: {id:string}[];
  requiredStaking: BigNumberish;
  instruction: string;
  stakeBefore: string;
}

export interface Project {
  id: string;
  idOnchain: number;
  name: string;
  banner: string;
  logo: string;
  description: string;
  organization: string;
  website: string;
  telegram: string;
  twitter: string;
  facebook: string;
  instagram: string;
  discord: string;
  shortLink: string;
  isActivated: boolean;
  collection: Collection;
  rounds: Round[];
  details: { key: string; content: string }[];
}
