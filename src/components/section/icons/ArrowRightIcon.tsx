import { IconProps } from "@/types";
import Image from "next/image";

export default function ArrowRightIcon({ className }: IconProps) {
  return (
    <Image
      className={className}
      src="/assets/shared/desktop/icon-arrow-right.svg"
      alt=""
      width={8}
      height={12}
    />
  );
}
