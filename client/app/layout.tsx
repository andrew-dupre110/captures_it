import React from "react";
import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";

import "../styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "Captures_it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable}`}>
      <body className={`font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="max-h-[calc(100dvh-16dvh)]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
