import { waitForTransaction, writeContract } from "@wagmi/core";
import { Address } from "wagmi";
import { U2UProjectManagerABIS } from "../abi";
import { FormState } from "../types/form";
import { Round } from "../types/launchpad";

export const useCreateProjectContract = (
  rounds: Round[],
  collection: FormState.CreateProject,
  projectOwner: Address
) => {
  const onCreateProjectContract = async () => {
    const tx = await writeContract({
      address: collection.address,
      abi: U2UProjectManagerABIS,
      functionName: "createProject",
      args: [rounds, collection, projectOwner],
      value: BigInt(0) as any,
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
