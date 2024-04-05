import { yupResolver } from '@hookform/resolvers/yup';
import { Tabs } from 'flowbite-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Address } from 'wagmi';
import * as yup from 'yup';
import FormValidationMessages from '../../../../components/Form/ValidationMessages';
import { useLaunchpadApi } from '../../../../hooks/useLaunchpadApi';
import { FormState } from '../../../../types/form';
import { Round } from '../../../../types/launchpad';
import CreateInfoProject from './CreateInfoProject';
import CreateInfoRound from './CreateInfoRound';

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
    const api = useLaunchpadApi();
    const initValue: FormInput = {
        createProject: {
            name: '',
            collection: '',
            description: '',
            discord: '',
            facebook: '',
            instagram: '',
            twitter: '',
            telegram: '',
            address: null,
            banner: '',
            organization: '',
            logo: '',
            collectionId: null,
        },
        rounds: [],
    };

    const schema = yup.object({
        createProject: yup.object({
            name: yup.string().required(),
            collection: yup.string().required(),
            description: yup.string().required(),
            discord: yup.string().required(),
            facebook: yup.string().required(),
            instagram: yup.string().required(),
            twitter: yup.string().required(),
            telegram: yup.string().required(),
            address: yup.string().nullable().required(),
            banner: yup.string().required('llllllll'),
            organization: yup.string().required(),
            logo: yup.string().required(),
            collectionId: yup.string().nullable().required(),
        }),

        rounds: yup
            .array()
            .min(1, 'aaa')
            .of(
                yup.object({
                    address: yup.string().nullable().required(),
                    start: yup.string().required(),
                    end: yup.string().required(),
                    roundId: yup.string().required(),
                    stakeBefore: yup.string().required(),
                    claimableStart: yup.string().required(),
                    maxPerWallet: yup.string().required(),
                    price: yup.string().required(),
                    totalNftt: yup.string().required(),
                    instruction: yup.string().required(),
                    claimableIds: yup.string().required(),
                    requiredStaking: yup.string().required(),
                }),
            ),
    });
    const mainForm = useForm<FormInput>({
        resolver: yupResolver(schema) as any,
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: { ...initValue },
    });

    const {
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
    } = mainForm;

    const onSubmit = () => {};

    useEffect(() => {
        setValue('rounds', [
            {
                id: 1,
                description: '',
                name: '',
                projectId: '55',
                type: 'U2UMintRoundFCFS',
                address: null,
                start: '2024-01-05T14:48:00.000Z',
                end: '2024-03-20T14:48:00.000Z',
                roundId: 0,
                stakeBefore: '2024-01-21T14:48:00.000Z',
                claimableStart: '2024-03-19T14:48:00.000Z',
                maxPerWallet: 0,
                price: '1320000000000000000',
                totalNftt: 0,
                instruction: 'instructionsadfasdf',
                claimableIds: ['2', '2', '3', '4', '5', '6'],
                requiredStaking: '0',
            },
            {
                id: 2,
                description: '',
                name: '',
                projectId: '55',
                type: 'U2UMintRoundFCFS',
                address: null,
                start: '2024-01-05T14:48:00.000Z',
                end: '2024-03-20T14:48:00.000Z',
                roundId: 0,
                stakeBefore: '2024-01-21T14:48:00.000Z',
                claimableStart: '2024-03-19T14:48:00.000Z',
                maxPerWallet: 0,
                price: '1320000000000000000',
                totalNftt: 0,
                instruction: 'instructionsadfasdf',
                claimableIds: ['2', '2', '3', '4', '5', '6'],
                requiredStaking: '0',
            },
        ]);
    }, []);

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
            <Tabs className="w-full underline">
                <Tabs.Item active title="Create Project">
                    <CreateInfoProject mainForm={mainForm} />
                </Tabs.Item>
                <Tabs.Item active title="Create Round" className="w-full">
                    <CreateInfoRound mainForm={mainForm} />
                </Tabs.Item>
            </Tabs>
            <FormValidationMessages errors={errors} />
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
