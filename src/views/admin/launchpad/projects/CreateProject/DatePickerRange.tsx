import { InputHTMLAttributes, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import { FormState } from "../../../../../types/form";


interface DatePickerRangeProps
  extends InputHTMLAttributes<HTMLInputElement> {
  mainForm: UseFormReturn<FormState.CreateProject>;
  fieldName: any;
  prefixField: any;
}

const DatePickerRange = (
  props: DatePickerRangeProps
) => {
  const { mainForm, prefixField } = props;

  const prefixFieldStart = `${prefixField}.start` as "rounds.0.start";
  const prefixFieldEnd = `${prefixField}.end` as "rounds.0.end";

  const { setValue } = mainForm;
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    newValue.startDate = new Date(newValue.startDate).toISOString();
    newValue.endDate = new Date(newValue.endDate).toISOString();
    setDateRange(newValue);
    setValue(prefixFieldStart, newValue.startDate);
    setValue(prefixFieldEnd, newValue.endDate);
  };
  return (
    <>
      <Datepicker
        value={dateRange}
        useRange={false}
        onChange={(value) => handleValueChange(value)}
        classNames={{
          input: () => "w-full border border-gray-300 rounded-2xl p-3",
        }}
      />
    </>
  );
};

export default DatePickerRange;
