"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export function ScrollReveal({
  children,
  delayMs = 0,
  className = "",
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, show immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransformClasses = () => {
    if (isVisible) return "opacity-100 translate-y-0 translate-x-0 scale-100";

    switch (direction) {
      case "up":
        return "opacity-0 translate-y-7 scale-[0.99]";
      case "left":
        return "opacity-0 translate-x-7";
      case "right":
        return "opacity-0 -translate-x-7";
      case "none":
        return "opacity-0";
      default:
        return "opacity-0 translate-y-7";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
