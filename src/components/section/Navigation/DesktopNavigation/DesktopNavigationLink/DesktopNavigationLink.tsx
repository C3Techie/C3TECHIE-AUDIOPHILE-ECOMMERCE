"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

type DesktopNavigationLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function DesktopNavigationLink({
  href,
  className,
  children,
  onClick,
}: DesktopNavigationLinkProps) {
  const asPath = usePathname();
  const activeLinkClassNames = "text-orange";

  return (
    <Link
      href={href}
      className={twJoin(
        "whitespace-nowrap text-xs uppercase tracking-[0.125rem] text-neutral-100 transition-colors duration-300 hover:text-orange",
        asPath === href && activeLinkClassNames,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
