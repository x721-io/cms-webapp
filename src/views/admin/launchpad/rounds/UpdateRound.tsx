import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import Input from "../../../../components/fields/InputField";
import { useForm } from "react-hook-form";
import { FormState } from "../../../../types/form";
import { formRulesRound } from "../../../../config/formRules";

interface Props extends ModalProps {
    item: any;
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

export default function UpdateRound({ onClose, show, item }: Props) {
    console.log("item: ", item);
    const {
        handleSubmit,
        register,
        formState: { isDirty, errors },
        setValue,
    } = useForm<FormState.UpdateRound>({
        defaultValues: {
            name: item?.roundname,
            type: item?.type,
            description: item?.description,
        },
    });

    const onUpdateRound = async (params: FormState.UpdateRound) => {
        console.log('1');

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
                <form className="flex-1 gap-4 flex-col" onSubmit={handleSubmit(onUpdateRound)}>
                    <div className="flex gap-4 flex-col">
                        <div className="flex gap-1 flex-col">
                            <label className="block mb-2 font-semibold text-primary">
                                Name
                            </label>
                            <Input
                                type="text"
                                error={!!errors.name}
                                register={register("name", formRulesRound.name)}
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
                            />
                        </div>
                    </div>
                    <button type="submit" className="linear rounded-md bg-brand-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">
                        Update Round
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
