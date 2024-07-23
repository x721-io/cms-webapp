import { InputHTMLAttributes, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import { FormState } from "../../../../../types/form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DatePickerDatePickerStartClaimProps<T>
  extends InputHTMLAttributes<HTMLInputElement> {
  mainForm: UseFormReturn<FormState.CreateProject>;
  fieldName: any;
  prefixField: any;
}

const DatePickerSingle = <T extends FieldValues>(
  props: DatePickerDatePickerStartClaimProps<T>
) => {
  const { mainForm, prefixField } = props;

  const prefixFieldStartClaim =
    `${prefixField}.claimableStart` as "rounds.0.start";
  const prefixFieldStakeBefore =
    `${prefixField}.stakeBefore` as "rounds.0.stakeBefore";

  const { setValue } = mainForm;
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    setDateRange(newValue);
    setValue(prefixFieldStartClaim, new Date(newValue.startDate).toISOString());
    setValue(
      prefixFieldStakeBefore,
      new Date(newValue.startDate).toISOString()
    );
  };
  return (
    <>
      <Datepicker
        asSingle={true}
        value={dateRange}
        useRange={false}
        onChange={(value) => handleValueChange(value)}
        classNames={{
          input: () => " w-full border border-gray-300 rounded-2xl p-3",
        }}
      />
    </>
  );
};

export default DatePickerSingle;
