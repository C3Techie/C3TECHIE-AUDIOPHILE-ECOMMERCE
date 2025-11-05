
import Button from "@/components/section/Button/Button";
import Container from "@/components/section/Container";
import { twJoin } from "tailwind-merge";

type Zx7SpeakerSectionProps = {
  className?: string;
};

export default function Zx7SpeakerSection({ className }: Zx7SpeakerSectionProps) {
  return (
    <section className={className}>
      <Container>
        <picture>
          <source
            media="(min-width: 1024px)"
            width={540}
            height={320}
            srcSet="/assets/home/desktop/image-speaker-zx7.jpg"
          />
          <source
            media="(min-width: 640px)"
            width={678}
            height={320}
            srcSet="/assets/home/tablet/image-speaker-zx7.jpg"
          />
          <img
            width={654}
            height={400}
            className="h-full max-h-[20rem] min-h-[12.5rem] w-full object-cover lg:max-h-[20rem] lg:min-h-[20rem]"
            loading="lazy"
            src="/assets/home/mobile/image-speaker-zx7.jpg"
            alt="ZX7 Speaker"
          />
        </picture>
        {/* Add any additional content here if needed */}
      </Container>
    </section>
  );
}
