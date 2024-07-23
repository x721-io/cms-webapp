import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Address } from "wagmi";
import * as yup from "yup";
import { useLaunchpadApi } from "../../../../../hooks/useLaunchpadApi";
import { FormState } from "../../../../../types/form";
import { Round } from "../../../../../types/launchpad";
import CreateInfoDetail from "./CreateInfoDetail";
import CreateInfoProject from "./CreateInfoProject";
import CreateInfoRound from "./CreateInfoRound";


export interface FormInput {
  name: string;
  collection: string;
  description: string;
  discord: string;
  facebook: string;
  instagram: string;
  twitter: string;
  telegram: string;
  address: Address | null;
  banner: string;
  organization: string;
  logo?: string;
  collectionAddress: Address | null;
  rounds: Round[];
}

const CreateProject = () => {
  const api = useLaunchpadApi();
  const navigate = useNavigate();
  const initValue: FormState.CreateProject = {
    name: "",
    collection: "",
    description: "",
    discord: "",
    facebook: "",
    instagram: "",
    twitter: "",
    telegram: "",
    website: "",
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
    collection: yup.string().required("Please select collection"),
    name: yup.string().required("Please input name"),
    organization: yup.string().required("Please input organization"),
    idOnchain: yup.string().required("Please input in onchain"),
    website: yup.string().nullable().required("Please input website"),
    discord: yup.string().required("Please input total discord"),
    facebook: yup.string().required("Please input facebook"),
    instagram: yup.string().required("Please input instagram"),
    twitter: yup.string().required("Please input total twitter"),
    telegram: yup.string().required("Please input telegram"),
    description: yup.string().required("Please input description"),
    collectionAddress: yup.string().nullable().required("Please input collectionAddress"),
    rounds: yup.array().min(1, "a").of(
      yup.object({
        roundId: yup.string().required("Please input roundId"),
        claimableStart: yup.string().required("Please input claimable start rounds"),
        instruction: yup.string().required("Please input instruction rounds"),
        // description: yup.string().required("Please input instruction description"),
        totalNftt: yup.string().required("Please input totalNft rounds"),
        price: yup.string().required("Please input price rounds"),
        stakeBefore: yup.string().required("Please input staking end"),
        maxPerWallet: yup.string().required("Please input quantity"),
      })
    ),
    details: yup.array().min(1, "b").of(
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

  const { handleSubmit, reset } = mainForm;

  const onCreateProject = async (params: FormState.CreateProject) => {
    const toastId = toast.loading("Uploading Project...", { type: "info" });

    try {
      const data:any = { ...params }
      data.rounds.forEach((round:any) => {
        const {claimableIds} = round
        round.claimableIds = claimableIds.map((x: { id: any }) =>x.id);
      })

      await api.createProjects(data);
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
    }
  };

  return (
    // <form onSubmit={handleSubmit(onCreateProject)}>
      <div className="flex flex-col items-end justify-center gap-4">
        <CreateInfoProject mainForm={mainForm} />
        <CreateInfoRound mainForm={mainForm} />
        <CreateInfoDetail mainForm={mainForm} />

        <div className="flex gap-1 w-full">
          {/* <button
          onClick={() => reset()}
          className="rounded-md border bg-white px-9 py-2 text-base font-medium transition duration-200"
        >
          Cancel
        </button> */}
          <button
            type="button"
            className="linear w-full rounded-md bg-green-500 px-4 py-2 text-base uppercase font-bold text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            onClick={()=>{handleSubmit(onCreateProject)()}}
          >
            Create Project
          </button>
        </div>
      </div>
    // </form>

  );
};

export default CreateProject;
