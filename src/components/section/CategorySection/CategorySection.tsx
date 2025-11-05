import CategoryList from "@/components/section/CategorySection/CategoryList/CategoryList";
import Container from "@/components/section/Container";

type CategorySectionProps = {
  className?: string;
};

export default function CategorySection({ className }: CategorySectionProps) {
  return (
    <section className={className}>
      <Container>
        <CategoryList />
      </Container>
    </section>
  );
}
