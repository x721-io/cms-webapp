import { waitForTransaction, writeContract } from "@wagmi/core";
import { Address } from "wagmi";
import { U2UProjectManagerABIS } from "../abi";
import { CollectionContract } from "../types/entitites";
import { RoundContract } from "../types/launchpad";

export const useCreateProjectContract = () => {
  const onCreateProjectContract = async ( rounds: RoundContract[], collection: CollectionContract, projectOwner: Address) => {
    const tx = await writeContract({
      address: collection.collectionAddress,
      abi: U2UProjectManagerABIS,
      functionName: "createProject",
      args: [rounds, collection, projectOwner],
    });
  
    return {
      hash: tx.hash,
      waitForTransaction: () => waitForTransaction({ hash: tx.hash }),
    };
  };

  return {
    onCreateProjectContract,
  };
};
