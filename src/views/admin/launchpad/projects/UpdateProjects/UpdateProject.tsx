"use client";
import { CustomFlowbiteTheme, Modal, ModalProps, Tabs } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormValidationMessages from "../../../../../components/Form/ValidationMessages";
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
    const api = useLaunchpadApi()
    const {
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormState.UpdateProject>({
        defaultValues: {
            name: item?.name,
            collection: item?.collection,
            description: item?.description,
            discord: item?.discord,
            facebook: item?.facebook,
            instagram: item?.instagram,
            twitter: item?.twitter,
            telegram: item?.telegram,
            address: item?.collection?.address,
            banner: item?.banner,
            organization: item?.organization,
            logo: item?.logo,
            collectionId: item?.collectionId,
        },
    });

    const { updateFilters: updateProjectFilters } = useProjectFilterStore((state) => state);

    const onUpdateProject = async (params: FormState.UpdateProject) => {
        const toastId = toast.loading("Uploading Project...", { type: "info" });
        console.log('param: ', params);
        try {
            await api.updateProject(params);
            updateProjectFilters(params)
            toast.update(toastId, {
                render: "Project updated successfully",
                type: "success",
                isLoading: false,
                autoClose: 1000,
                closeButton: true,
            });
        } catch (error: any) {
            console.error('Update project failed:', error);
            toast.update(toastId, {
                render: `Project updating: ${error.message}`,
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

    // console.log('item: ', item);


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
                <form className="gap-4 flex-col flex justify-center items-center" onSubmit={handleSubmit(onUpdateProject)}>
                    <Tabs className="underline w-full">
                        <Tabs.Item active title="Info Project">
                            <InfoProject item={item} />
                        </Tabs.Item>
                        <Tabs.Item active title="Info Round" className="w-full">
                            <InfoRound item={item}/>
                        </Tabs.Item>
                    </Tabs>
                    <FormValidationMessages errors={errors} />
                    <div className="flex gap-1">
                        <button onClick={onCloseModal} className="bg-white border px-9 py-2 text-base font-medium transition duration-200 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="linear rounded-md bg-brand-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">
                            Update Project
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    );
}
