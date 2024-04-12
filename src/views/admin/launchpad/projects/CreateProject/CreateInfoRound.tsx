import { Label } from "flowbite-react";
import { FC, useEffect, useMemo, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { IoMdAddCircle, IoMdTrash } from "react-icons/io";
import InputV2 from "../../../../../components/fields/InputFieldV2";
import { FormState } from "../../../../../types/form";
import SelectSearchRound from "./SelectSearchRound";

interface CreateInfoRoundProps {
  mainForm: UseFormReturn<FormState.CreateProject>;
}

const CreateInfoRound: FC<CreateInfoRoundProps> = (props) => {
  const { mainForm } = props;
  const { watch, getValues, control, trigger } = mainForm;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { rounds } = useMemo(() => getValues(), [watch()]);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDate = new Date(event.target.value);
    setStartDate(selectedDate);
  };

  const roundFieldArray = useFieldArray({
    control,
    name: "rounds",
    keyName: "key",
  });
  const { append: appendRound, remove: removeRound } = roundFieldArray;

  const handleAddRow = () => {
    appendRound({
      id: "",
      description: "",
      name: "",
      projectId: "",
      type: "U2UMintRoundFCFS",
      address: null,
      start: "",
      end: "",
      roundId: "2",
      stakeBefore: "",
      claimableStart: "",
      maxPerWallet: 0,
      price: "",
      totalNftt: 0,
      instruction: "",
      claimableIds: ["2", "2", "3", "4", "5", "6"],
      requiredStaking: "0",
    });
  };

  const handleRemoveRow = (index: number) => {
    removeRound(index);
  };

  useEffect(() => {
    if (rounds.length <= 0) {
      appendRound({
        id: "",
        description: "",
        name: "",
        projectId: "",
        type: "U2UMintRoundFCFS",
        address: null,
        start: "",
        end: "",
        roundId:"0",
        stakeBefore: "",
        claimableStart: "",
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
    <div className="min-h-[350px] w-full overflow-x-scroll">
      <Label className="mb-4 text-3xl font-bold">Create Round</Label>
      <div className="my-6">
        <table className="text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className=" bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Instruction
              </th>
              <th scope="col" className="px-6 py-3">
                Description
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
              const prefixField = `rounds.${itemIndex}` as "rounds.0";

              return (
                <tr key={`${itemIndex}-abc`} className="">
                  <td>
                    <SelectSearchRound mainForm={mainForm} prefixField={`${prefixField}`} />
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.type`}
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
                      fieldName={`${prefixField}.description`}
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
                      fieldName={`${prefixField}.requiredStaking`}
                    />
                  </td>
                  <td className="flex items-center justify-center">
                    <button
                      type="button"
                      className="p-1"
                      onClick={() => handleRemoveRow(itemIndex)}
                    >
                      <IoMdTrash color="green" size={24} />
                    </button>
                    <button
                      type="button"
                      className="flex w-[120px] items-center gap-2 rounded-md bg-brandLinear p-2"
                      onClick={handleAddRow}
                    >
                      <IoMdAddCircle color="white" size={24} />
                      <Label className="text-base text-white">Add row</Label>
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

export default CreateInfoRound;
