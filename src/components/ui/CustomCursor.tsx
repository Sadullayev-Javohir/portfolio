"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, label, .cursor-pointer, [data-interactive="true"]'
        );
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const animateTrail = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      setTrail({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    rafId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none hidden md:block"
    >
      {/* Playful Geometric Trailing Ring */}
      <div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border-2 border-ink pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${trail.x - 14}px, ${trail.y - 14}px, 0) scale(${
            isClicking ? 0.75 : isHovered ? 1.5 : 1
          })`,
          backgroundColor: isHovered ? "rgba(255, 201, 64, 0.45)" : "transparent",
          boxShadow: isHovered ? "2px 2px 0px #14110F" : "none",
        }}
      />
    </div>
  );
}
