"use client";

import { typography } from "../../config/theme";
import { classNames } from "../../utils/string";

type VariantType = keyof typeof typography;
interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: VariantType;
  showTooltip?: boolean;
}

export default function Text({
  className,
  variant,
  showTooltip,
  children,
  ...rest
}: Props) {
  if (variant && variant.includes("heading")) {
    return (
      <h1 className={classNames(className, `text-${variant}`)} {...rest}>
        {children}
      </h1>
    );
  }

  return (
    <p
      className={classNames(className, `text-${variant || "body-14"}`)}
      {...rest}
    >
      {children}
    </p>
  );
}
