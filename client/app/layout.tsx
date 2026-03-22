"use client";

import React, {
  useCallback,
  useState,
  startTransition,
  useRef,
} from "react";
import { Inter, Noto_Serif } from "next/font/google";
import dynamic from "next/dynamic";

import "../styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const Camera = dynamic(() => import("@/components/3d-camera/Camera"), {
  ssr: false,
});

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
      <body className={`font-sans antialiased bg-black`}>
        <div className="h-screen flex flex-col overflow-hidden">
          {pageLoaded || pageloadedFRef.current ? (
            <>
              <Navbar />
              <main id="snap-main-container" className="flex-1 overflow-y-auto">{children}</main>
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
