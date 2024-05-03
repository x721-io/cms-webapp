import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export const useFormHelper = () => {
  const onValidateForm = <T extends FieldValues>({
    mainForm,
    fieldName,
  }: {
    mainForm: UseFormReturn<T extends FieldValues ? T : FieldValues>;
    fieldName: Path<T extends FieldValues ? T : FieldValues>;
  }) => {
    const {
      formState: { errors, touchedFields },
    } = mainForm;

    if (touchedFields && errors) {
      let msgError: string | null = null;

      if (fieldName.indexOf(".") !== -1) {
        const result: Record<string, any> | null | undefined = fieldName
          .split(".")
          .reduce((obj, key) => obj?.[key] as any, errors || {});

        msgError = result?.message || null;
      } else {
        msgError = (errors?.[fieldName]?.message as any) || null;
      }

      if (msgError) {
        return "is-invalid";
      }

      if (
        Object.keys(errors).length === 0 &&
        Object.keys(touchedFields).length === 0
      ) {
        return "";
      }

      if (fieldName in touchedFields) {
        return "is-valid";
      }
    }

    return "";
  };

  return { onValidateForm };
};
