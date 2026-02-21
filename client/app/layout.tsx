"use client";

import React, {
  useCallback,
  useState,
  startTransition,
  useRef,
} from "react";
import { Inter, Noto_Serif } from "next/font/google";

import "../styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Camera from "@/components/3d-camera/Camera";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const pageloadedFRef = useRef(false)

  const animationEnded = useCallback(() => {
    startTransition(() => setPageLoaded(true));
    pageloadedFRef.current = true
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable}`}>
      <body className={`font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          {pageLoaded || pageloadedFRef.current ? (
            <>
              <Navbar />
                <main className="min-h[calc(100dvh-16dvh)] max-h-[calc(100dvh-16dvh)]">{children}</main>
              <Footer />
            </>
          ) : (
            <Camera onAnimationEnd={animationEnded} />
          )}
        </div>
      </body>
    </html>
  );
}
