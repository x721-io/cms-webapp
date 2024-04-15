"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLaunchpadApi } from "../../../../../hooks/useLaunchpadApi";
import { useProjectFilterStore } from "../../../../../store/filters/projects/store";
import { FormState } from "../../../../../types/form";
import InfoProject from "./InfoProject";
import InfoRound from "./InfoRound";
interface Props extends ModalProps {
  item: any;
}

const modalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col h-[600px] w-[800px] ",
    base: "relative w-full desktop:p-10 tablet:p-6 p-4 flex items-center justify-center",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

export default function UpdateProject({ onClose, show, item }: Props) {
  const api = useLaunchpadApi();
    console.log('item: ', item);
    
  const { updateFilters: updateProjectFilters } = useProjectFilterStore(
    (state) => state
  );

  const initValue: FormState.UpdateProject = {
    id: "",
    name: "",
    collection: "",
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
  };
  console.log('initValue: ', initValue);
  

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
    collectionAddress: yup.string().nullable().required("Please input collectionAddress"),
    rounds: yup
      .array()
      .min(1, "a")
      .of(
        yup.object({
          roundId: yup.string().required("Please input roundId"),
          start: yup.string().required("Please input start rounds"),
          end: yup.string().required("Please input end rounds"),
          claimableStart: yup.string().required("Please input claimable start rounds"),
          instruction: yup.string().required("Please input instruction rounds"),
          description: yup.string().required("Please input instruction description"),
          totalNftt: yup.string().required("Please input totalNft rounds"),
          price: yup.string().required("Please input price rounds"),
          stakeBefore: yup.string().required("Please input staking end"),
          maxPerWallet: yup.string().required("Please input quantity"),
        })
      ),
  });
  const mainForm = useForm<FormState.UpdateProject>({
    resolver: yupResolver(schema) as any,
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: { ...initValue },
  });

  const {
    handleSubmit,
    reset,
    formState: {errors}
  } = mainForm;
  console.log('error', errors);
  

  
  const onUpdateProject = async (params: FormState.UpdateProject) => {
    const toastId = toast.loading("Uploading Project...", { type: "info" });
    console.log("param: ", params);
    try {
      await api.updateProject(params);
      updateProjectFilters(params);
      toast.update(toastId, {
        render: "Project updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    } catch (error: any) {
      console.error("Update project failed:", error);
      toast.update(toastId, {
        render: `Project updating: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    } finally {
      onClose?.();
    }
  };

  const onCloseModal = () => {
    onClose?.();
    reset?.();
  };
  
  return (
    <Modal
      theme={modalTheme}
      position="center"
      onClose={onClose}
      show={show}
      size="md"
      className=" bg-black bg-opacity-50"
    >
      <Modal.Header className="p-4">Update Project</Modal.Header>
      <Modal.Body className="p-4">
        <form
          className="flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit(onUpdateProject)}
        >
          <InfoProject item={item} mainForm={mainForm}/>
          <InfoRound item={item} mainForm={mainForm}/>
          <div className="flex gap-1">
            <button
              onClick={onCloseModal}
              className="rounded-md border bg-white px-9 py-2 text-base font-medium transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="linear rounded-md bg-brand-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            >
              Update Project
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
