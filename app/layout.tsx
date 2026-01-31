import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetMarket India - Find Healthy Pets & Companions",
  description: "Enterprise-level pet marketplace in India for selling pets with ethical breeding, vaccination, and vet checks.",
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
        <main min-h-screen>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
