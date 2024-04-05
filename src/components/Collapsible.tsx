import { useMemo, useState } from "react";
import { classNames } from "../utils/string";
// import Icon from '@/components/Icon'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Collapsible({
  header,
  children,
  isOpen,
  onToggle,
  className,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  const expanded = useMemo(() => isOpen ?? open, [isOpen, open]);

  const handleToggle = () => {
    if (onToggle) onToggle();
    else setOpen(!open);
  };

  return (
    <div className={classNames(`w-full`, className)} {...rest}>
      <div
        className={classNames(
          "flex w-full cursor-pointer  select-none items-center justify-between rounded-2xl hover:opacity-100",
          expanded ? "font-bold text-gray-500" : "font-medium"
        )}
        onClick={handleToggle}
      >
        {header}
        <div
          className={classNames(
            "bg-surface-medium rounded-lg p-1 transition-transform",
            expanded && "rotate-180"
          )}
        >
          {/*<Icon name="chevronDown" width={14} height={14} />*/}
        </div>
      </div>

      <div
        className={classNames(
          "w-full pt-4 transition-all",
          expanded ? "block" : "hidden"
        )}
      >
        {children}
      </div>
    </div>
  );
}
