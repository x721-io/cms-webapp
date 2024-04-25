import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import ConnectWalletButton from "../../../../../components/button/ConnectWalletButton";
import { useCreateProjectContract } from "../../../../../hooks/useCreateProjectContract";
import { useLaunchpadApi } from "../../../../../hooks/useLaunchpadApi";
import { FormState } from "../../../../../types/form";
import CreateInfoDetail from "./CreateInfoDetail";
import CreateInfoProject from "./CreateInfoProject";
import CreateInfoRound from "./CreateInfoRound";
enum RoundType {
  U2UMintRoundFCFS = 0,
  U2UMintRoundWhitelist = 1,
  U2UMintRoundZero = 2,
  U2UPremintRoundFCFS = 3,
  U2UPremintRoundWhitelist = 4,
  U2UPremintRoundZero = 5,
  U2UMintRoundWhitelistCustomized = 6
}

const CreateProject = () => {
  const api = useLaunchpadApi();
  const navigate = useNavigate();
  const initValue: FormState.CreateProject = {
    name: "",
    collection: {isERC721: false, isU2UCollection: false, isPreminted: false, collectionAddress: '0xxxx', owner: '0xxxx'},
    description: "",
    discord: "",
    facebook: "",
    instagram: "",
    twitter: "",
    telegram: "",
    address: "0xxx",
    banner: "",
    organization: "",
    logo: "",
    collectionAddress: "",
    rounds: [],
    idOnchain: "",
    details: [],
  };
  const schema = yup.object({
    banner: yup.string().required("Please input banner"),
    logo: yup.string().required("Please input logo"),
    // collection: yup.string().required("Please select collection"),
    name: yup.string().required("Please input name"),
    organization: yup.string().required("Please input organization"),
    idOnchain: yup.string().required("Please input in onchain"),
    address: yup.string().nullable().required("Please input address"),
    discord: yup.string().required("Please input total discord"),
    facebook: yup.string().required("Please input facebook"),
    instagram: yup.string().required("Please input instagram"),
    twitter: yup.string().required("Please input total twitter"),
    telegram: yup.string().required("Please input telegram"),
    description: yup.string().required("Please input description"),
    collectionAddress: yup
      .string()
      .nullable()
      .required("Please input collectionAddress"),
    rounds: yup
      .array()
      .min(1, "a")
      .of(
        yup.object({
          roundId: yup.string().required("Please input roundId"),
          // start: yup.string().required("Please input start rounds"),
          // end: yup.string().required("Please input end rounds"),
          claimableStart: yup
            .string()
            .required("Please input claimable start rounds"),
          instruction: yup.string().required("Please input instruction rounds"),
          description: yup
            .string()
            .required("Please input instruction description"),
          totalNftt: yup.string().required("Please input totalNft rounds"),
          price: yup.string().required("Please input price rounds"),
          stakeBefore: yup.string().required("Please input staking end"),
          maxPerWallet: yup.string().required("Please input quantity"),
        })
      ),
    details: yup
      .array()
      .min(1, "b")
      .of(
        yup.object({
          key: yup.string().required("Please input key"),
          content: yup.string().required("Please input content"),
        })
      ),
  });
  const mainForm = useForm<FormState.CreateProject>({
    resolver: yupResolver(schema) as any,
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: { ...initValue },
  });

  const { handleSubmit, reset, getValues, watch } = mainForm;
  const { rounds, collection, collectionAddress  } = useMemo(() => getValues(), [watch()]);
  console.log('collection.collectionAddress: ', collection);
  console.log('collectionAddress: ', collectionAddress);


  const convertToRoundType = (type: string): RoundType | undefined => {    
    switch (type) {
      case 'U2UMintRoundFCFS':
        return RoundType.U2UMintRoundFCFS;
      case 'U2UMintRoundWhitelist':
        return RoundType.U2UMintRoundWhitelist;
      case 'U2UMintRoundZero':
        return RoundType.U2UMintRoundZero;
      case 'U2UPremintRoundFCFS':
        return RoundType.U2UPremintRoundFCFS;
      case 'U2UPremintRoundWhitelist':
        return RoundType.U2UPremintRoundWhitelist;
      case 'U2UPremintRoundZero':
        return RoundType.U2UPremintRoundZero;
      case 'U2UMintRoundWhitelistCustomized':
        return RoundType.U2UMintRoundWhitelistCustomized;
      default:
        return undefined;
    }
  };

  const formattedRounds = rounds.map(round => ({
    roundType: convertToRoundType(round.type),
    price: parseInt(round.price),
    start: new Date(round.start).getTime() / 1000,
    end: new Date(round.end).getTime() / 1000,
    startClaim: new Date(round.claimableStart).getTime() / 1000,
    maxAmountNFT: parseInt(round.totalNftt),
    maxAmountNFTPerWallet: parseInt(round.maxPerWallet),
    soldAmountNFT: 0,
  }));
  console.log('formattedRounds: ', formattedRounds);
  
  
  const {onCreateProjectContract} = useCreateProjectContract()

  const onCreateProject = async (params: FormState.CreateProject) => {
    const toastId = toast.loading("Uploading Project...", { type: "info" });
    try {
      // await api.createProjects(params);
      const tx = await onCreateProjectContract(formattedRounds as any, collection as any, '0xxx' )
      console.log('tx: ', tx);
      
      toast.update(toastId, {
        render: "Project created successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
      navigate("/admin/projects");
      reset?.();
    } catch (error: any) {
      console.error("Create project failed:", error);
      toast.update(toastId, {
        render: `Project updating: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    } finally {
    }
  };


  

  return (
    <div className="flex flex-col items-end justify-center gap-4">
      <CreateInfoProject mainForm={mainForm} />
      <CreateInfoRound mainForm={mainForm} />
      <CreateInfoDetail mainForm={mainForm} />

      <div className="flex gap-1">
        {/* <button
          onClick={() => reset()}
          className="rounded-md border bg-white px-9 py-2 text-base font-medium transition duration-200"
        >
          Cancel
        </button> */}
        <ConnectWalletButton showConnectButton>
        <button
          type="button"
          className="linear rounded-md bg-brand-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          onClick={() => handleSubmit(onCreateProject)()}
        >
          Create Project
        </button>
        </ConnectWalletButton>
      </div>
    </div>
  );
};

export default CreateProject;
