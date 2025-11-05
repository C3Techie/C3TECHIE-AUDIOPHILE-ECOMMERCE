import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  intent?: "primary" | "secondary" | "secondary-alt" | "simple";
  fullWidth?: boolean;
  disabled?: boolean;
};

const baseClasses =
  "inline-block cursor-pointer select-none whitespace-nowrap text-center text-xs uppercase tracking-[0.0625rem] transition duration-300 ease-in-out px-[1.9rem] py-[0.72rem]";

const intentClasses: Record<string, string> = {
  primary: "text-neutral-100 bg-orange hover:bg-orange-light",
  secondary:
    "border border-neutral-900 bg-transparent px-[calc(1.9rem-1px)] py-[calc(0.94rem-1px)] hover:bg-neutral-900 hover:text-neutral-100",
  "secondary-alt": "text-neutral-100 bg-neutral-900 hover:bg-neutral-600",
  simple:
    "inline-flex items-center justify-center gap-[0.83rem] text-neutral-900/50 hover:text-orange px-[0.1rem] py-[0.1rem] [&>img]:h-3 [&>img]:w-auto",
};

export default function Button({
  href,
  onClick,
  children,
  className = "",
  intent = "primary",
  fullWidth = false,
  disabled = false,
  ...rest
}: ButtonProps) {
  const classes = [
    baseClasses,
    intentClasses[intent],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
