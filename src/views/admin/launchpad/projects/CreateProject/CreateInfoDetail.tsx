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
  const { watch, getValues, control } = mainForm;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { details } = useMemo(() => getValues(), [watch()]);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-6 flex w-full flex-col">
      <Label className="mb-4 text-3xl font-bold">Detail</Label>
      <div className="my-6">
        <table className="text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className=" bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Key
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {details.map((item: any, itemIndex: any) => {
              const prefixField = `details.${itemIndex}` as "details.0";
              return (
                <tr key={`${itemIndex}-detail`} className="">
                  <td className="flex items-start">
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
export default CreateInfoDetail;
