import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
import { useFormHelper } from "../../hooks/useHelper";
import { classNames } from "../../utils/string";
import { FormMessageValidate } from "./FormMessageValidate";

const Loader = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-black "></div>
    </div>
  );
};

export type SelectOptionProps = {
  label: string; // displayed label
  value: string; // value used in computatio
  type: string;
};

type SelectProps<T> = {
  options: SelectOptionProps[]; // an array of the options.
  selected?: SelectOptionProps; // the selected option.
  handleSelect: (option: SelectOptionProps) => void; // function that is called when an option is selected.
  placeholder?: string;
  isFetchingOptions?: boolean;
  isSearchable?: boolean;
  searchInput?: string;
  lastOptionRef?: (node: Element | null) => void;
  setSearchInput?: React.Dispatch<React.SetStateAction<string>>;
  mainForm: UseFormReturn<T extends FieldValues ? T : FieldValues>;
  fieldName: any;
};

const useListenForOutsideClicks = (onOutsideClick: () => void) => {
  const elementRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onOutsideClick?.();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onOutsideClick]);

  return { elementRef };
};

const SelectInput = <T extends FieldValues>(props: SelectProps<T>) => {
  const {
    fieldName,
    mainForm,
    options,
    isFetchingOptions,
    lastOptionRef,
    isSearchable,
    searchInput,
    selected,
    placeholder = "Select",
    handleSelect,
    setSearchInput,
  } = props;

  const { onValidateForm } = useFormHelper();
  const { control } = mainForm;
  const dataValidate = onValidateForm({ mainForm, fieldName });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const labelClassName = () => {
    return `block max-w-full capitalize truncate ${
      selected?.label ? "text-text-tertiary" : "text-neutral/400"
    }`;
  };

  const optionClassName = (
    option: SelectOptionProps,
    index: number,
    isSelected: boolean
  ) => {
    isSelected ||= selected?.value === option.value;

    return `active:bg-background-selected-option relative cursor-default select-none py-2 px-4 ${
      options.length - 1 === index ? "rounded-b-md" : ""
    } ${
      isSelected ? "bg-secondary/blue/50" : ""
    } hover:bg-secondary/blue/50 mb-1 last-of-type:mb-[0] block text-left w-full`;
  };

  const { elementRef } = useListenForOutsideClicks(closeDropdown);

  const renderNoOptions = () => {
    if (isFetchingOptions) return <Loader />;

    return (
      <div className="relative cursor-default select-none py-2 pl-3 pr-9">
        <span className="text-text-tertiary block truncate text-sm font-normal">
          No options here
        </span>
      </div>
    );
  };

  const renderOptions = (options: SelectOptionProps[]) => {
    return options?.length > 0
      ? options?.map((option, index) => {
          const isSelected = selected?.value === option.value;
          return (
            <button
              type="button"
              key={String(option.value) + String(index)}
              className={optionClassName(
                option,
                index,
                selected?.value === option.value
              )}
              onClick={() => {
                handleSelect(option);
                closeDropdown();
              }}
              ref={options?.length - 1 === index ? lastOptionRef : null}
            >
              <span
                title={option.label}
                className={`${
                  isSelected ? "font-semibold " : "font-normal"
                } text-text-tertiary text-shades/black block cursor-pointer truncate text-[0.625rem] font-normal leading-[0.8rem]`}
              >
                {option.label}
              </span>
            </button>
          );
        })
      : renderNoOptions();
  };

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
    <div className="relative grow">
      <button onClick={openDropdown} className="relative w-full" type="button">
        {isSearchable ? (
          <Controller
            control={control}
            name={fieldName}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={classNames(
                  "block h-12 w-full min-w-72 rounded-2xl border border-gray-300 p-3 text-base outline-none transition-all placeholder:font-light placeholder:text-gray-200 focus-visible:ring-[0.5px]",
                  onValidateForm({ mainForm, fieldName }) === "is-invalid" &&
                    colorClass
                )}
                onChange={(ev) => {
                  setSearchInput?.(ev.target.value);
                }}
                placeholder={placeholder}
                value={searchInput}
              />
            )}
          />
        ) : (
          <span title={selected?.label} className={labelClassName()}>
            {selected?.label || placeholder}
          </span>
        )}
        <span className="pointer-events-none absolute bottom-3 right-2 ml-3 flex items-center">
          <IoMdArrowDropdown size={24} className=" text-[#96989A]" />
        </span>
      </button>
      <FormMessageValidate mainForm={mainForm} fieldName={fieldName} />
      {isDropdownOpen && (
        <div
          className={
            "absolute z-[500] mt-1 max-h-40 w-full overflow-auto rounded-lg rounded-b-md bg-white py-[14px] text-base ring-opacity-5 focus:outline-none"
          }
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)" }}
          ref={elementRef}
        >
          {renderOptions(options)}

          {isFetchingOptions && options?.length > 0 && <Loader />}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
