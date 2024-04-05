import { FC, useMemo } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import InputV2 from '../../../../components/fields/InputFieldV2';
import { FormState } from '../../../../types/form';
import { FormInput } from './CreateProject';

interface CreateInfoRoundProps {
    mainForm: UseFormReturn<FormInput>;
}

const CreateRoundProject: FC<CreateInfoRoundProps> = (props) => {
    const { mainForm } = props;
    const { watch, getValues } = mainForm;

    const { rounds } = useMemo(() => getValues(), [watch()]);

    const {
        register,
        formState: { errors },
    } = useForm<FormState.CreateProject>();
    return (
        <div>
            <div className="w-full overflow-x-scroll">
                <div className="my-6">
                    <table className="text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                        <thead className=" bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="">
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Instruction
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total NFT
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price (U2U)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Start
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    End
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Start claim
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Staking end
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rounds.map((item, itemIndex) => {
                                const { id } = item;
                                const prefixField =
                                    `rounds.${itemIndex}` as 'rounds.0';

                                return (
                                    <tr key={id}>
                                        <td>
                                            <InputV2
                                                mainForm={mainForm}
                                                fieldName={`${prefixField}.address`}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* <tr
                                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600" >
                                <th className="px-6 py-4">
                                    <Input
                                        error={!!errors.rounds}
                                        register={register("name", formRulesCreateProject.addressRounds)}
                                    />
                                </th>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.description}
                                        register={register("description", formRulesCreateProject.startRounds)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.instruction}
                                        register={register("instruction", formRulesCreateProject.endRounds)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.type}
                                        register={register("type", formRulesCreateProject.roundId)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.totalNFT}
                                        register={register("totalNFT", formRulesCreateProject.stakeBeforeRounds)}
                                    />
                                </td>
                                <th className="px-6 py-4">
                                    <Input
                                        error={!!errors.price}
                                        register={register("price", formRulesCreateProject.claimableStartRounds)}
                                    />
                                </th>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.start}
                                        register={register("start", formRulesCreateProject.maxPerWalletRounds)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.end}
                                        register={register("end", formRulesCreateProject.priceRounds)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.startClaim}
                                        register={register("startClaim", formRulesCreateProject.totalNfttRounds)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.stackingEnd}
                                        register={register("stackingEnd", formRulesCreateProject.instructionRounds)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.quantity}
                                        register={register("quantity", formRulesCreateProject.requiredStakingRounds)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <Input
                                        error={!!errors.quantity}
                                        register={register("quantity", formRulesCreateProject.claimableIdsRounds)}
                                    />
                                </td>
                                <td className="px-6 py-4 flex gap-1">
                                    <button className="p-1">
                                        <IoMdTrash color="green" size={24} />
                                    </button>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateRoundProject;
