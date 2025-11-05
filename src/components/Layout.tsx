import Footer from "@/components/section/Footer/Footer";
import Navigation from "@/components/section/Navigation/Navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
