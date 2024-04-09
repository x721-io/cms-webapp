import React, { InputHTMLAttributes, useMemo } from "react";
import { Controller, FieldValues, Path, UseFormRegisterReturn, UseFormReturn } from "react-hook-form";
import { useFormHelper } from "../../hooks/useHelper";
import { classNames } from "../../utils/string";
import { FormMessageValidate } from "../Form/FormMessageValidate";

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClass?: string;
  scale?: "md" | "lg" | "sm";
  prependIcon?: React.ReactNode;
  prependIconContainerClass?: string;
  appendIcon?: React.ReactNode;
  appendIconContainerClass?: string;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
}

interface InputV2Props<T> extends InputHTMLAttributes<HTMLInputElement> {
  mainForm: UseFormReturn<T extends FieldValues ? T : FieldValues>;
  fieldName: Path<T extends FieldValues ? T : FieldValues>;
  containerClass?: string;
  scale?: "md" | "lg" | "sm";
  prependIcon?: React.ReactNode;
  prependIconContainerClass?: string;
  appendIcon?: React.ReactNode;
  appendIconContainerClass?: string;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
  register?: UseFormRegisterReturn;

}

const InputV2 = <T extends FieldValues>(props: InputV2Props<T>) => {

  const {
    mainForm,
    fieldName,
    prependIcon,
    prependIconContainerClass,
    appendIcon,
    appendIconContainerClass,
    containerClass,
    scale,
    success,
    error,
    errorMessage,
    className,
    register,
    onChange,
    ...rest
  } = props

  const { onValidateForm } = useFormHelper()
  const { control } = mainForm
  const dataValidate = onValidateForm({ mainForm, fieldName });

  const baseClass =
    "border-gray-300 border outline-none placeholder:text-gray-200 placeholder:font-light focus-visible:ring-[0.5px] w-full transition-all";

  const scaleClass = useMemo(() => {
    switch (scale) {
      case "lg":
        return classNames(
          "text-base rounded-2xl min-w-72 h-14 p-4",
          !!prependIcon && "ps-10",
          !!appendIcon && "pe-10"
        );
      case "sm":
        return classNames(
          "text-sm rounded-xl h-10 px-4 py-2",
          !!prependIcon && "ps-9",
          !!appendIcon && "pe-9"
        );
      case "md":
      default:
        return classNames(
          "text-base rounded-2xl min-w-72 h-12 p-3",
          !!prependIcon && "ps-10",
          !!appendIcon && "pe-10"
        );
    }
  }, [scale, prependIcon, appendIcon]);

  const colorClass = useMemo(() => {
    switch (dataValidate) {
      case 'is-valid':
        return "text-success ring-success";
      case 'is-invalid':
        return "text-red-600 border-red-600 border-[0.5px]";
      default:
        return "text-primary focus-visible:ring-primary border-gray-300 border";
    }
  }, [dataValidate]);

  return (
    <div
      className={classNames(
        "relative flex w-full flex-col",
        containerClass
      )}
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
          <input
            {...rest}
            {...field}
            className={classNames(
              baseClass,
              scaleClass,
              className,
              onValidateForm({ mainForm, fieldName }) === "is-invalid" && colorClass,
            )}
            onChange={(data) => {
              field.onChange(data);

              if (typeof onChange === 'function') {
                onChange(data);
              }
            }}
          />
        )}
      />
      <FormMessageValidate mainForm={mainForm} fieldName={fieldName} />
      {!!appendIcon && (
        <div
          className={classNames(
            "absolute inset-y-0 end-0 flex items-center pe-3.5",
            appendIconContainerClass
          )}
        >
          {appendIcon}
        </div>
      )}
    </div>
  );
}

export default InputV2;