import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function Logo({ href = "/", onClick, className }: LogoProps) {
  return (
    <Link href={href} onClick={onClick} className={className}>
      <Image
        src="/assets/shared/desktop/logo.svg"
        width={143}
        height={25}
        alt="Audiophile Logo"
        priority
      />
    </Link>
  );
}
