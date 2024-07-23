import { Label } from "flowbite-react";
import { FC } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { IoMdAddCircle, IoMdTrash } from "react-icons/io";
import InputV2 from "../../../../../components/fields/InputFieldV2";
import { FormState } from "../../../../../types/form";


interface CreateInfoDetailProps {
  mainForm: UseFormReturn<FormState.CreateProject>;
  roundIdx: string;
}

const ClaimableIds: FC<CreateInfoDetailProps> = (props) => {
  const { mainForm, roundIdx } = props;
  const { control } = mainForm;

  const {
    fields: claimableIdFields,
    append: appendClaimableId,
    remove: removeClaimableId,
  } = useFieldArray({
    control,
    name: `${roundIdx}.claimableIds` as any,
    keyName: "key",
  });


  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-primary block font-semibold">Claimable Ids</p>
      {claimableIdFields.map((field, idx) => {
        const prefixField = `${roundIdx}.claimableIds.${idx}`;
        return (
          <div key={field.key} className="flex items-center gap-2">
            <InputV2
              mainForm={mainForm}
              fieldName={`${prefixField}.id` as any}
            />
            <button
              type="button"
              className="rounded-md bg-red-500 p-1"
              onClick={() => removeClaimableId(idx)}
            >
              <IoMdTrash color="white" size={16} />
            </button>
          </div>
        );
      })}
      <button
        type="button"
        className="flex items-center gap-2 rounded-md bg-brandLinear p-2"
        onClick={() => {
          appendClaimableId({ id: "" });
        }}
      >
        <IoMdAddCircle color="white" size={24} />
        <Label className="text-base text-white">Add Claimable Id</Label>
      </button>
    </div>
  );
};

export default ClaimableIds;
