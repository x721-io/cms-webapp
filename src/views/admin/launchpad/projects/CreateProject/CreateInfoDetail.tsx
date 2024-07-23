import { Label } from "flowbite-react";
import { FC, useEffect, useMemo } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { IoMdAddCircle, IoMdTrash } from "react-icons/io";
import Textarea from "../../../../../components/Form/Textarea";
import InputV2 from "../../../../../components/fields/InputFieldV2";
import { FormState } from "../../../../../types/form";

interface CreateInfoDetailProps {
  mainForm: UseFormReturn<FormState.CreateProject>;
}

const CreateInfoDetail: FC<CreateInfoDetailProps> = (props) => {
  const { mainForm } = props;
  const {  getValues, control } = mainForm;
  const { details } = useMemo(() => getValues(), [getValues]);
  const detailFieldArray = useFieldArray({
    control,
    name: "details",
    keyName: "key",
  });
  const { append: appendDetail, remove: removeDetail } = detailFieldArray;

  const handleAddRow = () => {
    appendDetail(
      {
        key: "",
        content: "",
      },
      {
        shouldFocus: false,
      }
    );
  };

  const handleRemoveRow = (index: number) => {
    if (details.length > 1) {
      removeDetail(index);
    }
  };

  useEffect(() => {
    if (details.length <= 0) {
      appendDetail(
        {
          key: "",
          content: "",
        },
        {
          shouldFocus: false,
        }
      );
    }
  }, [appendDetail, details]);

  return (
    <div className="mt-6 flex w-full flex-col">
      <Label className="mb-4 text-3xl font-bold">Detail</Label>
      <div className="my-6 w-full">
        <table className="text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right w-full">
          <thead className=" bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th  className="px-6 py-3">
                Key
              </th>
              <th  className="px-6 py-3">
                Content
              </th>
              <th  className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {details.map((item: any, itemIndex: any) => {
              const prefixField = `details.${itemIndex}` as "details.0";
              return (
                <tr key={`${itemIndex}-detail`} className="">
                  <td className="flex items-start pr-4">
                    <InputV2
                      mainForm={mainForm}
                      fieldName={`${prefixField}.key`}
                    />
                  </td>
                  <td>
                    <Textarea
                      mainForm={mainForm}
                      fieldName={`${prefixField}.content`}
                      className="h-[100px]"
                    />
                  </td>
                  <td className="flex flex-col items-center justify-center w-full gap-2 pl-4">
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
                      <Label className="text-base text-white">Remove row</Label>
                      <IoMdTrash color="white" size={24} />

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
export default CreateInfoDetail;
