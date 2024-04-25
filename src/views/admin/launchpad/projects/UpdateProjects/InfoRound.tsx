import { Label } from "flowbite-react";
import { FC, useEffect, useMemo } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { IoMdAddCircle, IoMdTrash } from "react-icons/io";
import InputV2 from "../../../../../components/fields/InputFieldV2";
import { FormState } from "../../../../../types/form";

interface Props {
  item?: any;
  mainForm: UseFormReturn<FormState.UpdateProject>;
}
const InfoRound: FC<Props> = (props) => {
  const { mainForm, item } = props;
  const { watch, getValues, control, setValue } = mainForm;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { rounds } = useMemo(() => getValues(), [watch()]);
  const roundFieldArray = useFieldArray({
    control,
    name: "rounds",
    keyName: "key",
  });

  useEffect(() => {
    if (item && item.rounds) {
      item.rounds.forEach((roundData: any, index: any) => {
        const prefixField = `rounds.${index}`;
        Object.keys(roundData).forEach((key) => {
          const fieldName = `${prefixField}.${key}` as "rounds.0";
          const value = roundData[key];
          setValue(fieldName, value);
        });
      });
    }
  }, [item, setValue]);

  const { append: appendRound, remove: removeRound } = roundFieldArray;
  const handleAddRow = () => {
    item.rounds.push({
      roundId: "",
      start: "",
      end: "",
      claimableStart: "",
      instruction: "",
      description: "",
      totalNftt: "",
      price: "",
      stakeBefore: "",
      maxPerWallet: "",

      id: "",
      name: "",
      projectId: "",
      type: "",
      address: null,
      claimableIds: [],
      requiredStaking: "",
    });
    setValue("rounds", item.rounds);
  };

  const handleRemoveRow = (index: number) => {
    removeRound(index);
  };

  return (
    <div className="w-full">
      <div className="my-6">
        <table className="text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className=" bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Round
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Start - End
              </th>
              <th scope="col" className="px-6 py-3">
                Start claim
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
            {item.rounds?.map((item: any, itemIndex: any) => {
              const prefixField = `rounds.${itemIndex}` as "rounds.0";
              return (
                <tr key={`${itemIndex}-abc`} className="">
                  <td>
                    {/* <SelectSearchRound
                      mainForm={mainForm}
                      prefixField={`${prefixField}`}
                      fieldName={`${prefixField}.roundId`}
                    /> */}
                  </td>
                  <td>
                    <InputV2
                      readOnly
                      mainForm={mainForm}
                      fieldName={`${prefixField}.type`}
                    />
                  </td>
                  <td>
                    {/* <DatePickerRange
                      mainForm={mainForm}
                      prefixField={`${prefixField}`}
                      fieldName={`${prefixField}.start`}
                    /> */}
                  </td>
                  <td>
                    {/* <DatePickerSingle
                      mainForm={mainForm}
                      prefixField={`${prefixField}`}
                      fieldName={`${prefixField}.claimableStart`}
                    /> */}
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
                    {/* <DatePickerSingle
                      mainForm={mainForm}
                      prefixField={`${prefixField}`}
                      fieldName={`${prefixField}.stakeBefore`}
                    /> */}
                  </td>
                  <td>
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.maxPerWallet`}
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
export default InfoRound;
