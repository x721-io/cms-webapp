import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormValidationMessages from "../../../../components/Form/ValidationMessages";
import Input from "../../../../components/fields/InputField";
import { formRulesCreateRound } from "../../../../config/formRules";
import { useLaunchpadApi } from "../../../../hooks/useLaunchpadApi";
import { FormState } from "../../../../types/form";

interface Props extends ModalProps {
  // item: any;
}

const modalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col h-auto max-h-[600px] desktop:max-h-[800px] tablet:max-h-[800px] w-[500px] ",
    base: "relative w-full desktop:p-10 tablet:p-6 p-4 flex items-center justify-center",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

export default function CreateRound({ onClose, show }: Props) {
  const api = useLaunchpadApi();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormState.CreateRound>({});

  const onCreateRound = async () => {
    const toastId = toast.loading("Creating Round...", { type: "info" });
    const formData = getValues();
    try {
      await api.createRounds(formData);

      toast.update(toastId, {
        render: "Create Round updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
      reset();
    } catch (error: any) {
      console.error("Create Round failed:", error);
      toast.update(toastId, {
        render: `Round updating: ${error.message}`,
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
      <Modal.Header className="p-4">Create Round</Modal.Header>
      <Modal.Body className="p-4">
        <form
          className="flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit(onCreateRound)}
        >
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Name
              </label>
              <Input
                type="text"
                error={!!errors.name}
                register={register("name", formRulesCreateRound.name)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Type
              </label>
              <Input
                type="text"
                error={!!errors.type}
                register={register("type", formRulesCreateRound.type)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-primary mb-2 block font-semibold">
                Description
              </label>
              <Input
                type="text"
                error={!!errors.description}
                register={register(
                  "description",
                  formRulesCreateRound.description
                )}
              />
            </div>
          </div>
          <FormValidationMessages errors={errors} />
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
              Create Round
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
