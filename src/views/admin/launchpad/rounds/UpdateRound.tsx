import { CustomFlowbiteTheme, Modal, ModalProps } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormValidationMessages from '../../../../components/Form/ValidationMessages';
import Input from '../../../../components/fields/InputField';
import { formRulesRound } from '../../../../config/formRules';
import { useRoundFilters } from '../../../../hooks/useFilters';
import { useLaunchpadApi } from '../../../../hooks/useLaunchpadApi';
import { APIParams } from '../../../../services/api/types';
import { FormState } from '../../../../types/form';

interface Props extends ModalProps {
    item: any;
    activeFilters: APIParams.FetchRounds;
    onApplyFilters?: (filters: APIParams.FetchRounds) => void;
}

const modalTheme: CustomFlowbiteTheme['modal'] = {
    content: {
        inner: 'relative rounded-lg bg-white shadow flex flex-col h-auto max-h-[600px] desktop:max-h-[800px] tablet:max-h-[800px] w-[500px] ',
        base: 'relative w-full desktop:p-10 tablet:p-6 p-4 flex items-center justify-center',
    },
    body: {
        base: 'p-0 flex-1 overflow-auto',
    },
};

export default function UpdateRound({
    onClose,
    show,
    item,
    activeFilters,
    onApplyFilters,
}: Props) {
    const api = useLaunchpadApi();
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        getValues,
    } = useForm<FormState.UpdateRound>({
        defaultValues: {
            id: item?.id,
            name: item?.name,
            type: item?.type,
            description: item?.description,
        },
    });

    const { handleChange } = useRoundFilters(activeFilters, onApplyFilters);

    const onUpdateRound = async () => {
        const toastId = toast.loading('Uploading Round...', { type: 'info' });
        const formData = getValues();
        try {
            await api.updateRound(formData);
            handleChange(formData);
            toast.update(toastId, {
                render: 'Round updated successfully',
                type: 'success',
                isLoading: false,
                autoClose: 1000,
                closeButton: true,
            });
        } catch (error: any) {
            console.error('Update Round failed:', error);
            toast.update(toastId, {
                render: `Round updating: ${error.message}`,
                type: 'error',
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
            <Modal.Header className="p-4">Update Round</Modal.Header>
            <Modal.Body className="p-4">
                <form
                    className="flex flex-col items-center justify-center gap-4"
                    onSubmit={handleSubmit(onUpdateRound)}
                >
                    <div className="flex w-full flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-primary mb-2 block font-semibold">
                                Id
                            </label>
                            <Input
                                type="text"
                                error={!!errors.id}
                                register={register('id', formRulesRound.id)}
                                defaultValue={item?.id}
                                className="bg-gray-200"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-primary mb-2 block font-semibold">
                                Name
                            </label>
                            <Input
                                type="text"
                                error={!!errors.name}
                                register={register('name', formRulesRound.name)}
                                defaultValue={item?.name}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-primary mb-2 block font-semibold">
                                Type
                            </label>
                            <Input
                                type="text"
                                error={!!errors.type}
                                register={register('type', formRulesRound.type)}
                                defaultValue={item?.type}
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
                                    'description',
                                    formRulesRound.description,
                                )}
                                defaultValue={item?.description}
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
                            Update Round
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
