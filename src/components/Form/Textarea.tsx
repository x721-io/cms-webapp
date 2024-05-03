import { useMemo } from "react";
import {
  Controller,
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormReturn,
} from "react-hook-form";
import { useFormHelper } from "../../hooks/useHelper";
import { classNames } from "../../utils/string";
import { FormMessageValidate } from "./FormMessageValidate";

interface TextareaProps<T>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  register?: UseFormRegisterReturn;
  mainForm: UseFormReturn<T extends FieldValues ? T : FieldValues>;
  fieldName: Path<T extends FieldValues ? T : FieldValues>;
}

const Textarea = <T extends FieldValues>(props: TextareaProps<T>) => {
  const { mainForm, fieldName, className, error, register, ...rest } = props;
  const { onValidateForm } = useFormHelper();
  const { control } = mainForm;
  const dataValidate = onValidateForm({ mainForm, fieldName });
  const baseClass =
    "bg-surface-soft outline-none placeholder:text-tertiary focus-visible:ring-[0.5px] w-full text-body-14 rounded-2xl min-w-72 h-12 p-4 text-primary border-noneborder-gray-300 border outline-none placeholder:text-gray-200 placeholder:font-light focus-visible:ring-[0.5px] w-full transition-all";
  const colorClass = useMemo(() => {
    switch (dataValidate) {
      case "is-valid":
        return "text-green-500 ring-green-500";
      case "is-invalid":
        return "text-red-600 border-red-600 border-[0.5px]";
      default:
        return "text-primary focus-visible:ring-primary border-gray-300 border";
    }
  }, [dataValidate]);
  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <textarea
            {...field}
            className={classNames(baseClass, colorClass, className)}
            {...register}
            {...rest}
          />
        )}
      />
      <FormMessageValidate mainForm={mainForm} fieldName={fieldName} />
    </>
  );
};

export default Textarea;
