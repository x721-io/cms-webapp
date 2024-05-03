import { Spinner } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { classNames } from "../../utils/string";
import Input, { BaseInputProps } from "../fields/InputField";

interface Props extends BaseInputProps {
  closeOnClick?: boolean;
  className?: string;
  loading?: boolean;
  renderDropdown?: (onClose: () => void) => React.ReactNode;
}

export default function InputDropdown({
  className,
  loading,
  closeOnClick,
  renderDropdown,
  ...rest
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const handleClose = () => setShowDropdown(false);

  const handler = (event: any) => {
    if (!container || !container.current || !renderDropdown) return;
    if (!container.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  });

  return (
    <div className={classNames("relative", className)} ref={container}>
      <Input
        {...rest}
        onFocus={() => !!renderDropdown && setShowDropdown(true)}
      />

      {!!renderDropdown && (
        <div
          className={classNames(
            "desktop:max-h-200 tablet:max-h-200 max-h-auto absolute z-50 mt-3 w-full overflow-auto bg-white shadow-sm transition-all tablet:rounded-2xl tablet:border-0 tablet:p-2 desktop:rounded-2xl desktop:border-[0.5px] desktop:p-3",
            showDropdown ? "block" : "hidden"
          )}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <Spinner size="xl" />
            </div>
          ) : (
            renderDropdown(handleClose)
          )}
        </div>
      )}
    </div>
  );
}
