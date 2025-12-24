import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cory MacVie - Strategic Product Leader",
  description:
    "Cory MacVie is a strategic product leader with 10+ years of experience building successful SaaS products. Specializing in healthcare compliance, legal tech, and AI-powered solutions.",
  keywords: [
    "product manager",
    "product leader",
    "SaaS",
    "healthcare compliance",
    "legal tech",
    "AI",
    "UX design",
    "startup advisor",
  ],
  authors: [{ name: "Cory MacVie" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://corymacvie.com/",
  },
  openGraph: {
    type: "website",
    url: "https://corymacvie.com/",
    title: "Cory MacVie - Strategic Product Leader",
    description:
      "Product leader with 10+ years building SaaS products from concept to market. Expertise in healthcare compliance, legal tech, and AI-powered solutions. Let's build something great together.",
    images: [
      {
        url: "https://corymacvie.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cory MacVie - Strategic Product Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cory MacVie - Strategic Product Leader",
    description:
      "Product leader with 10+ years building SaaS products from concept to market. Expertise in healthcare compliance, legal tech, and AI-powered solutions.",
    images: ["https://corymacvie.com/og-image.png"],
    creator: "@corymacvie",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
