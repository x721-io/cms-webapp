import { Label } from "flowbite-react";
import { FC, useEffect } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { IoMdAddCircle, IoMdTrash } from "react-icons/io";
import InputV2 from "../../../../../components/fields/InputFieldV2";
import { FormState } from "../../../../../types/form";
import DatePickerRange from "./DatePickerRange";
import DatePickerSingle from "./DatePickerSingle";
import SelectSearchRound from "./SelectSearchRound";
import ClaimableIds from "../CreateProject/CreateRound";


interface CreateInfoRoundProps {
  mainForm: UseFormReturn<FormState.CreateProject>;
}

const CreateInfoRound: FC<CreateInfoRoundProps> = (props) => {
  const { mainForm } = props;
  const { watch, getValues, control } = mainForm;
  const  rounds  = getValues('rounds');

  const roundFieldArray = useFieldArray({
    control,
    name: "rounds",
    keyName: "key",
  });
  const { append: appendRound, remove: removeRound } = roundFieldArray;

  const handleAddRow = () => {
    appendRound(
      {
        roundId: "",
        start: "",
        end: "",
        claimableStart: "",
        instruction: "",
        totalNftt: "",
        price: "",
        stakeBefore: "",
        maxPerWallet: "",
        address: null,
        claimableIds: [],
        requiredStaking: "",
      },
      {
        shouldFocus: false,
      }
    );
  };

  const handleRemoveRow = (index: number) => {
    removeRound(index);
  };

  useEffect(() => {
    if (watch('rounds').length <= 0) {
      appendRound(
        {
          roundId: "",
          start: "",
          end: "",
          claimableStart: "",
          instruction: "",
          totalNftt: "",
          price: "",
          stakeBefore: "",
          maxPerWallet: "",
          address: null,
          claimableIds: [{ id: "" }],
          requiredStaking: "",
        },
        {
          shouldFocus: false,
        }
      );
    }
  }, [appendRound, watch]);

  return (
    <div className="mt-6 min-h-[350px] w-full overflow-x-scroll">
      <Label className="mb-2 text-3xl font-bold">Rounds</Label>
      <div className="my-6 w-full">
            {rounds.map((item, itemIndex) => {
              const prefixField = `rounds.${itemIndex}` as "rounds.0";
              return (
                <div key={`${itemIndex}-abc`} className="w-full flex flex-col gap-3">
                  <div className="flex gap-4 w-full">
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-primary block font-semibold">
                        Round (Round ID)
                      </p>
                      <SelectSearchRound
                        mainForm={mainForm}
                        prefixField={`${prefixField}`}
                        fieldName={`${prefixField}.roundId`}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className=" text-primary block font-semibold">
                        Address
                      </p>
                      <InputV2
                        mainForm={mainForm}
                        fieldName={`${prefixField}.address`}
                      />
                    </div>

                  </div>

                  <div className="flex gap-4 w-full">
                    <div className="flex flex-col gap-1 w-full">
                      <p className=" text-primary block font-semibold">
                        Start - End
                      </p>
                      <DatePickerRange
                        mainForm={mainForm}
                        prefixField={`${prefixField}`}
                        fieldName={`${prefixField}.start`}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className=" text-primary block font-semibold">
                        Start claim
                      </p>
                      <DatePickerSingle
                        mainForm={mainForm}
                        prefixField={`${prefixField}`}
                        fieldName={`${prefixField}.claimableStart`}
                      />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <p className=" text-primary block font-semibold">
                        Staking end
                      </p>
                      <DatePickerSingle
                        mainForm={mainForm}
                        prefixField={`${prefixField}`}
                        fieldName={`${prefixField}.stakeBefore`}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 w-full">
                    <div className="flex flex-col gap-1 w-full">
                      <p className=" text-primary block font-semibold">
                        Instruction
                      </p>
                      <InputV2
                        mainForm={mainForm}
                        fieldName={`${prefixField}.instruction`}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className=" text-primary block font-semibold">
                        MaxPer Wallet
                      </p>
                      <InputV2
                        mainForm={mainForm}
                        fieldName={`${prefixField}.maxPerWallet`}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 w-full">
                    <div className="flex flex-col gap-1 w-full">
                      <p className=" text-primary block font-semibold">
                        Required Staking
                      </p>
                      <InputV2
                        mainForm={mainForm}
                        fieldName={`${prefixField}.requiredStaking`}
                      />
                    </div>

                    <ClaimableIds mainForm={mainForm} roundIdx={prefixField}/>
                  </div>

                  <div className="flex gap-4 w-full">
                    <div className="flex flex-col gap-1 w-full">
                      <p className=" text-primary block font-semibold">
                        Total NFT
                      </p>
                      <InputV2
                        mainForm={mainForm}
                        fieldName={`${prefixField}.totalNftt`}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className=" text-primary block font-semibold">
                        Price (U2U)
                      </p>
                      <InputV2
                        mainForm={mainForm}
                        fieldName={`${prefixField}.price`}
                      />
                    </div>
                  </div>



                  <div className="flex items-center justify-center gap-2 w-full">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-brandLinear p-2"
                      onClick={handleAddRow}
                    >
                      <IoMdAddCircle color="white" size={24} />
                      <Label className="text-base text-white">Add row</Label>
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500 p-2"
                      onClick={() => handleRemoveRow(itemIndex)}
                    >
                      <Label className="text-base text-white">Remove Round</Label>
                      <IoMdTrash color="white" size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CreateInfoRound;
