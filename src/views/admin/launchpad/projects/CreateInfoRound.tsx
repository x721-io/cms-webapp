import { Label } from "flowbite-react";
import { FC, useEffect, useMemo } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { IoMdTrash } from "react-icons/io";
import InputV2 from "../../../../components/fields/InputFieldV2";
import {
  useFetchOptionRounds,
  useInfiniteScroll,
} from "../../../../hooks/useInfiniteScroll";
import { useRoundOptionFilterStore } from "../../../../store/filters/optionRounds/store";
import { FormInput } from "./CreateProject";

interface CreateInfoRoundProps {
  mainForm: UseFormReturn<FormInput>;
}

const CreateRoundProject: FC<CreateInfoRoundProps> = (props) => {
  const { mainForm } = props;
  const { watch, getValues, setValue, control } = mainForm;
  const { rounds } = useMemo(() => getValues(), [watch()]);
  const { filters } = useRoundOptionFilterStore((state) => state);

  const { data, size, setSize, isLoading } = useFetchOptionRounds(filters);
  const { list: roundOptions } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  const roundFieldArray = useFieldArray({
    control,
    name: "rounds",
    keyName: "key",
  });
  const {
    append: appendRound,
    remove: removeRound,
  } = roundFieldArray;

  const handleAddRow = () => {};
  console.log("data", data);

  useEffect(() => {
    if (rounds.length <= 0) {
      appendRound({
        id: 1,
        description: "",
        name: "",
        projectId: "",
        type: "U2UMintRoundFCFS",
        address: null,
        start: "2024-01-05T14:48:00.000Z",
        end: "2024-03-20T14:48:00.000Z",
        roundId: 0,
        stakeBefore: "2024-01-21T14:48:00.000Z",
        claimableStart: "2024-03-19T14:48:00.000Z",
        maxPerWallet: 0,
        price: "",
        totalNftt: 0,
        instruction: "",
        claimableIds: ["2", "2", "3", "4", "5", "6"],
        requiredStaking: "0",
      });
    }
  }, []);

  return (
    <div className="w-full overflow-x-scroll">
      <Label className="mb-4 text-3xl font-bold">Create Round</Label>
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((item, itemIndex) => {
              // const {  } = item.data;
              const prefixField = `rounds.${itemIndex}` as "rounds.0";

              return (
                <tr key={`${itemIndex}-abc`} className="">
                  <td>
                    {/* <SelectV2
                      options={roundOptions.concatenatedData}
                      mainForm={mainForm}
                      fieldName={`${prefixField}.name`}
                    /> */}
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.description`}
                    />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.instruction`}
                    />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.type`}
                      readOnly
                    />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.totalNftt`}
                    />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.price`}
                    />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.start`}
                    />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.end`}
                    />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.claimableStart`}
                    />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.stakeBefore`}
                    />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.stakeBefore`}
                    />
                  </td>
                  <td className="flex items-center justify-center">
                    <button className="p-1">
                      <IoMdTrash color="green" size={24} />
                    </button>
                    <button className="p-1" onClick={handleAddRow}>
                      Add row
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateRoundProject;
