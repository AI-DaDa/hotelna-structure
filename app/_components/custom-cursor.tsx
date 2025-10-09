"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor on desktop
    document.body.style.cursor = 'none';

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  useGSAP(() => {
    const cursorXSetter = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.1,
      ease: "power2.out",
    });
    const cursorYSetter = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.1,
      ease: "power2.out",
    });

    const followerXSetter = gsap.quickTo(followerRef.current, "x", {
      duration: 0.5,
      ease: "power2.out",
    });
    const followerYSetter = gsap.quickTo(followerRef.current, "y", {
      duration: 0.5,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      cursorXSetter(x - 3); // Center the cursor dot (6px width / 2)
      cursorYSetter(y - 3); // Center the cursor dot (6px height / 2)
      followerXSetter(x - 40); // Center the follower circle (80px width / 2)
      followerYSetter(y - 40); // Center the follower circle (80px height / 2)
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Main cursor - Small dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[10001] mix-blend-difference"
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Follower circle with Hotelna H Logo */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[9999]"
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {/* Circle background */}
        <div className="w-full h-full rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm flex items-center justify-center">
          {/* Hotelna H Logo inside circle */}
  <svg
            viewBox="0 0 3280.39 2261.28"
            className="w-10 h-10 opacity-100"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
          >
            <g>
              <path
                className="fill-[#ffffff]"
                d="M2873.36,2228.95c0,21.51,11.87,32.33,35.53,32.33h335.96c23.74,0,35.53-10.82,35.53-32.33v-164.74c0-34.96-2.47-66.93-7.37-95.98.21.02.43.04.64.07-1.56-8.6-3.51-17.06-5.71-25.41-6.65-28.44-15.94-53.7-27.93-75.75-16.5-30.39-38.49-57.93-65.93-82.63-60.46-57.47-142.16-92.79-232.18-92.79-14.21,0-28.19.93-41.92,2.67-6.05.77-11.51,3.28-15.88,6.99-6.59,5.59-10.71,13.92-10.71,23.12v16.68h-.03v487.77Z"
              />
              <path
                className="fill-[#ffffff]"
                d="M0,672.04c0-21.51,12.92-32.29,38.75-32.29h335.98c23.66,0,35.53,10.78,35.53,32.29v572.93h1751V32.29c0-21.51,10.76-32.29,32.31-32.29h339.18c23.68,0,35.55,10.78,35.55,32.29v2196.7c0,21.55-11.87,32.29-35.55,32.29h-339.18c-21.55,0-32.31-10.74-32.31-32.29v-628.65H410.27v628.65c0,21.55-11.87,32.29-35.53,32.29H38.75c-25.83,0-38.75-10.74-38.75-32.29V672.04Z"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
