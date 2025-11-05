import AudioGearSection from "@/components/section/AudioGearSection/AudioGearSection";
import CategorySection from "@/components/section/CategorySection/CategorySection";
import Container from "@/components/section/Container";
import GoBackButton from "@/components/products/GoBackButton/GoBackButton";
import ProductFeaturesSection from "@/components/products/ProductFeaturesSec/ProductFeaturesSec";
import ProductGallerySection from "@/components/products/ProductGallerySec/ProductGallerySec";
import Product from "@/components/products/ProductSec/ProductList/Product/Product";
import ProductsYouMayAlsoLikeSection from "@/components/products/ProductsYouMayAlsoLikeSec/ProductsYouMayAlsoLikeSec";
import { Product as ProductType } from "@/types";
import { getProductBySlug, getProductList } from "@/utils/products";



type PageParams = {
  categorySlug: string;
  productSlug: string;
};


export async function generateStaticParams() {
  const products = getProductList();
  return products.map((product) => ({
    categorySlug: product.category,
    productSlug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const product = getProductBySlug(params.productSlug);
  return {
    title: `${product?.name || "Product"} | Audiophile E-commerce`,
  };
}

export default async function ProductDetails({ params }: { params: PageParams }) {
  const product = getProductBySlug(params.productSlug);
  if (!product) return null;

  return (
    <main className="pb-[7.5rem] pt-[calc(2rem+var(--navigation-height))] md:pb-[6rem] xl:pb-[10rem] xl:pt-[calc(6.125rem+var(--navigation-height))]">
      <Container>
        <GoBackButton>Go Back</GoBackButton>
      </Container>
      <section className="mt-[1.5rem] xl:mt-[3.5rem]">
        <Container>
          <Product product={product} showAddToCart />
        </Container>
      </section>
      <ProductFeaturesSection
        className="mt-[5.5rem] md:mt-[7.5rem] xl:mt-[10rem]"
        features={product.features}
        includes={product.includes}
      />
      <ProductGallerySection
        productName={product.name}
        gallery={product.gallery}
        className="mt-[5.5rem] md:mt-[7.5rem] xl:mt-[10rem]"
      />
      <ProductsYouMayAlsoLikeSection
        otherProducts={product.others}
        className="mt-[5.5rem] md:mt-[7.5rem] xl:mt-[10rem]"
      />
      <CategorySection className="mt-[7.5rem] md:mt-[7.5rem] xl:mt-[10rem]" />
      <AudioGearSection className="mt-[7.5rem] md:mt-[7.5rem] xl:mt-[10rem]" />
    </main>
  );
}


