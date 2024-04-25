import { RoundType } from "../types/launchpad";
import U2UMintRoundFCFSABI from "./U2UMintRoundFCFS.json";
import U2UMintRoundWhitelistABI from "./U2UMintRoundWhitelist.json";
import U2UMintRoundWhitelistCustomizedABI from "./U2UMintRoundWhitelistCustomized.json";
import U2UMintRoundZeroABI from "./U2UMintRoundZero.json";
import U2UPremintRoundFCFSABI from "./U2UPremintRoundFCFS.json";
import U2UPremintRoundWhitelistABI from "./U2UPremintRoundWhitelist.json";
import U2UPremintRoundZeroABI from "./U2UPremintRoundZero.json";
import U2UProjectManagerABI from "./U2UProjectManager.json";

export const abis: Record<RoundType, any> = {
  U2UMintRoundFCFS: U2UMintRoundFCFSABI,
  U2UMintRoundWhitelist: U2UMintRoundWhitelistABI,
  U2UMintRoundZero: U2UMintRoundZeroABI,
  U2UPremintRoundFCFS: U2UPremintRoundFCFSABI,
  U2UPremintRoundWhitelist: U2UPremintRoundWhitelistABI,
  U2UPremintRoundZero: U2UPremintRoundZeroABI,
  U2UMintRoundWhitelistCustomized: U2UMintRoundWhitelistCustomizedABI,
};

export const U2UProjectManagerABIS = U2UProjectManagerABI;
