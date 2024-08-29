import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

export default function useWeb3() {
  const { open, close } = useWeb3Modal();
  const { isConnected, address } = useAccount();

  return {
    openWeb3Modal: open,
    closeWeb3Modal: close,
    isConnected,
    address,
  };
}
