"use client";
import React, { useEffect } from "react";
import Spline from "@splinetool/react-spline";

const Camera = ({ onAnimationEnd }: { onAnimationEnd: () => void }) => {

  useEffect(() => {
    const timeout = setTimeout(() => onAnimationEnd(), 2500);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="h-screen max-h-screen bg-black">
      <Spline scene="https://prod.spline.design/9p2acX-LHcSO2XFo/scene.splinecode" />
    </div>
  );
};

export default Camera;
