"use client";

import React, { useCallback, useState, startTransition } from "react";
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
  // `revealed` mounts the page under the intro overlay when the shutter fires;
  // `introDone` unmounts the overlay once it has faded out completely.
  const [revealed, setRevealed] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const onCapture = useCallback(() => {
    startTransition(() => setRevealed(true));
  }, []);

  const onComplete = useCallback(() => {
    startTransition(() => setIntroDone(true));
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable}`}>
      <body
        className={`font-sans antialiased bg-black`}
        onContextMenu={(e) => {
          if ((e.target as HTMLElement).tagName === "IMG") e.preventDefault();
        }}
      >
        <div className="h-screen flex flex-col overflow-hidden">
          {revealed && (
            <>
              <Navbar />
              <main id="snap-main-container" className="flex-1 overflow-y-auto">
                {children}
              </main>
              <Footer />
            </>
          )}
        </div>
        {!introDone && (
          <Camera onCapture={onCapture} onComplete={onComplete} />
        )}
      </body>
    </html>
  );
}
