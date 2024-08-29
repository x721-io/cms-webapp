import { defineChain } from "viem";
import { BLOCK_EXPLORER_URL, CHAIN_ID, NETWORK_NAME, RPC_URL } from "./contanst";

const chain = defineChain({
  id: Number(CHAIN_ID),
  name: NETWORK_NAME,
  network: NETWORK_NAME,
  nativeCurrency: {
    decimals: 18,
    name: "Unicorn Ultra Token",
    symbol:"U2U"
  },
  rpcUrls: {
    public: { http: [RPC_URL] },
    default: { http: [RPC_URL] },
  },
  blockExplorers: {
    etherscan: { name: "u2uScan", url: BLOCK_EXPLORER_URL },
    default: { name: "u2uScan", url: BLOCK_EXPLORER_URL },
  },
});
export const u2uChain = chain
