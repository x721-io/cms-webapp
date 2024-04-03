import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import Input from "../../../../components/fields/InputField";
import { useForm } from "react-hook-form";
import { FormState } from "../../../../types/form";
import { formRulesRound } from "../../../../config/formRules";
import FormValidationMessages from "../../../../components/Form/ValidationMessages";
import { useLaunchpadApi } from "../../../../hooks/useLaunchpadApi";
import { toast } from "react-toastify";
import { APIParams } from "../../../../services/api/types";
import { useRoundFilterStore } from "../../../../store/filters/rounds/store";

interface Props extends ModalProps {
    item: any;
    activeFilters: APIParams.FetchRounds,
    onApplyFilters?: (filters: APIParams.FetchRounds) => void,
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

export default function UpdateRound({ onClose, show, item, activeFilters, onApplyFilters }: Props) {
    const api = useLaunchpadApi()
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        getValues
    } = useForm<FormState.UpdateRound>({
        defaultValues: {
            id: item?.id,
            name: item?.name,
            type: item?.type,
            description: item?.description,
        },
    });

    const {
        updateFilters: updateRoundFilters,
      } = useRoundFilterStore((state) => state);

    const onUpdateRound = async () => {
        const toastId = toast.loading("Uploading Round...", { type: "info" });
        const formData = getValues();
        try {
            await api.updateRound(formData);
            updateRoundFilters({name: formData?.name})
            toast.update(toastId, {
                render: "Round updated successfully",
                type: "success",
                isLoading: false,
                autoClose: 1000,
                closeButton: true,
            });
        } catch (error: any) {
            console.error('Update Round failed:', error);
            toast.update(toastId, {
                render: `Round updating: ${error.message}`,
                type: "error",
                isLoading: false,
                autoClose: 1000,
                closeButton: true,
            });
        } finally {
            onClose?.()
        }
    }


    const onCloseModal = () => {
        onClose?.()
        reset?.()
    }

    return (
        <Modal
            theme={modalTheme}
            position="center"
            onClose={onClose}
            show={show}
            size="md"
            className=" bg-black bg-opacity-50"
        >
            <Modal.Header className="p-4">Update Round</Modal.Header>
            <Modal.Body className="p-4">
                <form className="gap-4 flex-col flex justify-center items-center" onSubmit={handleSubmit(onUpdateRound)}>
                    <div className="flex gap-4 flex-col w-full">
                        <div className="flex gap-1 flex-col">
                            <label className="block mb-2 font-semibold text-primary">
                                Id
                            </label>
                            <Input
                                type="text"
                                error={!!errors.id}
                                register={register("id", formRulesRound.id)}
                                defaultValue={item?.id}
                                className="bg-gray-200"
                                readOnly
                            />
                        </div>
                        <div className="flex gap-1 flex-col">
                            <label className="block mb-2 font-semibold text-primary">
                                Name
                            </label>
                            <Input
                                type="text"
                                error={!!errors.name}
                                register={register("name", formRulesRound.name)}
                                defaultValue={item?.name}
                            />
                        </div>
                        <div className="flex gap-1 flex-col">
                            <label className="block mb-2 font-semibold text-primary">
                                Type
                            </label>
                            <Input
                                type="text"
                                error={!!errors.type}
                                register={register("type", formRulesRound.type)}
                                defaultValue={item?.type}
                            />
                        </div>
                        <div className="flex gap-1 flex-col">
                            <label className="block mb-2 font-semibold text-primary">
                                Description
                            </label>
                            <Input
                                type="text"
                                error={!!errors.description}
                                register={register("description", formRulesRound.description)}
                                defaultValue={item?.description}
                            />
                        </div>
                    </div>
                    <FormValidationMessages errors={errors} />
                    <div className="flex gap-1">
                        <button onClick={onCloseModal} className="bg-white border px-9 py-2 text-base font-medium transition duration-200 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="linear rounded-md bg-brand-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">
                            Update Round
                        </button>
                    </div>

                </form>
            </Modal.Body>
        </Modal>
    );
}
