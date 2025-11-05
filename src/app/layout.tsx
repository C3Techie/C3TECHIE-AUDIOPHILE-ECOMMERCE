import "./global.css";
import Layout from "@/components/Layout";
import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import { ConvexClientProvider } from "@/providers/ConvexClientProv";

const manrope = Manrope({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "C3Techie Audiophile E-commerce",
	description:
		"HNG Internship Stage-3a-Frontend Audiophile e-commerce website Task.",
	icons: {
		icon: "/favicon-32x32.png",
	},
	viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <ConvexClientProvider>
          <Layout>{children}</Layout>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
