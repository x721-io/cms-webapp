import React, { useMemo } from "react";
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

interface Props<T> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    label: string;
    value: any;
    name?: any;
  }[];
  width?: string;
  containerClass?: string;
  scale?: "md" | "lg" | "sm";
  prependIcon?: React.ReactNode;
  prependIconContainerClass?: string;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  mainForm: UseFormReturn<T extends FieldValues ? T : FieldValues>;
  fieldName: Path<T extends FieldValues ? T : FieldValues>;
}

const SelectV2 = <T extends FieldValues>(props: Props<T>) => {
  const {
    mainForm,
    fieldName,
    options = [],
    prependIcon,
    prependIconContainerClass,
    containerClass,
    scale,
    success,
    error,
    errorMessage,
    className,
    register,
    onChange,
    ...rest
  } = props;

  const { onValidateForm } = useFormHelper();
  const { control } = mainForm;
  const dataValidate = onValidateForm({ mainForm, fieldName });

  const baseClass =
    "bg-surface-soft outline-none placeholder:text-gray-500 focus-visible:ring-[0.5px] w-full";

  const scaleClass = useMemo(() => {
    switch (scale) {
      case "lg":
        return classNames(
          "text-body-16 rounded-2xl min-w-72 h-14 p-4",
          !!prependIcon && "ps-10"
        );
      case "md":
      default:
        return classNames(
          "text-body-14 rounded-2xl min-w-72 h-12 p-3",
          !!prependIcon && "ps-10"
        );
      case "sm":
        return classNames(
          "text-body-14 rounded-xl min-w-60 h-10 px-3 py-1",
          !!prependIcon && "ps-9"
        );
    }
  }, [scale, prependIcon]);

  const colorClass = useMemo(() => {
    switch (dataValidate) {
      case "is-valid":
        return "text-green-500 ring-green-500";
      case "is-invalid":
        return "text-red-500 border-red-500 border-[0.5px]";
      default:
        return "focus-visible:ring-primary border-gray-300";
    }
  }, [dataValidate]);

  return (
    <div
      className={classNames("relative flex w-auto flex-col", containerClass)}
    >
      {!!prependIcon && (
        <div
          className={classNames(
            "pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5",
            prependIconContainerClass
          )}
        >
          {prependIcon}
        </div>
      )}

      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <select
            {...register}
            {...rest}
            className={classNames(
              baseClass,
              scaleClass,
              colorClass,
              onValidateForm({ mainForm, fieldName }) === "is-invalid" &&
                colorClass
            )}
            onChange={(data) => {
              field.onChange(data);

              if (typeof onChange === "function") {
                onChange(data);
              }
            }}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.name || option.label}
              </option>
            ))}
          </select>
        )}
      />
      <FormMessageValidate mainForm={mainForm} fieldName={fieldName} />
    </div>
  );
};

export default SelectV2;
