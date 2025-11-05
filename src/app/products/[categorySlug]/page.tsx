import AudioGearSection from "@/components/section/AudioGearSection/AudioGearSection";
import CategorySection from "@/components/section/CategorySection/CategorySection";
import ProductSection from "@/components/products/ProductSec/ProductSec";
import { Products } from "@/types";
import { getProductList, getProductListByCategory } from "@/utils/products";
import { titleCase } from "@/utils/titleCase";

type PageParams = {
  categorySlug: string;
};

export async function generateStaticParams() {
  const products = getProductList();
  const uniqueCategories = new Set(products.map((product) => product.category));
  return Array.from(uniqueCategories).map((category) => ({
    categorySlug: category,
  }));
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const products = getProductListByCategory(params.categorySlug);
  return {
    title: `${titleCase(products[0]?.category || "Category")} | Audiophile E-commerce`,
  };
}

export default async function Category({ params }: { params: PageParams }) {
  const products = getProductListByCategory(params.categorySlug);
  products.sort((_a, b) => (b.new ? 1 : -1));

  return (
    <>
      <div className="bg-neutral-900 pb-[2rem] pt-[calc(2rem+var(--navigation-height))] md:pb-[6.125rem] md:pt-[calc(6.125rem+var(--navigation-height))]">
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-center text-2xl font-bold uppercase leading-normal text-neutral-100 md:text-4xl md:leading-[2.75rem]">
            {products[0].category}
          </h1>
        </div>
      </div>
      <main className="pb-[7.5rem] md:pb-[6rem] xl:pb-[10rem]">
        <ProductSection
          products={products}
          className="pt-[4rem] md:pt-[7.5rem] xl:pt-[10rem]"
        />
        <CategorySection className="mt-[7.5rem] md:mt-[7.5rem] xl:mt-[10rem]" />
        <AudioGearSection className="mt-[7.5rem] md:mt-[7.5rem] xl:mt-[10rem]" />
      </main>
    </>
  );
}
