"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, useMotionValue, useReducedMotion, animate } from "motion/react";
import { EASE_EXPO_OUT } from "@/lib/motion";

interface CounterProps {
  target: number;
  suffix?: string;
  /** Animation duration in seconds. Default: 1.8 */
  duration?: number;
  className?: string;
}

/**
 * Animates a number from 0 to `target` when it scrolls into view.
 * Plays once per mount. Respects reduced-motion preferences.
 */
export function Counter({
  target,
  suffix = "",
  duration = 1.8,
  className,
}: CounterProps) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!isInView || shouldReduce) return;

    const controls = animate(motionValue, target, {
      duration,
      ease: EASE_EXPO_OUT,
      onUpdate(v) {
        setDisplay(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [isInView, shouldReduce, target, duration, motionValue]);

  if (shouldReduce) {
    return (
      <span className={className}>
        {target}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
