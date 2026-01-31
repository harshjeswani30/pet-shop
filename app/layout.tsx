import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { branding } from "@/lib/config/branding";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${branding.company.name} - ${branding.company.tagline}`,
  description: branding.company.description,
  keywords: "pets, dogs, cats, birds, exotic animals, pet marketplace, ethical breeding, India",
  openGraph: {
    title: branding.company.name,
    description: branding.company.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
