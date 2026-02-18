"use client";
import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";

const Camera = ({ onAnimationEnd }: { onAnimationEnd: () => void }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 500);

    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    const timeout = setTimeout(() => onAnimationEnd(), 2500);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="h-screen max-h-screen bg-black">
      {!mounted && (
        <div className="h-screen max-h-screen grid items-center justify-center">
          <Image
            src={"/images/Untitled - Copy@1-1800x919.png"}
            alt="Camera"
            height={1500}
            width={1500}
          />
        </div>
      )}

      <Spline scene="https://prod.spline.design/D2ivnVqf9GLJM2h8/scene.splinecode" />
    </div>
  );
};

export default Camera;
