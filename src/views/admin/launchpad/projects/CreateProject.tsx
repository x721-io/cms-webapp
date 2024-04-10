import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Address } from "wagmi";
import * as yup from "yup";
import { FormState } from "../../../../types/form";
import { Round } from "../../../../types/launchpad";
import CreateInfoProject from "./CreateInfoProject";

export interface FormInput {
  createProject: {
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
    logo: string;
    collectionId: Address | null;
  };
  rounds: Round[];
}

export default function CreateProject() {
  // const api = useLaunchpadApi();

  // const roundFilters = useRoundOptionFilterStore((state) => state.filters);
  // const collectionFilters = useCollectionOptionFilterStore((state) => state.filters);

  // const { data: roundData, size: roundSize, setSize: setRoundSize, isLoading: roundLoading } = useFetchOptionRounds(roundFilters);
  // const { data: collectionData, size: collectionSize, setSize: setCollectionSize, isLoading: collectionLoading } = useFetchOptionCollections(collectionFilters);

  // console.log('roundData: ', roundData);
  // console.log('collectionData: ', collectionData);

  const initValue: FormInput = {
    createProject: {
      name: "",
      collection: "",
      description: "",
      discord: "",
      facebook: "",
      instagram: "",
      twitter: "",
      telegram: "",
      address: null,
      banner: "",
      organization: "",
      logo: "",
      collectionId: null,
    },
    rounds: [],
  };
  const schema = yup.object({
    createProject: yup.object({
      name: yup.string().required("Please input name"),
      collection: yup.string().required("Please select collection"),
      description: yup.string().required("Please input description"),
      discord: yup.string().required("Please input total discord"),
      facebook: yup.string().required("Please input facebook"),
      instagram: yup.string().required("Please input instagram"),
      twitter: yup.string().required("Please input total twitter"),
      telegram: yup.string().required("Please input telegram"),
      address: yup.string().nullable().required("Please input address"),
      banner: yup.string().required("Please input banner"),
      organization: yup.string().required("Please input organization"),
      logo: yup.string().required("Please input logo"),
      collectionId: yup
        .string()
        .nullable()
        .required("Please input collectionId"),
    }),

    rounds: yup
      .array()
      .min(1, "a")
      .of(
        yup.object({
          name: yup.string().nullable().required("Please input name rounds"),
          address: yup
            .string()
            .nullable()
            .required("Please input address rounds"),
          description: yup
            .string()
            .nullable()
            .required("Please input description rounds"),
          start: yup.string().required("Please input start rounds"),
          end: yup.string().required("Please input end rounds"),
          roundId: yup.string().required("Please input roundId"),
          stakeBefore: yup
            .string()
            .required("Please input stake before rounds"),
          claimableStart: yup
            .string()
            .required("Please input claimable start rounds"),
          maxPerWallet: yup
            .string()
            .required("Please input maxPerWallet rounds"),
          price: yup.string().required("Please input price rounds"),
          totalNftt: yup.string().required("Please input totalNft rounds"),
          instruction: yup.string().required("Please input instruction rounds"),
          claimableIds: yup
            .string()
            .required("Please input required staking rounds"),
          requiredStaking: yup
            .string()
            .required("Please input claimable ids rounds"),
        })
      ),
  });
  const mainForm = useForm<FormInput>({
    resolver: yupResolver(schema) as any,
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: { ...initValue },
  });

  const { setValue, handleSubmit, reset } = mainForm;

  const onSubmit = () => {};

  const onCreateProject = async (params: FormState.CreateProject) => {
    // const toastId = toast.loading("Uploading Project...", { type: "info" });
    // console.log('param: ', params);
    // try {
    //     // await api.createProjects();
    //     toast.update(toastId, {
    //         render: "Project updated successfully",
    //         type: "success",
    //         isLoading: false,
    //         autoClose: 1000,
    //         closeButton: true,
    //     });
    // } catch (error: any) {
    //     console.error('Update project failed:', error);
    //     toast.update(toastId, {
    //         render: `Project updating: ${error.message}`,
    //         type: "error",
    //         isLoading: false,
    //         autoClose: 1000,
    //         closeButton: true,
    //     });
    // } finally {
    //     reset?.()
    // }
  };

  return (
    <form className="flex flex-col items-center justify-center gap-4">
      <CreateInfoProject mainForm={mainForm} />
      {/* <CreateInfoRound mainForm={mainForm} /> */}

      <div className="flex gap-1">
        <button
          onClick={() => reset()}
          className="rounded-md border bg-white px-9 py-2 text-base font-medium transition duration-200"
        >
          Cancel
        </button>
        <button
          type="button"
          className="linear rounded-md bg-brand-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Create Project
        </button>
      </div>
    </form>
  );
}
